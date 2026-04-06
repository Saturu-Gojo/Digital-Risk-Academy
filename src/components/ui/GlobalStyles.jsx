import { useTheme } from "../../context/ThemeContext";

// Inject Google Fonts once
if (!document.getElementById("fintrack-fonts")) {
  const link = document.createElement("link");
  link.id   = "fintrack-fonts";
  link.rel  = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Geist+Mono:wght@300;400;500&family=Geist:wght@300;400;500;600&display=swap";
  document.head.appendChild(link);
}

export default function GlobalStyles() {
  const { theme: t } = useTheme();

  return (
    <style>{`
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      body {
        font-family: 'Geist', sans-serif;
        background: ${t.bg};
        color: ${t.text};
        transition: background 0.3s, color 0.3s;
      }

      ::-webkit-scrollbar { width: 5px; height: 5px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: ${t.border}; border-radius: 3px; }

      input, select, textarea, button { font-family: inherit; }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes slideIn {
        from { opacity: 0; transform: translateX(-12px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes barGrow {
        from { transform: scaleY(0); }
        to   { transform: scaleY(1); }
      }

      .fade-up   { animation: fadeUp 0.45s ease both; }
      .fade-up-1 { animation-delay: 0.05s; }
      .fade-up-2 { animation-delay: 0.10s; }
      .fade-up-3 { animation-delay: 0.15s; }
      .fade-up-4 { animation-delay: 0.20s; }
      .fade-up-5 { animation-delay: 0.25s; }

      .hover-lift { transition: transform 0.2s ease, box-shadow 0.2s ease; }
      .hover-lift:hover { transform: translateY(-2px); }

      .btn-press:active { transform: scale(0.97); }
    `}</style>
  );
}