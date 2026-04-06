import { useTheme } from "../../context/ThemeContext";

/**
 * @param {string} icon     - Emoji icon
 * @param {string} label    - Muted label above the value
 * @param {string} value    - Bold primary value
 * @param {string} detail   - Supporting description text
 * @param {string} color    - Text color for the value
 * @param {string} colorBg  - Background for the icon box
 */
export default function InsightCard({ icon, label, value, detail, color, colorBg }) {
  const { theme: t } = useTheme();

  return (
    <div
      className="hover-lift"
      style={{
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 12,
        padding: "18px 20px",
        boxShadow: t.shadow,
      }}
    >
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: colorBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 11,
              color: t.textMuted,
              fontWeight: 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            {label}
          </div>

          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 17,
              fontWeight: 700,
              color,
              lineHeight: 1.2,
              marginBottom: 4,
            }}
          >
            {value}
          </div>

          <div style={{ fontSize: 12, color: t.textSub, lineHeight: 1.5 }}>{detail}</div>
        </div>
      </div>
    </div>
  );
}