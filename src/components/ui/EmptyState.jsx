import { useTheme } from "../../context/ThemeContext";

/**
 * @param {string} icon     - Large emoji shown above the message
 * @param {string} title    - Bold heading
 * @param {string} message  - Supporting text
 */
export default function EmptyState({ icon = "📭", title = "No data", message = "" }) {
  const { theme: t } = useTheme();

  return (
    <div
      style={{
        textAlign: "center",
        padding: "60px 24px",
        color: t.textMuted,
      }}
    >
      <div style={{ fontSize: 48, marginBottom: 16 }}>{icon}</div>
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 18,
          fontWeight: 700,
          marginBottom: 8,
          color: t.text,
        }}
      >
        {title}
      </div>
      {message && <div style={{ fontSize: 14 }}>{message}</div>}
    </div>
  );
}