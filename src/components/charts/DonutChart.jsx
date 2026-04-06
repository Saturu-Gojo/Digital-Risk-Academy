import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { formatCompact } from "../../utils/helpers";

const CX = 100, CY = 100, R = 72, STROKE = 28;

function buildSlices(data) {
  let cumulative = 0;
  const total = data.reduce((s, d) => s + d.value, 0);

  return data.map((d) => {
    const pct        = d.value / total;
    const startAngle = cumulative * 2 * Math.PI - Math.PI / 2;
    cumulative      += pct;
    const endAngle   = cumulative * 2 * Math.PI - Math.PI / 2;

    return {
      ...d,
      pct,
      large: pct > 0.5 ? 1 : 0,
      x1: CX + R * Math.cos(startAngle),
      y1: CY + R * Math.sin(startAngle),
      x2: CX + R * Math.cos(endAngle),
      y2: CY + R * Math.sin(endAngle),
    };
  });
}

/**
 * @param {{ name: string, value: number, color: string }[]} data
 */
export default function DonutChart({ data }) {
  const { theme: t } = useTheme();
  const [hovered, setHovered] = useState(null);

  if (!data || data.length === 0) return null;

  const slices = buildSlices(data);
  const total  = data.reduce((s, d) => s + d.value, 0);

  const centerLabel = hovered !== null
    ? `${Math.round(slices[hovered].pct * 100)}%`
    : formatCompact(total);
  const centerSub = hovered !== null ? slices[hovered].name : "total exp";

  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
      {/* Donut SVG */}
      <svg viewBox="0 0 200 200" style={{ width: 160, height: 160, flexShrink: 0 }}>
        {slices.map((s, i) => (
          <path
            key={i}
            d={`M ${CX} ${CY} L ${s.x1} ${s.y1} A ${R} ${R} 0 ${s.large} 1 ${s.x2} ${s.y2} Z`}
            fill={s.color}
            opacity={hovered === null || hovered === i ? 1 : 0.35}
            style={{
              cursor: "pointer",
              transition: "opacity 0.2s, transform 0.2s",
              transform: hovered === i ? "scale(1.04)" : "scale(1)",
              transformOrigin: `${CX}px ${CY}px`,
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}

        {/* Center hole */}
        <circle cx={CX} cy={CY} r={R - STROKE} fill={t.surface} />

        {/* Center labels */}
        <text x={CX} y={CY - 6} textAnchor="middle" fill={t.text}
          fontSize="13" fontWeight="700" fontFamily="'Syne', sans-serif">
          {centerLabel}
        </text>
        <text x={CX} y={CY + 10} textAnchor="middle" fill={t.textMuted}
          fontSize="9" fontFamily="'Geist', sans-serif">
          {centerSub}
        </text>
      </svg>

      {/* Legend */}
      <div style={{ flex: 1, minWidth: 160 }}>
        {data.map((d, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "6px 0",
              cursor: "pointer",
              opacity: hovered === null || hovered === i ? 1 : 0.45,
              transition: "opacity 0.2s",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 2, background: d.color, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: t.text, flex: 1, fontFamily: "'Geist', sans-serif" }}>
              {d.name}
            </span>
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, color: t.textSub }}>
              {formatCompact(d.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}