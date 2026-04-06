import { useState, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";
import { useRole } from "../context/RoleContext";
import { useTransactions } from "../context/TransactionsContext";
import { useTransactionFilters } from "../hooks/useTransactionFilters";

import PageHeader          from "../components/layout/PageHeader";
import Modal               from "../components/ui/Modal";
import TransactionList     from "../components/transactions/TransactionList";
import TransactionFilters  from "../components/transactions/TransactionFilters";
import TransactionForm     from "../components/transactions/TransactionForm";

export default function TransactionsPage() {
  const { theme: t }                                          = useTheme();
  const { isAdmin }                                           = useRole();
  const { addTransaction, editTransaction, deleteTransaction } = useTransactions();

  const {
    filtered,
    search,     setSearch,
    filterType, setFilterType,
    filterCat,  setFilterCat,
    sortBy,     setSortBy,
  } = useTransactionFilters();

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
      <span>＋</span> Add
    </button>
  ) : null;

  return (
    <div>
      <PageHeader
        title="Transactions"
        subtitle={`${filtered.length} record${filtered.length !== 1 ? "s" : ""} found`}
        action={addButton}
      />

      <TransactionFilters
        search={search}           setSearch={setSearch}
        filterType={filterType}   setFilterType={setFilterType}
        filterCat={filterCat}     setFilterCat={setFilterCat}
        sortBy={sortBy}           setSortBy={setSortBy}
      />

      <div
        className="fade-up fade-up-1"
        style={{
          background: t.surface,
          border: `1px solid ${t.border}`,
          borderRadius: 14,
          boxShadow: t.shadow,
        }}
      >
        <TransactionList
          transactions={filtered}
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