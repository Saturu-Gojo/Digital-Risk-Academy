import { useTheme } from "../../context/ThemeContext";
import TransactionRow from "./TransactionRow";
import EmptyState from "../ui/EmptyState";

const FULL_HEADERS = ["Description", "Category", "Date", "Amount", ""];

/**
 * @param {object[]}  transactions  - Array of transaction objects to display
 * @param {boolean}   [compact]     - Compact layout (no category/date columns)
 * @param {Function}  onEdit        - Passed down to each row
 * @param {Function}  onDelete      - Passed down to each row
 */
export default function TransactionList({ transactions, compact, onEdit, onDelete }) {
  const { theme: t } = useTheme();

  if (!transactions || transactions.length === 0) {
    return (
      <EmptyState
        icon="🔍"
        title="No transactions found"
        message="Try adjusting your search or filters"
      />
    );
  }

  return (
    <div>
      {/* Column headers — full mode only */}
      {!compact && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 120px 110px 90px 80px",
            gap: 12,
            padding: "12px 24px",
            borderBottom: `1px solid ${t.border}`,
          }}
        >
          {FULL_HEADERS.map((h, i) => (
            <span
              key={i}
              style={{
                fontSize: 11,
                color: t.textMuted,
                fontWeight: 500,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {h}
            </span>
          ))}
        </div>
      )}

      {/* Rows */}
      {transactions.map((tx, i) => (
        <div
          key={tx.id}
          style={{
            borderBottom:
              i < transactions.length - 1 ? `1px solid ${t.border}` : "none",
          }}
        >
          <TransactionRow
            transaction={tx}
            compact={compact}
            animDelay={i}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
}