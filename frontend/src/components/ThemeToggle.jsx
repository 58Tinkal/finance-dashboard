import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      className={`relative inline-flex items-center w-14 h-7 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
        isDark ? "bg-gray-700" : "bg-gray-200"
      }`}
      onClick={toggleTheme}
      aria-label="Toggle light/dark mode"
    >
      <span
        className={`inline-block w-5 h-5 transform transition-transform bg-white rounded-full shadow ${
          isDark ? "translate-x-8" : "translate-x-1"
        }`}
      />
      <span className="absolute left-1 text-xs">{isDark ? "🌙" : "☀️"}</span>
      <span className="absolute right-1 text-xs">{isDark ? "☀️" : "🌙"}</span>
    </button>
  );
}
