import { useTheme } from "../../context/ThemeContext";

/**
 * @param {string}  label    - Card label shown at the top
 * @param {string}  value    - Primary value to display
 * @param {string}  [sub]    - Optional subtitle / change indicator
 * @param {string}  icon     - Emoji icon shown in the icon box
 * @param {string}  color    - Accent color used for the top stripe
 * @param {string}  colorBg  - Background for the icon box
 * @param {number}  [delay]  - Animation delay class suffix (1–5)
 */
export default function SummaryCard({ label, value, sub, icon, color, colorBg, delay = 1 }) {
  const { theme: t } = useTheme();

  return (
    <div
      className={`hover-lift fade-up fade-up-${delay}`}
      style={{
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 14,
        padding: "22px 24px",
        boxShadow: t.shadow,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent stripe */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: color,
          borderRadius: "14px 14px 0 0",
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div
            style={{
              fontSize: 12,
              color: t.textSub,
              fontWeight: 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            {label}
          </div>

          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 28,
              fontWeight: 700,
              color: t.text,
              lineHeight: 1,
            }}
          >
            {value}
          </div>

          {sub && (
            <div style={{ fontSize: 12, color: t.textMuted, marginTop: 8 }}>{sub}</div>
          )}
        </div>

        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: colorBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}