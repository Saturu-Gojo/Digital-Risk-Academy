import { useTheme } from "../../context/ThemeContext";
import { formatCompact } from "../../utils/helpers";
import EmptyState from "../ui/EmptyState";

/**
 * @param {{ name: string, value: number, color: string, icon: string }[]} data
 * @param {number} totalExpense  - Used to compute share percentages
 */
export default function CategoryBreakdownChart({ data, totalExpense }) {
  const { theme: t } = useTheme();

  if (!data || data.length === 0) {
    return <EmptyState icon="📊" title="No data available" />;
  }

  const maxValue = data[0].value;

  return (
    <div>
      {data.map((cat, i) => {
        const barPct   = Math.round((cat.value / maxValue) * 100);
        const sharePct = totalExpense > 0 ? Math.round((cat.value / totalExpense) * 100) : 0;

        return (
          <div key={cat.name} style={{ marginBottom: 16 }}>
            {/* Row header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span>{cat.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 500, color: t.text }}>{cat.name}</span>
              </div>

              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 13, color: t.textSub }}>
                  {sharePct}%
                </span>
                <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 13, color: t.text, fontWeight: 600 }}>
                  {formatCompact(cat.value)}
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ height: 8, background: t.surfaceAlt, borderRadius: 4, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${barPct}%`,
                  background: cat.color,
                  borderRadius: 4,
                  transition: "width 0.8s ease",
                  animation: `barGrow 0.6s ease ${i * 0.08}s both`,
                  transformOrigin: "left center",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}