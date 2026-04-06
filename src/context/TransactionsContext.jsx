import { createContext, useContext, useState, useCallback } from "react";
import { SEED_TRANSACTIONS } from "../constants/data";

const TransactionsContext = createContext(null);

export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState(SEED_TRANSACTIONS);
  const [nextId, setNextId] = useState(100);

  const addTransaction = useCallback(
    (form) => {
      const newTx = { ...form, id: nextId, amount: parseFloat(form.amount) };
      setTransactions((prev) => [newTx, ...prev]);
      setNextId((n) => n + 1);
    },
    [nextId]
  );

  const editTransaction = useCallback((id, form) => {
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === id ? { ...tx, ...form, amount: parseFloat(form.amount) } : tx
      )
    );
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  }, []);

  return (
    <TransactionsContext.Provider
      value={{ transactions, addTransaction, editTransaction, deleteTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

/** Hook to access transactions and CRUD operations */
export function useTransactions() {
  const ctx = useContext(TransactionsContext);
  if (!ctx) throw new Error("useTransactions must be used inside <TransactionsProvider>");
  return ctx;
}