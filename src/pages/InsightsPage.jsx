import { useTheme } from "../context/ThemeContext";
import { useDashboardMetrics } from "../hooks/UseDashboardMetrics";
import { formatCompact } from "../utils/helpers";

import PageHeader              from "../components/layout/PageHeader";
import InsightCard             from "../components/ui/InsightCard";
import CategoryBreakdownChart  from "../components/charts/CategoryBreakdownChart";

export default function InsightsPage() {
  const { theme: t } = useTheme();

  const {
    aprTxns,
    totalIncome, totalExpense, totalBalance,
    marExpense,
    expenseChange,
    categoryBreakdown,
    topCategory,
    largestTransaction,
    savingsRate,
    dailyAvgSpend,
    incomeSources,
  } = useDashboardMetrics();

  const cardStyle = {
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 14,
    padding: "24px",
    boxShadow: t.shadow,
  };

  return (
    <div>
      <PageHeader title="Insights" subtitle="Smart observations from your data" />

      {/* ── Insight Cards ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
          marginBottom: 28,
        }}
      >
        {topCategory && (
          <InsightCard
            icon="🔥"
            label="Top Spending Category"
            value={topCategory.name}
            detail={`${formatCompact(topCategory.value)} spent — ${Math.round(
              (topCategory.value / totalExpense) * 100
            )}% of total expenses`}
            color={t.accent}
            colorBg={t.accentSub}
          />
        )}

        <InsightCard
          icon="📊"
          label="Savings Rate"
          value={`${savingsRate}%`}
          detail={
            totalBalance >= 0
              ? `Saved ${formatCompact(totalBalance)} this month — great discipline!`
              : "You've spent more than earned this month."
          }
          color={totalBalance >= 0 ? t.green : t.accent}
          colorBg={totalBalance >= 0 ? t.greenSub : t.accentSub}
        />

        <InsightCard
          icon="📅"
          label="Month-over-Month"
          value={`${expenseChange >= 0 ? "+" : ""}${expenseChange}% expenses`}
          detail={`Expenses ${expenseChange > 0 ? "increased" : "decreased"} by ${formatCompact(
            Math.abs(totalExpense - marExpense)
          )} vs March`}
          color={expenseChange > 0 ? t.accent : t.green}
          colorBg={expenseChange > 0 ? t.accentSub : t.greenSub}
        />

        {largestTransaction && (
          <InsightCard
            icon="💡"
            label="Largest Transaction"
            value={formatCompact(largestTransaction.amount)}
            detail={`${largestTransaction.desc} — highest single transaction`}
            color={t.amber}
            colorBg={t.amberSub}
          />
        )}

        <InsightCard
          icon="⚡"
          label="Daily Average Spend"
          value={formatCompact(dailyAvgSpend)}
          detail="Based on 20 tracked days in April 2025"
          color={t.blue}
          colorBg={t.blueSub}
        />

        <InsightCard
          icon="🎯"
          label="Income Sources"
          value={`${incomeSources.length} source${incomeSources.length !== 1 ? "s" : ""}`}
          detail={
            incomeSources.length > 0
              ? `${incomeSources.join(", ")} — diversified income`
              : "No income recorded this month"
          }
          color={t.green}
          colorBg={t.greenSub}
        />
      </div>

      {/* ── Category Deep Dive ── */}
      <div className="fade-up" style={cardStyle}>
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            color: t.text,
            marginBottom: 20,
          }}
        >
          Category Deep Dive — April 2025
        </div>

        <CategoryBreakdownChart
          data={categoryBreakdown}
          totalExpense={totalExpense}
        />
      </div>
    </div>
  );
}