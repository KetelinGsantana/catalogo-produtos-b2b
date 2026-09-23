"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"

interface FiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  categoryFilter: string
  setCategoryFilter: (category: string) => void
  statusFilter: string
  setStatusFilter: (status: string) => void
  categories: string[]
  theme: "black" | "white"
}

export function Filters({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  categories,
  theme,
}: FiltersProps) {
  const clearFilters = () => {
    setSearchTerm("")
    setCategoryFilter("all")
    setStatusFilter("all")
  }

  const isWhite = theme === "white"
  const inputClass = isWhite
    ? "bg-white border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-blue-500"
    : "bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"

  const selectTriggerClass = isWhite
    ? "bg-white border-slate-300 text-slate-900"
    : "bg-slate-700/50 border-slate-600 text-white"

  const selectContentClass = isWhite ? "bg-white border-slate-300" : "bg-slate-800 border-slate-600"

  const selectItemClass = isWhite ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-slate-700"

  const buttonClass = isWhite
    ? "bg-white border-slate-300 text-slate-900 hover:bg-slate-100"
    : "bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600"

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              isWhite ? "text-slate-500" : "text-slate-400"
            }`}
          />
          <Input
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 ${inputClass}`}
          />
        </div>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className={`w-[200px] ${selectTriggerClass}`}>
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent className={selectContentClass}>
            <SelectItem value="all" className={selectItemClass}>
              Todas as categorias
            </SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category} className={selectItemClass}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className={`w-[150px] ${selectTriggerClass}`}>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className={selectContentClass}>
            <SelectItem value="all" className={selectItemClass}>
              Todos
            </SelectItem>
            <SelectItem value="DISPONÍVEL" className={selectItemClass}>
              Disponível
            </SelectItem>
            <SelectItem value="ESGOTADO" className={selectItemClass}>
              Esgotado
            </SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={clearFilters} className={buttonClass}>
          <X className="w-4 h-4 mr-2" />
          Limpar
        </Button>
      </div>
    </div>
  )
}
