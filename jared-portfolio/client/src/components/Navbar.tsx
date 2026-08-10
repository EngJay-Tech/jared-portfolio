import { useState } from "react";
import { Sun, Moon, Menu, X, Download } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function scrollTo(href: string) {
  if (href.startsWith("#")) {
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
  } else {
    window.location.href = href;
  }
}

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => scrollTo(href), menuOpen ? 200 : 0);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-cyan-500/30 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
      <div className="container flex items-center justify-between py-4">

        {/* Logo */}
        <a href="/" aria-label="Jared Otieno — home" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-cyan-500/50">
            <img src="/profile.png" alt="Jared Otieno" className="w-full h-full object-cover object-top" />
          </div>
          <span className="text-xl font-bold" style={{ background: "linear-gradient(90deg,#06b6d4,#10b981,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Jared Otieno
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden gap-6 md:flex items-center">
          {NAV_LINKS.map(({ label, href }) => (
            <button key={label} onClick={() => handleNavClick(href)}
              className="text-sm hover:text-cyan-400 transition-colors bg-transparent border-0 text-slate-300">
              {label}
            </button>
          ))}

          <a href="/Jared-Otieno-CV.pdf" download
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 hover:from-cyan-600 hover:to-emerald-600 transition-all">
            <Download className="h-3.5 w-3.5" /> Download CV
          </a>

          <button onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 rounded-lg hover:bg-slate-800 transition-colors">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-lg hover:bg-slate-800 transition-colors">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button onClick={() => setMenuOpen((v) => !v)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}
            className="p-2 rounded-lg hover:bg-slate-800 transition-colors">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-72 border-t border-slate-800" : "max-h-0"}`} aria-hidden={!menuOpen}>
        <div className="container py-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <button key={label} onClick={() => handleNavClick(href)}
              className="text-left text-sm py-3 px-2 rounded-lg hover:bg-slate-800 hover:text-cyan-400 transition-colors bg-transparent border-0 text-slate-100">
              {label}
            </button>
          ))}
          <a href="/Jared-Otieno-CV.pdf" download
            className="inline-flex items-center gap-2 mt-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 hover:from-cyan-600 hover:to-emerald-600 transition-all w-fit">
            <Download className="h-3.5 w-3.5" /> Download CV
          </a>
        </div>
      </div>
    </nav>
  );
}
