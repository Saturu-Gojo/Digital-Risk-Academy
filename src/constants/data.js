export const CATEGORIES = [
  { name: "Housing", icon: "🏠", color: "#c84b31" },
  { name: "Food", icon: "🍜", color: "#d4a03a" },
  { name: "Transport", icon: "🚗", color: "#1e5fa8" },
  { name: "Health", icon: "💊", color: "#2a7d5a" },
  { name: "Shopping", icon: "🛍️", color: "#7c4dba" },
  { name: "Entertainment", icon: "🎬", color: "#c45ea0" },
  { name: "Utilities", icon: "⚡", color: "#5a9e6f" },
  { name: "Salary", icon: "💼", color: "#2a7d5a" },
  { name: "Freelance", icon: "💻", color: "#1e5fa8" },
  { name: "Investment", icon: "📈", color: "#d4a03a" },
];

export const SEED_TRANSACTIONS = [
  // April 2025
  { id: 1,  date: "2025-04-01", desc: "Monthly Salary",    cat: "Salary",        type: "income",  amount: 85000 },
  { id: 2,  date: "2025-04-02", desc: "Apartment Rent",    cat: "Housing",       type: "expense", amount: 22000 },
  { id: 3,  date: "2025-04-03", desc: "Swiggy Order",      cat: "Food",          type: "expense", amount: 650   },
  { id: 4,  date: "2025-04-04", desc: "Uber Cab",          cat: "Transport",     type: "expense", amount: 380   },
  { id: 5,  date: "2025-04-05", desc: "Freelance Project", cat: "Freelance",     type: "income",  amount: 18000 },
  { id: 6,  date: "2025-04-06", desc: "Apollo Pharmacy",   cat: "Health",        type: "expense", amount: 1200  },
  { id: 7,  date: "2025-04-07", desc: "Amazon Shopping",   cat: "Shopping",      type: "expense", amount: 4500  },
  { id: 8,  date: "2025-04-08", desc: "Netflix",           cat: "Entertainment", type: "expense", amount: 649   },
  { id: 9,  date: "2025-04-09", desc: "Electricity Bill",  cat: "Utilities",     type: "expense", amount: 2100  },
  { id: 10, date: "2025-04-10", desc: "Zomato Order",      cat: "Food",          type: "expense", amount: 420   },
  { id: 11, date: "2025-04-11", desc: "Mutual Fund SIP",   cat: "Investment",    type: "expense", amount: 10000 },
  { id: 12, date: "2025-04-12", desc: "Grocery Store",     cat: "Food",          type: "expense", amount: 3200  },
  { id: 13, date: "2025-04-13", desc: "Client Payment",    cat: "Freelance",     type: "income",  amount: 25000 },
  { id: 14, date: "2025-04-14", desc: "Petrol Fill",       cat: "Transport",     type: "expense", amount: 1800  },
  { id: 15, date: "2025-04-15", desc: "Gym Membership",    cat: "Health",        type: "expense", amount: 2500  },
  { id: 16, date: "2025-04-16", desc: "Myntra Order",      cat: "Shopping",      type: "expense", amount: 2800  },
  { id: 17, date: "2025-04-17", desc: "Movie Tickets",     cat: "Entertainment", type: "expense", amount: 800   },
  { id: 18, date: "2025-04-18", desc: "Internet Bill",     cat: "Utilities",     type: "expense", amount: 999   },
  { id: 19, date: "2025-04-19", desc: "Dividend Income",   cat: "Investment",    type: "income",  amount: 3400  },
  { id: 20, date: "2025-04-20", desc: "Restaurant Dinner", cat: "Food",          type: "expense", amount: 1850  },
  // March 2025
  { id: 21, date: "2025-03-01", desc: "Monthly Salary",    cat: "Salary",     type: "income",  amount: 85000 },
  { id: 22, date: "2025-03-02", desc: "Apartment Rent",    cat: "Housing",    type: "expense", amount: 22000 },
  { id: 23, date: "2025-03-05", desc: "Freelance Project", cat: "Freelance",  type: "income",  amount: 12000 },
  { id: 24, date: "2025-03-08", desc: "Grocery Store",     cat: "Food",       type: "expense", amount: 2800  },
  { id: 25, date: "2025-03-12", desc: "Amazon Shopping",   cat: "Shopping",   type: "expense", amount: 6200  },
  { id: 26, date: "2025-03-15", desc: "Electricity Bill",  cat: "Utilities",  type: "expense", amount: 1900  },
  { id: 27, date: "2025-03-18", desc: "Uber Cab",          cat: "Transport",  type: "expense", amount: 620   },
  { id: 28, date: "2025-03-22", desc: "Doctor Visit",      cat: "Health",     type: "expense", amount: 800   },
  { id: 29, date: "2025-03-25", desc: "Mutual Fund SIP",   cat: "Investment", type: "expense", amount: 10000 },
  { id: 30, date: "2025-03-28", desc: "Zomato Order",      cat: "Food",       type: "expense", amount: 560   },
  // February 2025
  { id: 31, date: "2025-02-01", desc: "Monthly Salary",  cat: "Salary",     type: "income",  amount: 85000 },
  { id: 32, date: "2025-02-02", desc: "Apartment Rent",  cat: "Housing",    type: "expense", amount: 22000 },
  { id: 33, date: "2025-02-10", desc: "Client Payment",  cat: "Freelance",  type: "income",  amount: 30000 },
  { id: 34, date: "2025-02-14", desc: "Valentine Dinner",cat: "Food",       type: "expense", amount: 3500  },
  { id: 35, date: "2025-02-18", desc: "Shopping Spree",  cat: "Shopping",   type: "expense", amount: 8900  },
  { id: 36, date: "2025-02-22", desc: "Mutual Fund SIP", cat: "Investment", type: "expense", amount: 10000 },
  { id: 37, date: "2025-02-25", desc: "Utilities",       cat: "Utilities",  type: "expense", amount: 3100  },
];

export const SORT_OPTIONS = [
  { value: "date-desc",   label: "Date (Newest)"   },
  { value: "date-asc",    label: "Date (Oldest)"   },
  { value: "amount-desc", label: "Amount (High)"   },
  { value: "amount-asc",  label: "Amount (Low)"    },
];

export const TYPE_OPTIONS = [
  { value: "all",     label: "All Types" },
  { value: "income",  label: "Income"    },
  { value: "expense", label: "Expense"   },
];