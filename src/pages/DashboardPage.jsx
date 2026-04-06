import { useState, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";
import { useRole } from "../context/RoleContext";
import { useTransactions } from "../context/TransactionsContext";
import { useDashboardMetrics } from "../hooks/useDashboardMetrics";
import { formatCompact } from "../utils/helpers";

import PageHeader        from "../components/layout/PageHeader";
import SummaryCard       from "../components/ui/SummaryCard";
import Modal             from "../components/ui/Modal";
import EmptyState        from "../components/ui/EmptyState";
import BalanceTrendChart from "../components/charts/BalanceTrendChart";
import DonutChart        from "../components/charts/DonutChart";
import TransactionList   from "../components/transactions/TransactionList";
import TransactionForm   from "../components/transactions/TransactionForm";

export default function DashboardPage({ onNavigateToTransactions }) {
  const { theme: t }                          = useTheme();
  const { isAdmin }                           = useRole();
  const { addTransaction, editTransaction, deleteTransaction } = useTransactions();

  const {
    aprTxns,
    totalIncome, totalExpense, totalBalance,
    incomeChange, expenseChange,
    categoryBreakdown,
  } = useDashboardMetrics();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editTxn,      setEditTxn]      = useState(null);

  const handleAdd = useCallback(
    (form) => { addTransaction(form); setShowAddModal(false); },
    [addTransaction]
  );

  const handleEdit = useCallback(
    (form) => { editTransaction(editTxn.id, form); setEditTxn(null); },
    [editTransaction, editTxn]
  );

  const cardStyle = {
    background: t.surface,
    border: `1px solid ${t.border}`,
    borderRadius: 14,
    padding: "22px 24px",
    boxShadow: t.shadow,
  };

  const addButton = isAdmin ? (
    <button
      onClick={() => setShowAddModal(true)}
      className="btn-press"
      style={{
        background: t.accent,
        border: "none",
        borderRadius: 10,
        padding: "10px 20px",
        color: "#fff",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 14,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span style={{ fontSize: 16 }}>＋</span> Add Transaction
    </button>
  ) : null;

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="April 2025 overview" action={addButton} />

      {/* ── Summary Cards ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 28,
        }}
      >
        <SummaryCard
          label="Total Balance"
          value={formatCompact(totalBalance)}
          sub={totalBalance >= 0 ? "💚 Positive cash flow" : "🔴 Negative cash flow"}
          icon="💳"
          color={totalBalance >= 0 ? t.green : t.accent}
          colorBg={totalBalance >= 0 ? t.greenSub : t.accentSub}
          delay={1}
        />
        <SummaryCard
          label="Total Income"
          value={formatCompact(totalIncome)}
          sub={`${incomeChange >= 0 ? "▲" : "▼"} ${Math.abs(incomeChange)}% vs March`}
          icon="💰"
          color={t.green}
          colorBg={t.greenSub}
          delay={2}
        />
        <SummaryCard
          label="Total Expenses"
          value={formatCompact(totalExpense)}
          sub={`${expenseChange >= 0 ? "▲" : "▼"} ${Math.abs(expenseChange)}% vs March`}
          icon="💸"
          color={t.accent}
          colorBg={t.accentSub}
          delay={3}
        />
        <SummaryCard
          label="Transactions"
          value={aprTxns.length}
          sub={`${aprTxns.filter((tx) => tx.type === "income").length} income · ${aprTxns.filter((tx) => tx.type === "expense").length} expense`}
          icon="📋"
          color={t.blue}
          colorBg={t.blueSub}
          delay={4}
        />
      </div>

      {/* ── Charts ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 20,
          marginBottom: 28,
        }}
      >
        {/* Trend chart */}
        <div className="fade-up fade-up-3" style={cardStyle}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: t.text, marginBottom: 4 }}>
            Income vs Expense Trend
          </div>
          <div style={{ fontSize: 12, color: t.textMuted, marginBottom: 18 }}>Feb — Apr 2025</div>
          <BalanceTrendChart />
        </div>

        {/* Donut chart */}
        <div className="fade-up fade-up-4" style={cardStyle}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: t.text, marginBottom: 4 }}>
            Spending by Category
          </div>
          <div style={{ fontSize: 12, color: t.textMuted, marginBottom: 20 }}>April 2025 · Expenses only</div>
          {categoryBreakdown.length > 0
            ? <DonutChart data={categoryBreakdown} />
            : <EmptyState icon="📊" title="No expense data yet" />
          }
        </div>
      </div>

      {/* ── Recent Transactions ── */}
      <div className="fade-up fade-up-5" style={{ ...cardStyle, padding: 0 }}>
        <div
          style={{
            padding: "20px 24px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: t.text }}>
            Recent Transactions
          </span>
          <button
            onClick={onNavigateToTransactions}
            style={{ background: "none", border: "none", cursor: "pointer", color: t.accent, fontSize: 13, fontWeight: 600 }}
          >
            View all →
          </button>
        </div>

        <TransactionList
          transactions={aprTxns.slice(0, 6)}
          compact
          onEdit={setEditTxn}
          onDelete={deleteTransaction}
        />
      </div>

      {/* ── Modals ── */}
      <Modal open={showAddModal} onClose={() => setShowAddModal(false)} title="Add Transaction">
        <TransactionForm onSave={handleAdd} onClose={() => setShowAddModal(false)} />
      </Modal>

      <Modal open={!!editTxn} onClose={() => setEditTxn(null)} title="Edit Transaction">
        {editTxn && (
          <TransactionForm
            onSave={handleEdit}
            onClose={() => setEditTxn(null)}
            editData={editTxn}
          />
        )}
      </Modal>
    </div>
  );
}