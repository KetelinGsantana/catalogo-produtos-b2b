"use client"

import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { products, type Product } from "@/data/products"
import { Filters } from "@/components/filters"
import { SortableHeader } from "@/components/sortable-header"
import { MobileProductCard } from "@/components/mobile-product-card"
import { ChevronRight, ChevronDown, Download, FileText } from "lucide-react"
import Image from "next/image"
import { BRAND, getCategoryEmoji } from "@/lib/brand"

export function ProductCatalog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null)
  const [showOptionalColumns, setShowOptionalColumns] = useState(false)
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.categoria)))
  }, [])

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.produto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.categoria.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || product.categoria === categoryFilter
      const matchesStatus = statusFilter === "all" || product.status === statusFilter

      return matchesSearch && matchesCategory && matchesStatus
    })

    if (sortConfig) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof Product]
        const bValue = b[sortConfig.key as keyof Product]

        if (sortConfig.key.includes("preco") || sortConfig.key === "mkp") {
          const aNum = Number.parseFloat(
            aValue
              .replace(/[R$\s]/g, "")
              .replace(",", ".")
              .replace("-", "0"),
          )
          const bNum = Number.parseFloat(
            bValue
              .replace(/[R$\s]/g, "")
              .replace(",", ".")
              .replace("-", "0"),
          )
          return sortConfig.direction === "asc" ? aNum - bNum : bNum - aNum
        }

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [searchTerm, categoryFilter, statusFilter, sortConfig])

  const orderSummary = useMemo(() => {
    let totalQuantity = 0
    let totalValue = 0

    Object.entries(quantities).forEach(([productName, quantity]) => {
      if (quantity > 0) {
        const product = products.find((p) => p.produto === productName)
        if (product) {
          totalQuantity += quantity
          const price = Number.parseFloat(product.precoAtacado.replace(/[R$\s]/g, "").replace(",", "."))
          totalValue += quantity * price
        }
      }
    })

    return { totalQuantity, totalValue }
  }, [quantities])

  const handleQuantityChange = (productName: string, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productName]: Math.max(0, quantity),
    }))
  }

  const exportToCSV = () => {
    const orderItems = Object.entries(quantities)
      .filter(([_, quantity]) => quantity > 0)
      .map(([productName, quantity]) => {
        const product = products.find((p) => p.produto === productName)
        if (!product) return null
        const price = Number.parseFloat(product.precoAtacado.replace(/[R$\s]/g, "").replace(",", "."))
        return {
          produto: product.produto,
          quantidade: quantity,
          precoAtacado: product.precoAtacado,
          total: (quantity * price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
        }
      })
      .filter(Boolean)

    if (orderItems.length === 0) {
      alert("Adicione produtos ao pedido antes de exportar")
      return
    }

    const csvContent = [
      "Produto,Quantidade,Preço Atacado,Total",
      ...orderItems.map((item) => `"${item.produto}",${item.quantidade},"${item.precoAtacado}","${item.total}"`),
      `,,Total Geral:,"${orderSummary.totalValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}"`,
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `pedido_aurora_${new Date().toISOString().split("T")[0]}.csv`
    link.click()
  }

  const exportToPDF = () => {
    const orderItems = Object.entries(quantities)
      .filter(([_, quantity]) => quantity > 0)
      .map(([productName, quantity]) => {
        const product = products.find((p) => p.produto === productName)
        if (!product) return null
        const price = Number.parseFloat(product.precoAtacado.replace(/[R$\s]/g, "").replace(",", "."))
        return { product, quantity, price, total: quantity * price }
      })
      .filter(Boolean)

    if (orderItems.length === 0) {
      alert("Adicione produtos ao pedido antes de exportar")
      return
    }

    const printWindow = window.open("", "_blank")
    const content = `
      <html>
        <head>
          <title>Pedido ${BRAND.name}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .total { font-weight: bold; background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <h1>Pedido ${BRAND.name}</h1>
          <p>Data: ${new Date().toLocaleDateString("pt-BR")}</p>
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço Atacado</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${orderItems
        .map(
          (item) => `
                <tr>
                  <td>${item.product.produto}</td>
                  <td>${item.quantity}</td>
                  <td>${item.product.precoAtacado}</td>
                  <td>${item.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                </tr>
              `,
        )
        .join("")}
              <tr class="total">
                <td colspan="2">Total Geral</td>
                <td>${orderSummary.totalQuantity} itens</td>
                <td>${orderSummary.totalValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
    `
    printWindow.document.write(content)
    printWindow.document.close()
    printWindow.print()
  }

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        return { key, direction: current.direction === "asc" ? "desc" : "asc" }
      }
      return { key, direction: "asc" }
    })
  }

  const bgClass = "bg-gradient-to-br from-slate-50 via-white to-slate-100"
  const textClass = "text-slate-900"
  const subtitleClass = "text-slate-600"

  return (
    <section className={`py-8 md:py-16 ${bgClass} min-h-screen`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Image src={BRAND.logo} alt={`${BRAND.name} Logo`} width={80} height={40} className="h-10 w-auto" />
            <h1 className={`text-2xl md:text-4xl font-bold ${textClass}`}>Tabela Comercial - Lojistas</h1>
          </div>
          <p className={`${subtitleClass} text-base md:text-lg`}>Monte seu pedido e exporte para finalizar a compra</p>
        </div>

        {orderSummary.totalQuantity > 0 && (
          <Card className="mb-6 bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                  <h3 className={`text-lg font-bold ${textClass}`}>Resumo do Pedido</h3>
                  <p className={subtitleClass}>
                    {orderSummary.totalQuantity} itens • Total:{" "}
                    {orderSummary.totalValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={exportToCSV}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <Download className="w-4 h-4" />
                    CSV
                  </Button>
                  <Button
                    onClick={exportToPDF}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <FileText className="w-4 h-4" />
                    PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-end mb-6">
          <Button
            variant="outline"
            onClick={() => setShowOptionalColumns(!showOptionalColumns)}
            className="border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center gap-2"
          >
            {showOptionalColumns ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            {showOptionalColumns ? "Ocultar" : "Mostrar"} Detalhes (Validade, EAN, NCM)
          </Button>
        </div>

        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          categories={categories}
          theme="white"
        />

        <div className="block md:hidden">
          <div className="space-y-4">
            {filteredAndSortedProducts.map((product, index) => (
              <MobileProductCard
                key={index}
                product={product}
                theme="white"
                quantity={quantities[product.produto] || 0}
                onQuantityChange={(quantity) => handleQuantityChange(product.produto, quantity)}
              />
            ))}
          </div>
        </div>

        <div className="hidden md:block">
          <Card className="bg-white/80 border-slate-200 shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200 hover:bg-slate-50">
                      <TableHead className="py-4">
                        <SortableHeader sortKey="produto" currentSort={sortConfig} onSort={handleSort} theme="white">
                          Produto
                        </SortableHeader>
                      </TableHead>
                      <TableHead>
                        <SortableHeader sortKey="categoria" currentSort={sortConfig} onSort={handleSort} theme="white">
                          Categoria
                        </SortableHeader>
                      </TableHead>
                      <TableHead>
                        <SortableHeader sortKey="peso" currentSort={sortConfig} onSort={handleSort} theme="white">
                          Peso
                        </SortableHeader>
                      </TableHead>
                      <TableHead>
                        <SortableHeader
                          sortKey="precoAtacado"
                          currentSort={sortConfig}
                          onSort={handleSort}
                          theme="white"
                        >
                          Preço Atacado
                        </SortableHeader>
                      </TableHead>
                      <TableHead className={textClass}>Quantidade</TableHead>
                      <TableHead>
                        <SortableHeader
                          sortKey="precoRevenda"
                          currentSort={sortConfig}
                          onSort={handleSort}
                          theme="white"
                        >
                          Preço Revenda
                        </SortableHeader>
                      </TableHead>
                      <TableHead>
                        <SortableHeader sortKey="mkp" currentSort={sortConfig} onSort={handleSort} theme="white">
                          MKP
                        </SortableHeader>
                      </TableHead>
                      {showOptionalColumns && (
                        <>
                          <TableHead>
                            <SortableHeader
                              sortKey="validade"
                              currentSort={sortConfig}
                              onSort={handleSort}
                              theme="white"
                            >
                              Validade
                            </SortableHeader>
                          </TableHead>
                          <TableHead>
                            <SortableHeader sortKey="valMes" currentSort={sortConfig} onSort={handleSort} theme="white">
                              Val. em Mês
                            </SortableHeader>
                          </TableHead>
                          <TableHead>
                            <SortableHeader sortKey="ean" currentSort={sortConfig} onSort={handleSort} theme="white">
                              EAN
                            </SortableHeader>
                          </TableHead>
                          <TableHead>
                            <SortableHeader sortKey="ncm" currentSort={sortConfig} onSort={handleSort} theme="white">
                              NCM
                            </SortableHeader>
                          </TableHead>
                        </>
                      )}
                      <TableHead>
                        <SortableHeader sortKey="status" currentSort={sortConfig} onSort={handleSort} theme="white">
                          Status
                        </SortableHeader>
                      </TableHead>
                      <TableHead className={textClass}>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAndSortedProducts.map((product, index) => {
                      const quantity = quantities[product.produto] || 0
                      const price = Number.parseFloat(product.precoAtacado.replace(/[R$\s]/g, "").replace(",", "."))
                      const total = quantity * price

                      return (
                        <TableRow
                          key={index}
                          className="border-slate-200 hover:bg-slate-50 transition-all duration-200 hover:shadow-lg"
                        >
                          <TableCell className={`font-medium ${textClass} py-4`}>
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                {product.image ? (
                                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-white flex-shrink-0">
                                    <Image
                                      src={product.image || "/placeholder.svg"}
                                      alt={product.produto}
                                      width={48}
                                      height={48}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ) : (
                                  <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded flex items-center justify-center text-white text-xs font-bold">
                                    {getCategoryEmoji(product.categoria)}
                                  </div>
                                )}
                                {product.tag && (
                                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold px-1 rounded">
                                    {product.tag}
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col">
                                <span>{product.produto}</span>
                                {product.tag && (
                                  <Badge className="w-fit mt-1 bg-red-500 text-white text-[10px] px-2 py-0">
                                    {product.tag}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-slate-700">{product.categoria}</TableCell>
                          <TableCell className="text-slate-700">{product.peso}</TableCell>
                          <TableCell className="font-semibold">
                            {product.precoAtacadoOriginal ? (
                              <div className="flex flex-col">
                                <span className="text-slate-400 line-through text-sm">{product.precoAtacadoOriginal}</span>
                                <span className="text-green-600">{product.precoAtacado}</span>
                              </div>
                            ) : (
                              <span className="text-green-600">{product.precoAtacado}</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {product.status === "ESGOTADO" ? (
                              <span className="text-slate-400 text-sm">-</span>
                            ) : (
                              <Input
                                type="number"
                                min="0"
                                value={quantity}
                                onChange={(e) =>
                                  handleQuantityChange(product.produto, Number.parseInt(e.target.value) || 0)
                                }
                                className="w-20 text-center border-orange-400 focus:border-orange-500 focus:ring-orange-500"
                                placeholder="0"
                              />
                            )}
                          </TableCell>
                          <TableCell className="text-blue-600 font-semibold">{product.precoRevenda}</TableCell>
                          <TableCell className="text-yellow-600 font-semibold">{product.mkp}</TableCell>
                          {showOptionalColumns && (
                            <>
                              <TableCell className="text-slate-700">{product.validade}</TableCell>
                              <TableCell className="text-slate-700">{product.valMes}</TableCell>
                              <TableCell className="font-mono text-xs text-slate-600">{product.ean}</TableCell>
                              <TableCell className="font-mono text-xs text-slate-600">{product.ncm}</TableCell>
                            </>
                          )}
                          <TableCell>
                            <Badge
                              variant={product.status === "DISPONÍVEL" ? "default" : "destructive"}
                              className={
                                product.status === "DISPONÍVEL"
                                  ? "bg-green-500/20 text-green-600 border-green-500/30 hover:bg-green-500/30"
                                  : "bg-red-500/20 text-red-600 border-red-500/30 hover:bg-red-500/30"
                              }
                            >
                              {product.status}
                            </Badge>
                          </TableCell>
                          <TableCell className={`font-semibold ${quantity > 0 ? "text-green-600" : "text-slate-400"}`}>
                            {quantity > 0 ? total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : "-"}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 text-center">
          <p className="text-slate-600">
            Mostrando {filteredAndSortedProducts.length} de {products.length} produtos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
          <Card className="bg-white/80 border-slate-200 shadow-sm hover:bg-slate-50 transition-all duration-200">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-xl md:text-2xl">💰</span>
              </div>
              <h3 className={`text-lg md:text-xl font-bold ${textClass} mb-2`}>Maior MKP</h3>
            </CardContent>
          </Card>

          <Card className="bg-white/80 border-slate-200 shadow-sm hover:bg-slate-50 transition-all duration-200">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-xl md:text-2xl">🚀</span>
              </div>
              <h3 className={`text-lg md:text-xl font-bold ${textClass} mb-2`}>Giro Rápido</h3>
            </CardContent>
          </Card>

          <Card className="bg-white/80 border-slate-200 shadow-sm hover:bg-slate-50 transition-all duration-200">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-xl md:text-2xl">💪</span>
              </div>
              <h3 className={`text-lg md:text-xl font-bold ${textClass} mb-2`}>Alto Ticket</h3>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}