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
import { BRAND, getCategoryEmoji, getTagStyle } from "@/lib/brand"
import { formatCurrency, formatDate } from "@/lib/format"

type SortKey = keyof Pick<
  Product,
  | "name"
  | "category"
  | "size"
  | "wholesalePrice"
  | "retailPrice"
  | "markup"
  | "expirationDate"
  | "monthsToExpiry"
  | "ean"
  | "ncm"
  | "status"
>

export function ProductCatalog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: "asc" | "desc" } | null>(null)
  const [showOptionalColumns, setShowOptionalColumns] = useState(false)
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)))
  }, [])

  const filteredAndSortedProducts = useMemo(() => {
    const term = searchTerm.toLowerCase()
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(term) || product.category.toLowerCase().includes(term)
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
      const matchesStatus = statusFilter === "all" || product.status === statusFilter

      return matchesSearch && matchesCategory && matchesStatus
    })

    if (sortConfig) {
      const { key, direction } = sortConfig
      filtered.sort((a, b) => {
        const aValue = a[key]
        const bValue = b[key]
        const order =
          typeof aValue === "number" && typeof bValue === "number"
            ? aValue - bValue
            : String(aValue).localeCompare(String(bValue), "en", { numeric: true })
        return direction === "asc" ? order : -order
      })
    }

    return filtered
  }, [searchTerm, categoryFilter, statusFilter, sortConfig])

  const orderItems = useMemo(() => {
    return products
      .filter((product) => (quantities[product.name] || 0) > 0)
      .map((product) => {
        const quantity = quantities[product.name]
        return { product, quantity, total: quantity * product.wholesalePrice }
      })
  }, [quantities])

  const orderSummary = useMemo(() => {
    return orderItems.reduce(
      (summary, item) => ({
        totalQuantity: summary.totalQuantity + item.quantity,
        totalValue: summary.totalValue + item.total,
      }),
      { totalQuantity: 0, totalValue: 0 },
    )
  }, [orderItems])

  const handleQuantityChange = (productName: string, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productName]: Math.max(0, quantity),
    }))
  }

  const exportToCSV = () => {
    if (orderItems.length === 0) {
      alert("Add products to the order before exporting")
      return
    }

    const csvContent = [
      "Product,Quantity,Wholesale Price,Total",
      ...orderItems.map(
        (item) =>
          `"${item.product.name}",${item.quantity},"${formatCurrency(item.product.wholesalePrice)}","${formatCurrency(item.total)}"`,
      ),
      `,,Grand Total:,"${formatCurrency(orderSummary.totalValue)}"`,
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `aurora_order_${new Date().toISOString().split("T")[0]}.csv`
    link.click()
  }

  const exportToPDF = () => {
    if (orderItems.length === 0) {
      alert("Add products to the order before exporting")
      return
    }

    const printWindow = window.open("", "_blank")
    if (!printWindow) return
    const content = `
      <html>
        <head>
          <title>${BRAND.name} Order</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .total { font-weight: bold; background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <h1>${BRAND.name} Order</h1>
          <p>Date: ${new Date().toLocaleDateString("en-US")}</p>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Wholesale Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${orderItems
                .map(
                  (item) => `
                <tr>
                  <td>${item.product.name}</td>
                  <td>${item.quantity}</td>
                  <td>${formatCurrency(item.product.wholesalePrice)}</td>
                  <td>${formatCurrency(item.total)}</td>
                </tr>
              `,
                )
                .join("")}
              <tr class="total">
                <td colspan="2">Grand Total</td>
                <td>${orderSummary.totalQuantity} items</td>
                <td>${formatCurrency(orderSummary.totalValue)}</td>
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
    const sortKey = key as SortKey
    setSortConfig((current) => {
      if (current?.key === sortKey) {
        return { key: sortKey, direction: current.direction === "asc" ? "desc" : "asc" }
      }
      return { key: sortKey, direction: "asc" }
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
            <h1 className={`text-2xl md:text-4xl font-bold ${textClass}`}>Wholesale Price List</h1>
          </div>
          <p className={`${subtitleClass} text-base md:text-lg`}>Build your order and export it to complete your purchase</p>
        </div>

        {orderSummary.totalQuantity > 0 && (
          <Card className="mb-6 bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                  <h3 className={`text-lg font-bold ${textClass}`}>Order Summary</h3>
                  <p className={subtitleClass}>
                    {orderSummary.totalQuantity} items • Total: {formatCurrency(orderSummary.totalValue)}
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
            {showOptionalColumns ? "Hide" : "Show"} Details (Expiration, EAN, NCM)
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
            {filteredAndSortedProducts.map((product) => (
              <MobileProductCard
                key={product.ean}
                product={product}
                theme="white"
                quantity={quantities[product.name] || 0}
                onQuantityChange={(quantity) => handleQuantityChange(product.name, quantity)}
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
                        <SortableHeader sortKey="name" currentSort={sortConfig} onSort={handleSort} theme="white">
                          Product
                        </SortableHeader>
                      </TableHead>
                      <TableHead>
                        <SortableHeader sortKey="category" currentSort={sortConfig} onSort={handleSort} theme="white">
                          Category
                        </SortableHeader>
                      </TableHead>
                      <TableHead>
                        <SortableHeader sortKey="size" currentSort={sortConfig} onSort={handleSort} theme="white">
                          Size
                        </SortableHeader>
                      </TableHead>
                      <TableHead>
                        <SortableHeader
                          sortKey="wholesalePrice"
                          currentSort={sortConfig}
                          onSort={handleSort}
                          theme="white"
                        >
                          Wholesale Price
                        </SortableHeader>
                      </TableHead>
                      <TableHead className={textClass}>Quantity</TableHead>
                      <TableHead>
                        <SortableHeader sortKey="retailPrice" currentSort={sortConfig} onSort={handleSort} theme="white">
                          Retail Price
                        </SortableHeader>
                      </TableHead>
                      <TableHead>
                        <SortableHeader sortKey="markup" currentSort={sortConfig} onSort={handleSort} theme="white">
                          Markup
                        </SortableHeader>
                      </TableHead>
                      {showOptionalColumns && (
                        <>
                          <TableHead>
                            <SortableHeader
                              sortKey="expirationDate"
                              currentSort={sortConfig}
                              onSort={handleSort}
                              theme="white"
                            >
                              Expiration
                            </SortableHeader>
                          </TableHead>
                          <TableHead>
                            <SortableHeader
                              sortKey="monthsToExpiry"
                              currentSort={sortConfig}
                              onSort={handleSort}
                              theme="white"
                            >
                              Months Left
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
                    {filteredAndSortedProducts.map((product) => {
                      const quantity = quantities[product.name] || 0
                      const total = quantity * product.wholesalePrice

                      return (
                        <TableRow
                          key={product.ean}
                          className="border-slate-200 hover:bg-slate-50 transition-all duration-200 hover:shadow-lg"
                        >
                          <TableCell className={`font-medium ${textClass} py-4`}>
                            <div className="flex items-center gap-3">
                              {product.image ? (
                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-white flex-shrink-0">
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded flex items-center justify-center text-white text-xs font-bold">
                                  {getCategoryEmoji(product.category)}
                                </div>
                              )}
                              <div className="flex flex-col">
                                <span>{product.name}</span>
                                {product.tag && (
                                  <Badge
                                    className={`w-fit mt-1 text-[10px] font-semibold tracking-wide px-2 py-0.5 ${getTagStyle(product.tag)}`}
                                  >
                                    {product.tag}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-slate-700">{product.category}</TableCell>
                          <TableCell className="text-slate-700">{product.size}</TableCell>
                          <TableCell className="font-semibold">
                            {product.originalWholesalePrice ? (
                              <div className="flex flex-col">
                                <span className="text-slate-400 line-through text-sm">
                                  {formatCurrency(product.originalWholesalePrice)}
                                </span>
                                <span className="text-green-600">{formatCurrency(product.wholesalePrice)}</span>
                              </div>
                            ) : (
                              <span className="text-green-600">{formatCurrency(product.wholesalePrice)}</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {product.status === "OUT OF STOCK" ? (
                              <span className="text-slate-400 text-sm">-</span>
                            ) : (
                              <Input
                                type="number"
                                min="0"
                                value={quantity}
                                onChange={(e) =>
                                  handleQuantityChange(product.name, Number.parseInt(e.target.value) || 0)
                                }
                                className="w-20 text-center border-orange-400 focus:border-orange-500 focus:ring-orange-500"
                                placeholder="0"
                                aria-label={`Quantity of ${product.name}`}
                              />
                            )}
                          </TableCell>
                          <TableCell className="text-blue-600 font-semibold">
                            {formatCurrency(product.retailPrice)}
                          </TableCell>
                          <TableCell className="text-yellow-600 font-semibold">{product.markup.toFixed(2)}x</TableCell>
                          {showOptionalColumns && (
                            <>
                              <TableCell className="text-slate-700">{formatDate(product.expirationDate)}</TableCell>
                              <TableCell className="text-slate-700">{product.monthsToExpiry} mo</TableCell>
                              <TableCell className="font-mono text-xs text-slate-600">{product.ean}</TableCell>
                              <TableCell className="font-mono text-xs text-slate-600">{product.ncm}</TableCell>
                            </>
                          )}
                          <TableCell>
                            <Badge
                              variant={product.status === "AVAILABLE" ? "default" : "destructive"}
                              className={
                                product.status === "AVAILABLE"
                                  ? "bg-green-500/20 text-green-600 border-green-500/30 hover:bg-green-500/30"
                                  : "bg-red-500/20 text-red-600 border-red-500/30 hover:bg-red-500/30"
                              }
                            >
                              {product.status}
                            </Badge>
                          </TableCell>
                          <TableCell className={`font-semibold ${quantity > 0 ? "text-green-600" : "text-slate-400"}`}>
                            {quantity > 0 ? formatCurrency(total) : "-"}
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
            Showing {filteredAndSortedProducts.length} of {products.length} products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
          <Card className="bg-white/80 border-slate-200 shadow-sm hover:bg-slate-50 transition-all duration-200">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-xl md:text-2xl">💰</span>
              </div>
              <h3 className={`text-lg md:text-xl font-bold ${textClass} mb-2`}>Healthy Markup</h3>
            </CardContent>
          </Card>

          <Card className="bg-white/80 border-slate-200 shadow-sm hover:bg-slate-50 transition-all duration-200">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-xl md:text-2xl">🚀</span>
              </div>
              <h3 className={`text-lg md:text-xl font-bold ${textClass} mb-2`}>Fast Turnover</h3>
            </CardContent>
          </Card>

          <Card className="bg-white/80 border-slate-200 shadow-sm hover:bg-slate-50 transition-all duration-200">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-xl md:text-2xl">💪</span>
              </div>
              <h3 className={`text-lg md:text-xl font-bold ${textClass} mb-2`}>High Average Ticket</h3>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
