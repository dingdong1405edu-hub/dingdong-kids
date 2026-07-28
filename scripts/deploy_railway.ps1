# Deploy script for local use
# Usage:
# 1) Set env vars in PowerShell:  $env:GITHUB_TOKEN = '...'; $env:RAILWAY_TOKEN = '...'
# 2) Run:  powershell -ExecutionPolicy Bypass -File .\scripts\deploy_railway.ps1

function Fail($msg){ Write-Host "ERROR: $msg" -ForegroundColor Red; exit 1 }

Write-Host "Starting deploy helper..." -ForegroundColor Cyan

if (-not (Get-Command git -ErrorAction SilentlyContinue)) { Fail 'Git not found. Install Git and re-run.' }

$branch = (git rev-parse --abbrev-ref HEAD) -replace "\r|\n",""
Write-Host "Current branch: $branch"
if ($branch -ne 'deploy-railway'){
    Write-Host "Switching/creating branch 'deploy-railway'..."
    git checkout -B deploy-railway || Fail 'Failed to checkout/create deploy-railway'
    $branch = 'deploy-railway'
}

# Ensure there is a commit (we expect one already)
$changes = git status --porcelain
if ($changes) { Write-Host 'Staging and committing any changes...'; git add -A; git commit -m "deploy: automated commit" }

# Check origin remote
$originUrl = $null
try { $originUrl = git remote get-url origin 2>$null } catch { $originUrl = $null }
if (-not $originUrl){
    Write-Host "No 'origin' remote set. I'll help create/set one."
    $owner = Read-Host 'Enter the GitHub owner/account to use (your username or org)'
    if (-not $owner) { Fail 'GitHub owner required.' }
    $repo = Read-Host 'Enter repository name (default: dingdong-kids)'
    if (-not $repo) { $repo = 'dingdong-kids' }
    $newUrl = "https://github.com/$owner/$repo.git"
    git remote add origin $newUrl
    Write-Host "Added origin -> $newUrl"
    $originUrl = $newUrl
}
else { Write-Host "Found origin: $originUrl" }

# Try to create repo with gh if available and auth token provided
$gh = Get-Command gh -ErrorAction SilentlyContinue
if ($gh){
    if ($env:GITHUB_TOKEN){
        Write-Host 'Authenticating gh with $env:GITHUB_TOKEN'
        $env:GITHUB_TOKEN | gh auth login --with-token 2>$null
    }
    # Try to create repo (if it doesn't exist) and push
    $uri = (git remote get-url origin)
    if ($uri -match 'github.com[:/](.+?)/(.+?)($|\.git)'){
        $owner = $matches[1]; $repo = $matches[2]
        Write-Host "Ensuring GitHub repo $owner/$repo exists (gh will create if missing)..."
        gh repo create "$owner/$repo" --public --source=. --remote=origin --push --confirm 2>$null | Out-Null
    }
}
else { Write-Host "gh CLI not found — skip repo creation. If origin repo doesn't exist, create it manually on GitHub and re-run." }

# Push branch
Write-Host "Pushing branch $branch to origin..."
try {
    git push -u origin $branch
} catch {
    Write-Host "git push failed. Output: $_"
    Fail 'Push failed — check auth and repo permissions.'
}

# Try Railway CLI deploy if available
$railway = Get-Command railway -ErrorAction SilentlyContinue
if ($railway){
    if ($env:RAILWAY_TOKEN){
        Write-Host 'Logging into Railway CLI using $env:RAILWAY_TOKEN'
        railway login --token $env:RAILWAY_TOKEN
    } else { Write-Host 'RAILWAY_TOKEN not set — Railway CLI will prompt interactively if needed.' }
    Write-Host 'Attempting `railway up` to deploy the current branch...'
    try {
        railway up --branch $branch
        Write-Host 'railway up finished (check Railway web console for build/deploy logs).'
    } catch {
        Write-Host 'railway up failed or returned non-zero. You may need to use Railway web UI to connect the GitHub repo.'
    }
} else {
    Write-Host "Railway CLI not installed. To deploy via CLI, install with: npm i -g @railway/cli"
    Write-Host "Or go to https://railway.app → New Project → Deploy from GitHub → select repo and branch."
}

Write-Host "Done. Check the push output and Railway web UI for deployment status." -ForegroundColor Green
Write-Host "If you published tokens in chat, revoke them now and create new ones." -ForegroundColor Yellow
