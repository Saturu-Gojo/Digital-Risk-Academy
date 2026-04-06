import { useTheme } from "../../context/ThemeContext";
import { CATEGORIES, SORT_OPTIONS, TYPE_OPTIONS } from "../../constants/data";

/**
 * @param {string}    search        setSearch
 * @param {string}    filterType    setFilterType
 * @param {string}    filterCat     
 * @param {string}    sortBy        
 * @param {Function}  setSearch
 * @param {Function}  setFilterType
 * @param {Function}  setFilterCat
 * @param {Function}  setSortBy
 */
export default function TransactionFilters({
  search,     setSearch,
  filterType, setFilterType,
  filterCat,  setFilterCat,
  sortBy,     setSortBy,
}) {
  const { theme: t } = useTheme();

  const inputStyle = {
    background: t.surfaceAlt,
    border: `1px solid ${t.border}`,
    borderRadius: 8,
    color: t.text,
    padding: "9px 14px",
    fontSize: 13,
    outline: "none",
    fontFamily: "'Geist', sans-serif",
  };

  return (
    <div
      className="fade-up"
      style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}
    >
      {/* Search */}
      <input
        placeholder="🔍  Search transactions…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ ...inputStyle, flex: "1 1 200px", minWidth: 200 }}
      />

      {/* Type filter */}
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        style={{ ...inputStyle, minWidth: 130 }}
      >
        {TYPE_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      {/* Category filter */}
      <select
        value={filterCat}
        onChange={(e) => setFilterCat(e.target.value)}
        style={{ ...inputStyle, minWidth: 150 }}
      >
        <option value="all">All Categories</option>
        {CATEGORIES.map((c) => (
          <option key={c.name} value={c.name}>{c.icon} {c.name}</option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        style={{ ...inputStyle, minWidth: 160 }}
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}