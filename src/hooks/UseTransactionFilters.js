import { useState, useMemo } from "react";
import { useTransactions } from "../context/TransactionsContext";
import { filterAndSort } from "../utils/helpers";

/**
 * Encapsulates all filter/sort state and returns the filtered transaction list.
 * Used by the Transactions page.
 */
export function useTransactionFilters() {
  const { transactions } = useTransactions();

  const [search,     setSearch]     = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCat,  setFilterCat]  = useState("all");
  const [sortBy,     setSortBy]     = useState("date-desc");

  const filtered = useMemo(
    () => filterAndSort(transactions, { search, filterType, filterCat, sortBy }),
    [transactions, search, filterType, filterCat, sortBy]
  );

  const resetFilters = () => {
    setSearch("");
    setFilterType("all");
    setFilterCat("all");
    setSortBy("date-desc");
  };

  return {
    filtered,
    search,     setSearch,
    filterType, setFilterType,
    filterCat,  setFilterCat,
    sortBy,     setSortBy,
    resetFilters,
  };
}