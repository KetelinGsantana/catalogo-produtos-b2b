"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { Product } from "@/data/products"
import Image from "next/image"
import { getCategoryEmoji, getTagStyle } from "@/lib/brand"
import { formatCurrency, formatDate } from "@/lib/format"

interface MobileProductCardProps {
  product: Product
  theme: "black" | "white"
  quantity: number
  onQuantityChange: (quantity: number) => void
}

export function MobileProductCard({ product, theme, quantity, onQuantityChange }: MobileProductCardProps) {
  const isWhite = theme === "white"

  const total = quantity * product.wholesalePrice

  return (
    <Card
      className={`${
        isWhite ? "bg-white border-slate-200 shadow-sm" : "bg-slate-800/50 border-slate-600 backdrop-blur-sm"
      } hover:shadow-lg transition-all duration-200`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              {product.image ? (
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-white flex-shrink-0">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded flex items-center justify-center text-white text-sm font-bold">
                  {getCategoryEmoji(product.category)}
                </div>
              )}
            </div>
            <div>
              <h3 className={`font-semibold ${isWhite ? "text-slate-900" : "text-white"}`}>{product.name}</h3>
              <p className={`text-sm ${isWhite ? "text-slate-600" : "text-slate-400"}`}>{product.category}</p>
              {product.tag && (
                <Badge className={`mt-1 text-[10px] font-semibold tracking-wide px-2 py-0.5 ${getTagStyle(product.tag)}`}>
                  {product.tag}
                </Badge>
              )}
            </div>
          </div>
          <Badge
            variant={product.status === "AVAILABLE" ? "default" : "destructive"}
            className={
              product.status === "AVAILABLE"
                ? "bg-green-500/20 text-green-600 border-green-500/30"
                : "bg-red-500/20 text-red-600 border-red-500/30"
            }
          >
            {product.status}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className={`font-medium ${isWhite ? "text-slate-700" : "text-slate-300"}`}>Size:</span>
            <p className={isWhite ? "text-slate-900" : "text-white"}>{product.size}</p>
          </div>
          <div>
            <span className={`font-medium ${isWhite ? "text-slate-700" : "text-slate-300"}`}>Markup:</span>
            <p className="text-yellow-600 font-semibold">{product.markup.toFixed(2)}x</p>
          </div>
          <div>
            <span className={`font-medium ${isWhite ? "text-slate-700" : "text-slate-300"}`}>Wholesale:</span>
            {product.originalWholesalePrice ? (
              <div>
                <p className="text-slate-400 line-through text-sm">{formatCurrency(product.originalWholesalePrice)}</p>
                <p className="text-green-600 font-semibold">{formatCurrency(product.wholesalePrice)}</p>
              </div>
            ) : (
              <p className="text-green-600 font-semibold">{formatCurrency(product.wholesalePrice)}</p>
            )}
          </div>
          <div>
            <span className={`font-medium ${isWhite ? "text-slate-700" : "text-slate-300"}`}>Retail:</span>
            <p className="text-blue-600 font-semibold">{formatCurrency(product.retailPrice)}</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-slate-50 rounded-lg border">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-700">Quantity:</span>
              {product.status === "OUT OF STOCK" ? (
                <span className="text-slate-400 text-sm">Unavailable</span>
              ) : (
                <Input
                  type="number"
                  min="0"
                  value={quantity}
                  onChange={(e) => onQuantityChange(Number.parseInt(e.target.value) || 0)}
                  className="w-20 text-center border-orange-400 focus:border-orange-500 focus:ring-orange-500"
                  placeholder="0"
                />
              )}
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-slate-700">Total:</span>
              <p className={`font-semibold ${quantity > 0 ? "text-green-600" : "text-slate-400"}`}>
                {quantity > 0 ? formatCurrency(total) : "-"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-600">
          <div className="flex justify-between text-xs mb-2">
            <div>
              <span className={`font-medium ${isWhite ? "text-slate-700" : "text-slate-400"}`}>Expires:</span>
              <p>{formatDate(product.expirationDate)}</p>
            </div>
            <div className="text-right">
              <span className={`font-medium ${isWhite ? "text-slate-700" : "text-slate-400"}`}>Shelf life left:</span>
              <p>{product.monthsToExpiry} mo</p>
            </div>
          </div>
          <div className="flex justify-between text-xs">
            <div>
              <span className={`font-medium ${isWhite ? "text-slate-700" : "text-slate-400"}`}>EAN:</span>
              <p className="font-mono">{product.ean}</p>
            </div>
            <div>
              <span className={`font-medium ${isWhite ? "text-slate-700" : "text-slate-400"}`}>NCM:</span>
              <p className="font-mono">{product.ncm}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
