import { useState } from "react";

import { ThemeProvider }       from "./context/ThemeContext";
import { TransactionsProvider } from "./context/TransactionsContext";
import { RoleProvider }        from "./context/RoleContext";
import { useTheme }            from "./context/ThemeContext";

import GlobalStyles   from "./components/ui/GlobalStyles";
import Navbar         from "./components/layout/Navbar";
import ViewerBanner   from "./components/layout/ViewerBanner";

import DashboardPage     from "./pages/DashboardPage";
import TransactionsPage  from "./pages/TransactionsPage";
import InsightsPage      from "./pages/InsightsPage";

// ─── Inner shell (needs theme context) ───────────────────────────────────────
function AppShell() {
  const { theme: t } = useTheme();
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: t.bg,
        color: t.text,
        fontFamily: "'Geist', sans-serif",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <GlobalStyles />

      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <ViewerBanner />

      <main
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "28px 24px 60px",
        }}
      >
        {activeTab === "dashboard" && (
          <DashboardPage onNavigateToTransactions={() => setActiveTab("transactions")} />
        )}
        {activeTab === "transactions" && <TransactionsPage />}
        {activeTab === "insights"     && <InsightsPage />}
      </main>
    </div>
  );
}

// ─── Root (providers wrapping everything) ────────────────────────────────────
export default function App() {
  return (
    <ThemeProvider>
      <RoleProvider>
        <TransactionsProvider>
          <AppShell />
        </TransactionsProvider>
      </RoleProvider>
    </ThemeProvider>
  );
}