
"use client";

import { Moon, Sun, Bell, Search } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight transition-colors duration-300">
        Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 border border-gray-200 dark:border-zinc-800 rounded-full px-5 py-2.5 w-80 bg-white dark:bg-zinc-900 shadow-sm focus-within:ring-2 focus-within:ring-orange-500/50 transition-all duration-300">
          <Search size={18} className="text-gray-400" />
          <input
            type="search"
            placeholder="Search orders, items..."
            className="outline-none w-full text-sm text-gray-700 dark:text-zinc-300 bg-transparent"
          />
        </div>

        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-600 dark:text-zinc-300 transition-all shadow-sm cursor-pointer"
          aria-label="Toggle Theme"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <button className="p-2.5 rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-600 dark:text-zinc-300 transition-colors shadow-sm relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>
      </div>
    </div>
  );
}