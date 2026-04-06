import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useRole } from "../../context/RoleContext";
import { getCategoryMeta, formatCompact } from "../../utils/helpers";

/**
 * @param {object}    transaction  - Transaction data object
 * @param {boolean}   compact      - Compact mode hides category/date columns
 * @param {number}    animDelay    - Staggered animation delay index
 * @param {Function}  onEdit       - Called with the transaction when edit is clicked
 * @param {Function}  onDelete     - Called with the transaction id when delete is clicked
 */
export default function TransactionRow({ transaction: tx, compact, animDelay, onEdit, onDelete }) {
  const { theme: t }  = useTheme();
  const { isAdmin }   = useRole();
  const [hovered, setHovered] = useState(false);

  const cat   = getCategoryMeta(tx.cat);
  const isInc = tx.type === "income";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: compact ? "auto 1fr auto" : "1fr 120px 110px 90px 80px",
        gap: 12,
        alignItems: "center",
        padding: compact ? "14px 24px" : "16px 24px",
        background: hovered ? t.surfaceAlt : "transparent",
        transition: "background 0.15s",
        cursor: "default",
        animation: `slideIn 0.3s ease ${Math.min(animDelay, 8) * 0.04}s both`,
      }}
    >
      {/* Icon + description */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: isInc ? t.greenSub : t.accentSub,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 17,
            flexShrink: 0,
          }}
        >
          {cat.icon}
        </div>

        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: t.text, lineHeight: 1.2 }}>
            {tx.desc}
          </div>
          {compact && (
            <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>
              {tx.cat} · {tx.date}
            </div>
          )}
        </div>
      </div>

      {/* Category pill (full mode only) */}
      {!compact && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              fontSize: 11,
              padding: "3px 8px",
              borderRadius: 20,
              background: `${cat.color}20`,
              color: cat.color,
              fontWeight: 500,
            }}
          >
            {tx.cat}
          </span>
        </div>
      )}

      {/* Date (full mode only) */}
      {!compact && (
        <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, color: t.textSub }}>
          {tx.date}
        </span>
      )}

      {/* Amount */}
      <span
        style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: 14,
          fontWeight: 700,
          color: isInc ? t.green : t.accent,
          textAlign: compact ? "right" : "left",
        }}
      >
        {isInc ? "+" : "−"}{formatCompact(tx.amount)}
      </span>

      {/* Actions (full mode + admin only) */}
      {!compact && isAdmin && (
        <div
          style={{
            display: "flex",
            gap: 6,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          <button
            onClick={() => onEdit(tx)}
            title="Edit"
            style={{
              width: 30,
              height: 30,
              borderRadius: 6,
              background: t.blueSub,
              border: `1px solid ${t.blue}`,
              cursor: "pointer",
              color: t.blue,
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✎
          </button>
          <button
            onClick={() => onDelete(tx.id)}
            title="Delete"
            style={{
              width: 30,
              height: 30,
              borderRadius: 6,
              background: t.accentSub,
              border: `1px solid ${t.accent}`,
              cursor: "pointer",
              color: t.accent,
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}