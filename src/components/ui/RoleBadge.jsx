import { useTheme } from "../../context/ThemeContext";
import { useRole } from "../../context/RoleContext";

export default function RoleBadge() {
  const { theme: t } = useTheme();
  const { role } = useRole();
  const isAdmin = role === "admin";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 10px",
        borderRadius: 20,
        background: isAdmin ? t.accentSub : t.blueSub,
        border: `1px solid ${isAdmin ? t.accent : t.blue}`,
      }}
    >
      <span style={{ fontSize: 12 }}>{isAdmin ? "🔑" : "👁️"}</span>
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: isAdmin ? t.accent : t.blue,
          fontFamily: "'Geist Mono', monospace",
        }}
      >
        {isAdmin ? "Admin" : "Viewer"}
      </span>
    </div>
  );
}