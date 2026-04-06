import { useMemo } from "react";
import { useTransactions } from "../context/TransactionsContext";
import {
  sumByType,
  percentChange,
  buildCategoryBreakdown,
} from "../utils/helpers";

/**
 * Computes all derived values needed by the Dashboard and Insights pages.
 * Keeps heavy memoization in one place so pages stay lean.
 */
export function useDashboardMetrics() {
  const { transactions } = useTransactions();

  const aprTxns = useMemo(
    () => transactions.filter((tx) => tx.date.startsWith("2025-04")),
    [transactions]
  );

  const marTxns = useMemo(
    () => transactions.filter((tx) => tx.date.startsWith("2025-03")),
    [transactions]
  );

  const totalIncome  = useMemo(() => sumByType(aprTxns, "income"),  [aprTxns]);
  const totalExpense = useMemo(() => sumByType(aprTxns, "expense"), [aprTxns]);
  const totalBalance = totalIncome - totalExpense;

  const marIncome  = useMemo(() => sumByType(marTxns, "income"),  [marTxns]);
  const marExpense = useMemo(() => sumByType(marTxns, "expense"), [marTxns]);

  const incomeChange  = percentChange(totalIncome,  marIncome);
  const expenseChange = percentChange(totalExpense, marExpense);

  const categoryBreakdown = useMemo(
    () => buildCategoryBreakdown(aprTxns),
    [aprTxns]
  );

  const topCategory = categoryBreakdown[0] ?? null;

  const largestTransaction = useMemo(
    () =>
      aprTxns.length > 0
        ? aprTxns.reduce((max, tx) => (tx.amount > max.amount ? tx : max), aprTxns[0])
        : null,
    [aprTxns]
  );

  const savingsRate =
    totalIncome > 0 ? Math.round((totalBalance / totalIncome) * 100) : 0;

  const dailyAvgSpend =
    aprTxns.length > 0 ? Math.round(totalExpense / 20) : 0;

  const incomeSources = useMemo(
    () => [...new Set(aprTxns.filter((tx) => tx.type === "income").map((tx) => tx.cat))],
    [aprTxns]
  );

  return {
    aprTxns,
    marTxns,
    totalIncome,
    totalExpense,
    totalBalance,
    marIncome,
    marExpense,
    incomeChange,
    expenseChange,
    categoryBreakdown,
    topCategory,
    largestTransaction,
    savingsRate,
    dailyAvgSpend,
    incomeSources,
  };
}