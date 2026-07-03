---
colors:
  primary: "#6366f1"
  primary_hover: "#4f46e5"
  secondary: "#ec4899"
  background: "#0f172a"
  surface: "#1e293b"
  surface_highlight: "#334155"
  border: "#334155"
  text_main: "#f8fafc"
  text_muted: "#94a3b8"
  success: "#10b981"
  danger: "#ef4444"

typography:
  fontFamily: "Inter, sans-serif"
  h1: "2rem, 700"
  h2: "1.5rem, 600"
  body: "1rem, 400"

spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"

rounded:
  sm: "6px"
  md: "12px"
  lg: "24px"
  full: "9999px"

components:
  card: "background: surface, border: 1px solid border, border-radius: lg"
  button_primary: "background: primary, color: text_main, border-radius: full, padding: md xl"
  nav_pill: "background: surface_highlight, color: text_main, border-radius: full, padding: sm md"
---

# Design System: TenseMaster UI

Đây là hệ thống thiết kế cho dự án TenseMaster, dựa trên cảm hứng từ bản thiết kế Figma của user nhưng được làm mới theo phong cách **Modern Dark Mode** (Tối và mượt mà).

### Rationale (Lý do chọn thiết kế)
- **Background & Surface:** Sử dụng màu Slate (xanh đá sẫm - `#0f172a`) để tạo chiều sâu và cảm giác cao cấp.
- **Primary Color:** Xanh Indigo (`#6366f1`) cực kỳ rực rỡ, phù hợp làm nút CTA ("Bắt đầu ngay", "Chiến thôi nào").
- **Shapes:** Tất cả nút bấm và thẻ (Card) đều có bo góc lớn (border-radius: `24px` hoặc `9999px`) để đem lại cảm giác thân thiện, giảm bớt sự cứng nhắc của các ứng dụng học tập truyền thống.
- **Micro-interactions:** Mọi hiệu ứng hover trên nút hoặc thẻ đều có transition mềm mại.
