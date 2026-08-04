# Hệ thiết kế DingDong Kids — "Sân chơi kem & mật ong"

> Tài liệu này là **hợp đồng giao diện** của toàn dự án. Mọi component mới và mọi
> lần sửa giao diện phải theo đây. Nguồn sự thật của giá trị màu:
> [src/app/globals.css](src/app/globals.css) và [tailwind.config.ts](tailwind.config.ts).

---

## 1. Tinh thần

Nền **kem ấm** như giấy vẽ, chữ **nâu cacao** (không bao giờ đen/xám), các khối
màu **pastel xen kẽ** ngăn nhau bằng **dải sóng**, nút bấm là **khối 3D có gờ**,
mọi góc **bo rất tròn**, chữ tiêu đề **Baloo 2 mập tròn**.

Nguyên tắc: *ít chữ – nhiều hình – khối to – màu tươi*. Trẻ 4 tuổi phải nhận ra
bấm được vào đâu mà không cần đọc chữ.

---

## 2. Màu — ba nhóm, dùng đúng nhóm

### 2.1. Token ngữ nghĩa (BẮT BUỘC cho nền/chữ/thẻ/viền)

Chỉ nhóm này tự đổi theo chế độ sáng/tối. Nền, chữ, thẻ, viền **luôn** dùng nhóm này.

| Class | Dùng cho |
|---|---|
| `bg-background` / `text-foreground` | nền trang / chữ chính |
| `bg-card` / `text-card-foreground` | mặt thẻ nổi trên nền |
| `text-muted-foreground` | chữ phụ, mô tả, chú thích |
| `bg-muted` | rãnh, nền chìm, ô trống |
| `border-border` | mọi đường viền |
| `bg-primary` / `text-primary` | mật ong đậm — nhấn mạnh, đọc rõ trên kem |
| `bg-sunny` / `text-sunny-foreground` | **vàng nắng** — nút chính, sao, streak, thưởng |
| `bg-destructive` | hành động nguy hiểm |
| `bg-secondary`, `bg-accent`, `bg-popover` | như shadcn |

### 2.2. Màu nhấn `brand-*` (cho biểu tượng, nhãn, minh hoạ)

Đã bọc biến CSS → tự dịu lại ở chế độ tối. Dùng để **phân biệt module** và làm
giao diện vui mắt.

```
brand-yellow #FFD43B   brand-sun #FFA51F    brand-gold #DE9310   brand-honey #F2B93A
brand-coral  #FF6B5A   brand-pink #FF4F97   brand-lime #4CD473   brand-teal  #17BFAA
brand-sky    #25AEF5   brand-blue #3D6FE0   brand-grape #8B4EFF
brand-cocoa (chữ chính)  brand-mocha (chữ phụ)
```

⚠️ `brand-yellow` và `brand-lime` **không đủ tương phản** để làm màu CHỮ trên nền
sáng. Cần chữ vàng đọc rõ → dùng `text-brand-gold`. Cần chữ xanh lá đọc rõ →
dùng `text-brand-teal`.

### 2.3. Nền khối lớn `band-*` (cho `<section>`)

```
band-cream  band-sun  band-coral  band-lav  band-yel  band-mint  band-sky
```

Các section xen kẽ nhau bằng những màu này, **ngăn nhau bằng `<WaveDivider>`**.

### 2.4. CẤM

**Không dùng bảng màu mặc định của Tailwind** (`bg-sky-500`, `text-rose-600`,
`from-violet-400`, `bg-slate-50`…) cho giao diện mới. Chúng không biết tới chế độ
tối và lệch tông thương hiệu. Mã cũ còn sót thì thay dần theo bảng quy đổi §7.

---

## 3. Hình khối

| Thứ | Quy tắc |
|---|---|
| Bo góc | `rounded-full` cho nút & huy hiệu · `rounded-xl` (26px) cho thẻ · `rounded-2xl` (34px) cho khung lớn · `rounded-lg` (20px) cho ô nhập |
| Bóng đổ | `shadow-soft` · `shadow-soft-lg` · `shadow-soft-xl` — đều ám nâu cacao, **không dùng** `shadow-md`/`shadow-lg` mặc định (ám xám, trông bẩn trên nền kem) |
| Viền | dày `border-2` trở lên, hoặc bỏ hẳn viền và tách lớp bằng bóng |
| Vùng chạm | **≥ 48px** — `globals.css` đã ép `min-height:48px` cho mọi `<button>`; đừng ghi đè nhỏ hơn |

---

## 4. Chữ

| Class | Phông | Dùng cho |
|---|---|---|
| `font-display` | Baloo 2, 800 | mọi tiêu đề, chữ trên nút, số liệu lớn |
| (mặc định) | Nunito, 600 | thân chữ — nền là 17px |
| `font-primer` | Andika | từ mẫu Phonics & thẻ từ vựng (chữ `a`/`g` một tầng) |
| `.eyebrow` | Nunito 900 in hoa | nhãn nhỏ trên đầu mỗi phần |

Từ đang học hiển thị **≥ 40px**. Văn phong: câu ngắn, khen trước khi sửa.

---

## 5. Thành phần dựng sẵn (dùng lại, đừng vẽ lại)

| Thứ | Ở đâu |
|---|---|
| `<Button>` | `variant`: `default` (vàng) · `candy` (hồng) · `secondary` (trắng) · `destructive` · `outline` · `ghost` · `link`. Đã có gờ 3D. |
| `<WaveDivider top="sun" bottom="coral" />` | `@/components/shared/wave-divider` — đặt GIỮA hai section |
| `<Logo>` / `<Wordmark>` | `@/components/shared/logo` — đầu gấu Ding + chữ ba màu |
| `<DingArt pose="cheer">` | `@/components/marketing/ding-art` — linh vật toàn thân |
| `.btn-chunky` | nút 3D có gờ; đổi màu gờ bằng `[--edge:hsl(var(--c-sun))]` |
| `.card-toy` | thẻ trắng bo lớn, hover nhô lên |
| `.sticker` | thẻ viền dày + bóng lệch như miếng dán |
| `.tick` | dấu tích tròn xanh trước dòng lợi ích |
| `.eyebrow` | nhãn nhỏ in hoa |
| `.hl` / `.hl-pink` / `.hl-mint` / `.hl-sky` | bút highlight kiểu vở học trò |
| `.text-rainbow` | chữ cầu vồng chạy màu — **mỗi trang tối đa một cụm từ** |
| `.text-gradient-brand` / `.text-gradient-sunny` | chữ gradient |
| `.deco` + `<b>`/`<s>` con | lớp chữ cái & bong bóng bay trang trí (nằm dưới nội dung) |
| `.marquee-track` | băng chữ chạy ngang (nội dung phải **nhân đôi**) |

Hoạt hình có sẵn: `animate-pop-in` `animate-wiggle` `animate-bounce-soft`
`animate-bob` `animate-tilt` `animate-drift` `animate-float-blob`
`animate-star-pop` `animate-fade-up` `animate-marquee` `animate-wave-slide`
`animate-hue` `animate-dot-pulse` `animate-eq-bar`.
Tất cả đã tắt ở `prefers-reduced-motion: reduce`.

---

## 6. Chế độ tối — "đêm cacao"

Không bỏ chế độ tối (nó là tính năng). Nền chuyển sang **nâu rất tối** (không
phải xanh đêm) để giữ hơi ấm thương hiệu; `brand-*` và `band-*` tự hạ chroma.

Vì vậy: **đừng viết màu cứng**. `bg-white`, `text-black`, `bg-amber-50` sẽ vỡ ở
chế độ tối. Dùng `bg-card`, `text-foreground`, `bg-band-sun`.

---

## 7. Bảng quy đổi khi gặp mã cũ

| Cũ | Mới |
|---|---|
| `bg-white` | `bg-card` |
| `text-slate-900`, `text-zinc-900`, `text-black` | `text-foreground` |
| `text-slate-500`, `text-zinc-500`, `text-muted-foreground` | `text-muted-foreground` |
| `bg-slate-50`, `bg-zinc-50`, `bg-gray-50` | `bg-muted` |
| `border-slate-200` | `border-border` |
| `bg-amber-*` / `bg-yellow-*` (nền nhạt) | `bg-band-sun` hoặc `bg-band-yel` |
| `text-amber-600`, `text-yellow-600` | `text-brand-gold` |
| `bg-sky-*` / `bg-blue-*` (nền nhạt) | `bg-band-sky` |
| `text-sky-600`, `text-blue-600` | `text-brand-sky` / `text-brand-blue` |
| `bg-emerald-*` / `bg-green-*` (nền nhạt) | `bg-band-mint` |
| `text-emerald-600`, `text-green-600` | `text-brand-teal` |
| `bg-rose-*` / `bg-red-*` / `bg-orange-*` (nền nhạt) | `bg-band-coral` |
| `text-rose-600`, `text-red-600` | `text-brand-coral` |
| `text-pink-600`, `text-fuchsia-600` | `text-brand-pink` |
| `bg-violet-*` / `bg-purple-*` / `bg-indigo-*` (nền nhạt) | `bg-band-lav` |
| `text-violet-600`, `text-indigo-600` | `text-brand-grape` |
| `shadow-md`, `shadow-lg`, `shadow-xl` | `shadow-soft`, `shadow-soft-lg`, `shadow-soft-xl` |
| `rounded`, `rounded-md` trên thẻ | `rounded-xl` |
| `dark:bg-…`, `dark:text-…` thủ công | bỏ đi — token ngữ nghĩa tự lo |

---

## 8. Điều KHÔNG được đổi khi restyle

Đây là công việc **chỉ đổi giao diện**:

- Không đổi tên/kiểu props, không đổi chữ ký hàm, không đổi export.
- Không đổi logic, state, hook, thứ tự gọi, điều kiện render (kể cả nhánh
  loading/empty/error — chúng chỉ được đổi *hình*, không được biến mất).
- Không đụng Server Action, API route, Prisma, `src/lib/*` (trừ phần thuần
  trình bày như `COURSE_THEME`).
- Không thêm/bớt thư viện.
- Giữ nguyên `aria-*`, `role`, `alt`, thứ tự tiêu đề — khả dụng không được lùi.
- Không thêm `"use client"` vào file đang là Server Component.
