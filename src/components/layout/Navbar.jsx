import { useTheme } from "../../context/ThemeContext";
import { useRole, ROLES } from "../../context/RoleContext";
import RoleBadge from "../ui/RoleBadge";
import { NAV_ITEMS } from "../../constants/theme";

const inputBase = (t) => ({
  background: t.surfaceAlt,
  border: `1px solid ${t.border}`,
  borderRadius: 8,
  color: t.text,
  outline: "none",
  fontFamily: "'Geist', sans-serif",
});

export default function Navbar({ activeTab, onTabChange }) {
  const { theme: t, dark, toggleDark } = useTheme();
  const { role, setRole } = useRole();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: t.surface,
        borderBottom: `1px solid ${t.border}`,
        padding: "0 24px",
        height: 60,
        display: "flex",
        alignItems: "center",
        gap: 16,
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: t.accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 13,
            color: "#fff",
          }}
        >
          ₹
        </div>
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 16,
            color: t.text,
          }}
        >
          FinTrack
        </span>
      </div>

      {/* Navigation tabs */}
      <nav style={{ display: "flex", gap: 2, marginLeft: 16 }}>
        {NAV_ITEMS.map((item) => {
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="btn-press"
              style={{
                background: active ? t.accentSub : "transparent",
                border: active ? `1px solid ${t.accent}` : "1px solid transparent",
                borderRadius: 8,
                padding: "6px 14px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: active ? t.accent : t.textSub,
                fontSize: 13,
                fontWeight: active ? 600 : 400,
                transition: "all 0.2s",
              }}
            >
              <span style={{ fontSize: 14 }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right side controls */}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
        <RoleBadge />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ ...inputBase(t), fontSize: 12, padding: "6px 10px", cursor: "pointer" }}
        >
          <option value={ROLES.ADMIN}>Admin</option>
          <option value={ROLES.VIEWER}>Viewer</option>
        </select>

        <button
          onClick={toggleDark}
          className="btn-press"
          title="Toggle dark mode"
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: t.surfaceAlt,
            border: `1px solid ${t.border}`,
            cursor: "pointer",
            fontSize: 17,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: t.text,
          }}
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}