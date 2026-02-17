"use client";

import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import Button from "@/components/ui/Button";

interface ThemeToggleProps {
  initialTheme: "light" | "dark";
}

export default function ThemeToggle({ initialTheme }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">(initialTheme);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000; SameSite=Lax`;
    setTheme(newTheme);
  };

  return (
    <Button
      variant="outline"
      size="small"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
}