import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { CATEGORIES } from "../../constants/data";

const EXPENSE_CATS = CATEGORIES.filter(
  (c) => !["Salary", "Freelance", "Investment"].includes(c.name)
);
const INCOME_CATS = CATEGORIES.filter((c) =>
  ["Salary", "Freelance", "Investment"].includes(c.name)
);

const DEFAULT_FORM = {
  date:   new Date().toISOString().slice(0, 10),
  desc:   "",
  cat:    "Food",
  type:   "expense",
  amount: "",
};

/**
 * @param {Function}  onSave     - Called with the form object when submitted
 * @param {Function}  onClose    - Called to dismiss the modal
 * @param {object}    [editData] - Pre-filled values when editing an existing transaction
 */
export default function TransactionForm({ onSave, onClose, editData }) {
  const { theme: t } = useTheme();

  const [form, setForm] = useState(
    editData
      ? { ...editData, amount: String(editData.amount) }
      : DEFAULT_FORM
  );

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleTypeToggle = (type) => {
    set("type", type);
    set("cat", type === "income" ? "Salary" : "Food");
  };

  const handleSubmit = () => {
    if (form.desc.trim() && form.amount && form.date) {
      onSave(form);
    }
  };

  const cats = form.type === "income" ? INCOME_CATS : EXPENSE_CATS;

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    background: t.surfaceAlt,
    border: `1px solid ${t.border}`,
    borderRadius: 8,
    color: t.text,
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    fontSize: 12,
    color: t.textSub,
    marginBottom: 6,
    display: "block",
    fontWeight: 500,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Type toggle */}
      <div>
        <span style={labelStyle}>Type</span>
        <div
          style={{
            display: "flex",
            background: t.surfaceAlt,
            borderRadius: 8,
            padding: 4,
            border: `1px solid ${t.border}`,
          }}
        >
          {["expense", "income"].map((tp) => (
            <button
              key={tp}
              onClick={() => handleTypeToggle(tp)}
              style={{
                flex: 1,
                padding: "8px 0",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                background:
                  form.type === tp
                    ? tp === "expense"
                      ? t.accent
                      : t.green
                    : "transparent",
                color: form.type === tp ? "#fff" : t.textSub,
                transition: "all 0.2s",
                textTransform: "capitalize",
              }}
            >
              {tp}
            </button>
          ))}
        </div>
      </div>

      {/* Date + Amount */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <span style={labelStyle}>Date</span>
          <input
            type="date"
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <span style={labelStyle}>Amount (₹)</span>
          <input
            type="number"
            placeholder="0"
            value={form.amount}
            onChange={(e) => set("amount", e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <span style={labelStyle}>Description</span>
        <input
          placeholder="e.g. Monthly salary, Swiggy order…"
          value={form.desc}
          onChange={(e) => set("desc", e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* Category */}
      <div>
        <span style={labelStyle}>Category</span>
        <select
          value={form.cat}
          onChange={(e) => set("cat", e.target.value)}
          style={inputStyle}
        >
          {cats.map((c) => (
            <option key={c.name} value={c.name}>
              {c.icon} {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
        <button
          onClick={onClose}
          style={{
            flex: 1,
            padding: "11px",
            background: "none",
            border: `1px solid ${t.border}`,
            borderRadius: 8,
            color: t.textSub,
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="btn-press"
          style={{
            flex: 2,
            padding: "11px",
            background: t.accent,
            border: "none",
            borderRadius: 8,
            color: "#fff",
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {editData ? "Save Changes" : "Add Transaction"}
        </button>
      </div>
    </div>
  );
}