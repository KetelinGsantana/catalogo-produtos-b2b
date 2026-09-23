"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react"

interface SortableHeaderProps {
  children: React.ReactNode
  sortKey: string
  currentSort: { key: string; direction: "asc" | "desc" } | null
  onSort: (key: string) => void
  theme: "black" | "white"
}

export function SortableHeader({ children, sortKey, currentSort, onSort, theme }: SortableHeaderProps) {
  const isWhite = theme === "white"

  const getSortIcon = () => {
    if (currentSort?.key !== sortKey) {
      return <ChevronsUpDown className={`w-4 h-4 ml-1 ${isWhite ? "text-slate-500" : "text-slate-400"}`} />
    }
    return currentSort.direction === "asc" ? (
      <ChevronUp className="w-4 h-4 ml-1 text-blue-500" />
    ) : (
      <ChevronDown className="w-4 h-4 ml-1 text-blue-500" />
    )
  }

  const buttonClass = isWhite
    ? "h-auto p-0 font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 justify-start"
    : "h-auto p-0 font-semibold text-slate-200 hover:text-white hover:bg-slate-600/50 justify-start"

  return (
    <Button variant="ghost" onClick={() => onSort(sortKey)} className={buttonClass}>
      {children}
      {getSortIcon()}
    </Button>
  )
}
