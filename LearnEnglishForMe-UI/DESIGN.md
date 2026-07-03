---
colors:
  primary: "#64748b" # Soft slate
  primary_hover: "#475569" # Darker soft slate
  secondary: "#9ca3af" # Soft gray
  background: "#f9fafb" # Very soft light gray
  surface: "#ffffff" # Pure white for cards
  surface_highlight: "#f3f4f6" # Soft hover gray
  border: "#e5e7eb" # Gentle border
  text_main: "#374151" # Softer dark gray text
  text_muted: "#6b7280" # Muted gray text
  success: "#10b981" # Soft green
  danger: "#ef4444" # Soft red

typography:
  fontFamily: '"Inter", "Nunito", system-ui, sans-serif'
  h1: "2rem, 600"
  h2: "1.5rem, 500"
  body: "1rem, 400"

spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"

rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  full: "9999px"

components:
  card: "background: surface, border: 1px solid border, border-radius: lg, box-shadow: soft"
  button_primary: "background: primary, color: white, border-radius: full, padding: md xl"
  nav_pill: "background: surface_highlight, color: text_main, border-radius: full, padding: sm md"
---

# Design System: TenseMaster UI (Soft Minimalist Gray)

Đây là hệ thống thiết kế cho dự án TenseMaster, mang phong cách **Soft Minimalist** với tone màu xám nhạt nhẹ nhàng, thanh lịch và mềm mại hơn.

### Rationale (Lý do chọn thiết kế)
- **Background & Surface:** Sử dụng màu nền xám rất nhạt (`#f9fafb`) kết hợp với nền trắng (`#ffffff`) cho thẻ nội dung. Sự tương phản dịu nhẹ giúp giảm mỏi mắt.
- **Color Palette:** Tone xám đá (Slate Gray - `#64748b`) làm chủ đạo, đem lại sự tập trung cao, không bị gắt.
- **Typography:** Trở lại font chữ Sans-serif hiện đại, mượt mà (`Inter`, `Nunito`) giúp giao diện trông thân thiện và thanh thoát hơn.
- **Shapes:** Các góc bo được khôi phục ở mức vừa phải (`12px` - `16px`) cho các khối và bo tròn hoàn toàn (`9999px`) cho nút bấm, đem lại cảm giác mượt mà và dễ chạm.
- **Shadows:** Đổ bóng siêu nhạt và khuếch tán rộng (`rgba(0,0,0,0.04)`) để giao diện trông như đang lơ lửng một cách tinh tế.
