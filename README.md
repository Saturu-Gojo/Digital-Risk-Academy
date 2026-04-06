# FinTrack — Personal Finance Dashboard

A clean, full-featured personal finance dashboard built with **React**, **Tailwind CSS v4**, and **Vite**. Track income and expenses, visualize spending trends, gain insights, and manage transactions — all with role-based access control and dark mode support.

---

## ✨ Features

- **Dashboard Overview** — Summary cards for balance, income, expenses, and transaction count with month-over-month comparisons
- **Income vs Expense Trend** — Grouped bar chart with a net savings line across 3 months
- **Spending Breakdown** — Interactive donut chart with hover-to-highlight by category
- **Transactions** — Full list with search, filter by type/category, and sort by date or amount
- **Role-Based UI** — Admin can add, edit, and delete transactions; Viewer gets read-only access
- **Insights** — Smart cards for savings rate, top category, daily average spend, month-over-month change, and more
- **Dark / Light Mode** — Toggle with instant transition, persisted via CSS custom properties
- **Animations** — Staggered fade-up on load, slide-in rows, animated bar charts

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/Saturu-Gojo/Digital-Risk-Academy.git
cd Digital-Risk-Academy

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.


## 🗂️ Project Structure

```
src/
├── App.jsx                          # Root — composes providers + AppShell
├── index.css                        # Tailwind directives, CSS tokens, keyframes
│
├── constants/
│   ├── theme.js                     # NAV_ITEMS
│   └── data.js                      # CATEGORIES, SEED_TRANSACTIONS, filter options
│
├── utils/
│   └── helpers.js                   # Pure functions: formatCompact, sumByType,
│                                    # buildCategoryBreakdown, filterAndSort, etc.
│
├── context/
│   ├── ThemeContext.jsx             # Dark/light toggle — sets .dark on <html>
│   ├── TransactionsContext.jsx      # CRUD state for all transactions
│   └── RoleContext.jsx              # Role state (admin | viewer) + ROLES enum
│
├── hooks/
│   ├── useDashboardMetrics.js       # Memoized derived metrics for Dashboard & Insights
│   └── useTransactionFilters.js     # Filter/sort state + filtered transaction list
│
├── components/
│   ├── ui/                          # Generic, reusable, zero business logic
│   │   ├── GlobalStyles.jsx         # No-op (styles live in index.css)
│   │   ├── Modal.jsx
│   │   ├── SummaryCard.jsx
│   │   ├── InsightCard.jsx
│   │   ├── RoleBadge.jsx
│   │   └── EmptyState.jsx
│   │
│   ├── layout/                      # App chrome
│   │   ├── Navbar.jsx
│   │   ├── PageHeader.jsx
│   │   └── ViewerBanner.jsx
│   │
│   ├── charts/                      # SVG data visualizations
│   │   ├── BalanceTrendChart.jsx    # Grouped bar + net trend line
│   │   ├── DonutChart.jsx           # Interactive donut with legend
│   │   └── CategoryBreakdownChart.jsx
│   │
│   └── transactions/                # Transaction-domain components
│       ├── TransactionForm.jsx      # Add / edit form
│       ├── TransactionList.jsx      # Table with headers
│       ├── TransactionRow.jsx       # Single row with hover actions
│       └── TransactionFilters.jsx   # Search, type, category, sort
│
└── pages/
    ├── DashboardPage.jsx
    ├── TransactionsPage.jsx
    └── InsightsPage.jsx
```

---

## 🎨 Styling Architecture

This project uses **Tailwind CSS v4** with **CSS custom properties** for theming.

### How it works

| Layer | Tool | Purpose |
|---|---|---|
| Design tokens | CSS custom properties in `index.css` | Colors, shadows — swapped per theme |
| Dark mode | `ThemeContext` adds `.dark` class to `<html>` | Tailwind `darkMode: "class"` |
| Layout & spacing | Tailwind utility classes | `flex`, `grid`, `gap`, `p-`, `m-`, etc. |
| Component patterns | `@layer components` in `index.css` | `.card`, `.input`, `.btn-primary`, `.nav-btn`, etc. |
| Animations | Custom `@keyframes` + utility classes | `.animate-fade-up`, `.animate-slide-in`, `.delay-1–5` |
| Dynamic colors | `style={{ color: "var(--color-accent)" }}` | Only where a value is computed at runtime |

### Custom CSS token reference

```css
--color-bg            /* page background          */
--color-surface        /* card / header background  */
--color-surface-alt    /* inputs, hover states      */
--color-border         /* default border            */
--color-text           /* primary text              */
--color-text-sub       /* secondary text            */
--color-text-muted     /* placeholder / hint text   */
--color-accent         /* primary action color      */
--color-accent-sub     /* accent tint background    */
--color-green          /* income / positive         */
--color-blue           /* info / neutral action     */
--color-amber          /* warning / highlight       */
```

---

## 🔐 Role-Based UI

Switch roles using the dropdown in the top navigation bar.

| Feature | Admin | Viewer |
|---|---|---|
| View dashboard | ✅ | ✅ |
| View transactions | ✅ | ✅ |
| View insights | ✅ | ✅ |
| Add transaction | ✅ | ❌ |
| Edit transaction | ✅ | ❌ |
| Delete transaction | ✅ | ❌ |
| Viewer banner shown | ❌ | ✅ |

> **Note:** This is frontend-only role simulation for demonstration. No backend authentication is implemented.

---

## 📦 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI framework |
| Vite | 6 | Build tool & dev server |
| Tailwind CSS | 4 | Utility-first styling |
| @tailwindcss/vite | 4 | Tailwind Vite plugin |

No external chart libraries — all visualizations are hand-built SVG.

---

## 🧩 State Management

All state is managed with React built-ins — no external library needed.

| State | Location | How |
|---|---|---|
| Dark / light theme | `ThemeContext` | `useState` + `useEffect` on `<html>` |
| Transactions (CRUD) | `TransactionsContext` | `useState` + `useCallback` |
| Role | `RoleContext` | `useState` |
| Dashboard metrics | `useDashboardMetrics` | `useMemo` derived from transactions |
| Filter / sort | `useTransactionFilters` | `useState` + `useMemo` |
| Modal open/close | Local component state | `useState` |

---

## 📁 Key Files to Know

| File | What to change here |
|---|---|
| `src/constants/data.js` | Seed transactions, categories, filter options |
| `src/index.css` | Theme colors, animations, component classes |
| `tailwind.config.js` | Extend Tailwind with custom tokens |
| `src/context/TransactionsContext.jsx` | Add persistence (localStorage, API) |
| `src/hooks/useDashboardMetrics.js` | Add new derived metrics |

---

## 📄 License

MIT — free to use, modify, and distribute.
