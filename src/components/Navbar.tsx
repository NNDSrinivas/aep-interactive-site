"use client";

import { motion } from "framer-motion";
import { useThemeCtx } from "./ThemeProvider";

export default function Navbar() {
  const { theme, toggle } = useThemeCtx();

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border-card bg-card/70 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <div
            className="h-6 w-6 rounded-full"
            style={{
              background: "linear-gradient(135deg,#00FFD1,#3A0CA3)",
            }}
          />
          <span className="font-[var(--font-grotesk)] font-semibold">AEP</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <a href="#agents" className="rounded-lg px-3 py-1 hover:bg-white/10">
            Agents
          </a>
          <a href="#graph" className="rounded-lg px-3 py-1 hover:bg-white/10">
            Memory
          </a>
          <a href="#feed" className="rounded-lg px-3 py-1 hover:bg-white/10">
            Live
          </a>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggle}
            className="ml-2 rounded-xl2 border px-3 py-1 hover:bg-white/5"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </motion.button>
        </div>
      </div>
    </nav>
  );
}
