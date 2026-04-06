import { useTheme } from "../../context/ThemeContext";

/**
 * @param {string}      title     
 * @param {string}      [subtitle] 
 * @param {ReactNode}   [action]   
 */
export default function PageHeader({ title, subtitle, action }) {
  const { theme: t } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 28,
      }}
    >
      <div>
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 26,
            fontWeight: 800,
            color: t.text,
            lineHeight: 1,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p style={{ color: t.textMuted, fontSize: 13, marginTop: 4 }}>{subtitle}</p>
        )}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}