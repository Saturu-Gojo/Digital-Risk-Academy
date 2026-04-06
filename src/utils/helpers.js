import { CATEGORIES } from "../constants/data";

/** Format a number as Indian Rupee currency string */
export const formatCurrency = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

/** Format a number as compact Indian notation (₹1.2L, ₹45K, ₹999) */
export const formatCompact = (n) => {
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(1)}L`;
  if (n >= 1_000)   return `₹${(n / 1_000).toFixed(0)}K`;
  return `₹${n}`;
};

/** Look up category metadata (icon + color) by name */
export const getCategoryMeta = (name) =>
  CATEGORIES.find((c) => c.name === name) ?? { icon: "💰", color: "#888" };

/** Compute total income or expense from a list of transactions */
export const sumByType = (transactions, type) =>
  transactions
    .filter((tx) => tx.type === type)
    .reduce((sum, tx) => sum + tx.amount, 0);

/** Compute percentage change between two values (returns 0 if base is 0) */
export const percentChange = (current, previous) =>
  previous > 0 ? Math.round(((current - previous) / previous) * 100) : 0;

/** Build a category breakdown array sorted by value descending */
export const buildCategoryBreakdown = (transactions, limit = 6) => {
  const map = {};
  transactions
    .filter((tx) => tx.type === "expense")
    .forEach((tx) => { map[tx.cat] = (map[tx.cat] || 0) + tx.amount; });

  return Object.entries(map)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([name, value]) => ({
      name,
      value,
      color: getCategoryMeta(name).color,
      icon:  getCategoryMeta(name).icon,
    }));
};

/** Filter and sort a transaction list */
export const filterAndSort = (transactions, { search, filterType, filterCat, sortBy }) => {
  let list = [...transactions];

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(
      (tx) =>
        tx.desc.toLowerCase().includes(q) ||
        tx.cat.toLowerCase().includes(q)
    );
  }

  if (filterType !== "all") list = list.filter((tx) => tx.type === filterType);
  if (filterCat  !== "all") list = list.filter((tx) => tx.cat  === filterCat);

  const [key, dir] = sortBy.split("-");
  list.sort((a, b) => {
    const v = key === "date"
      ? new Date(a.date) - new Date(b.date)
      : a.amount - b.amount;
    return dir === "desc" ? -v : v;
  });

  return list;
};