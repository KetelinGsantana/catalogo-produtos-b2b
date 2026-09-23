"use client"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

interface ThemeToggleProps {
  theme: "black" | "white"
  onThemeChange: (theme: "black" | "white") => void
}

export function ThemeToggle({ theme, onThemeChange }: ThemeToggleProps) {
  const isWhite = theme === "white"

  return (
    <div className="flex items-center gap-2 mb-6">
      <span className={`text-sm font-medium ${isWhite ? "text-slate-600" : "text-slate-400"}`}>Tema:</span>
      <div
        className={`flex rounded-lg p-1 border ${
          isWhite ? "bg-slate-100 border-slate-300" : "bg-slate-800/50 border-slate-600"
        }`}
      >
        <Button
          variant={theme === "black" ? "default" : "ghost"}
          size="sm"
          onClick={() => onThemeChange("black")}
          className={`flex items-center gap-2 ${
            theme === "black"
              ? "bg-slate-700 text-white"
              : isWhite
                ? "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                : "text-slate-400 hover:text-white hover:bg-slate-700/50"
          }`}
        >
          <Moon className="w-4 h-4" />
          Black
        </Button>
        <Button
          variant={theme === "white" ? "default" : "ghost"}
          size="sm"
          onClick={() => onThemeChange("white")}
          className={`flex items-center gap-2 ${
            theme === "white"
              ? "bg-white text-slate-900 shadow-sm"
              : isWhite
                ? "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                : "text-slate-400 hover:text-white hover:bg-slate-700/50"
          }`}
        >
          <Sun className="w-4 h-4" />
          White
        </Button>
      </div>
    </div>
  )
}
