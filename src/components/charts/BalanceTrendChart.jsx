import { useTheme } from "../../context/ThemeContext";
import { useTransactions } from "../../context/TransactionsContext";
import { sumByType } from "../../utils/helpers";
import { useMemo } from "react";

const CHART_MONTHS = [
  { label: "Feb", monthNum: 2 },
  { label: "Mar", monthNum: 3 },
  { label: "Apr", monthNum: 4 },
];

const W = 520, H = 180, PAD = 40;
const INNER_W = W - PAD * 2;
const INNER_H = H - PAD - 20;
const BAR_W = 40;

export default function BalanceTrendChart() {
  const { theme: t } = useTheme();
  const { transactions } = useTransactions();

  const data = useMemo(
    () =>
      CHART_MONTHS.map(({ label, monthNum }) => {
        const monthTxns = transactions.filter(
          (tx) =>
            new Date(tx.date).getMonth() + 1 === monthNum &&
            new Date(tx.date).getFullYear() === 2025
        );
        const income  = sumByType(monthTxns, "income");
        const expense = sumByType(monthTxns, "expense");
        return { label, income, expense, net: income - expense };
      }),
    [transactions]
  );

  const max = Math.max(...data.map((d) => Math.max(d.income, d.expense))) * 1.15 || 1;
  const gap = (INNER_W - CHART_MONTHS.length * BAR_W * 2) / (CHART_MONTHS.length + 1);

  const netPoints = data.map((d, i) => {
    const x = PAD + gap * (i + 1) + i * BAR_W * 2 + BAR_W;
    const y = PAD + INNER_H - (d.net / max) * INNER_H;
    return [x, y];
  });
  const linePath = netPoints
    .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`)
    .join(" ");

  const LEGEND = [
    { color: t.green,  label: "Income"  },
    { color: t.accent, label: "Expense" },
    { color: t.blue,   label: "Net"     },
  ];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", overflow: "visible" }}>
      <defs>
        <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={t.green}  stopOpacity="0.9" />
          <stop offset="100%" stopColor={t.green}  stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={t.accent} stopOpacity="0.9" />
          <stop offset="100%" stopColor={t.accent} stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <line
          key={f}
          x1={PAD}  y1={PAD + INNER_H - f * INNER_H}
          x2={W - PAD} y2={PAD + INNER_H - f * INNER_H}
          stroke={t.border} strokeWidth="1" strokeDasharray="4 4"
        />
      ))}

      {/* Bars */}
      {data.map((d, i) => {
        const x0   = PAD + gap * (i + 1) + i * BAR_W * 2;
        const incH = (d.income  / max) * INNER_H;
        const expH = (d.expense / max) * INNER_H;
        return (
          <g key={d.label}>
            <rect
              x={x0} y={PAD + INNER_H - incH} width={BAR_W} height={incH}
              fill="url(#incGrad)" rx="4"
              style={{ transformOrigin: `${x0}px ${PAD + INNER_H}px`, animation: `barGrow 0.6s ease ${i * 0.1}s both` }}
            />
            <rect
              x={x0 + BAR_W} y={PAD + INNER_H - expH} width={BAR_W} height={expH}
              fill="url(#expGrad)" rx="4"
              style={{ transformOrigin: `${x0 + BAR_W}px ${PAD + INNER_H}px`, animation: `barGrow 0.6s ease ${i * 0.1 + 0.05}s both` }}
            />
            <text
              x={x0 + BAR_W} y={H - 4}
              textAnchor="middle" fill={t.textSub}
              fontSize="12" fontFamily="'Geist Mono', monospace"
            >
              {d.label}
            </text>
          </g>
        );
      })}

      {/* Net trend line */}
      <path d={linePath} fill="none" stroke={t.blue} strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 3" />
      {netPoints.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill={t.blue} stroke={t.surface} strokeWidth="2" />
      ))}

      {/* Legend */}
      {LEGEND.map(({ color, label }, i) => (
        <g key={label} transform={`translate(${PAD + i * 80}, 12)`}>
          <rect width="10" height="10" rx="2" fill={color} />
          <text x="14" y="9" fill={t.textSub} fontSize="11" fontFamily="'Geist', sans-serif">
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}