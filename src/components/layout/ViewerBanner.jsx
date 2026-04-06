import { useTheme } from "../../context/ThemeContext";
import { useRole } from "../../context/RoleContext";

export default function ViewerBanner() {
  const { theme: t } = useTheme();
  const { isAdmin } = useRole();

  if (isAdmin) return null;

  return (
    <div
      style={{
        background: t.blueSub,
        borderBottom: `1px solid ${t.blue}`,
        padding: "8px 24px",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span style={{ fontSize: 13 }}>👁️</span>
      <span style={{ fontSize: 13, color: t.blue, fontWeight: 500 }}>
        Viewer mode — read-only access. Switch to Admin to add or edit transactions.
      </span>
    </div>
  );
}