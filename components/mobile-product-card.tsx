"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { Product } from "@/data/products"
import Image from "next/image"
import { getCategoryEmoji } from "@/lib/brand"

interface MobileProductCardProps {
  product: Product
  theme: "black" | "white"
  quantity: number
  onQuantityChange: (quantity: number) => void
}

export function MobileProductCard({ product, theme, quantity, onQuantityChange }: MobileProductCardProps) {
  const isWhite = theme === "white"

  const price = Number.parseFloat(product.precoAtacado.replace(/[R$\s]/g, "").replace(",", "."))
  const total = quantity * price

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
                    alt={product.produto}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded flex items-center justify-center text-white text-sm font-bold">
                  {getCategoryEmoji(product.categoria)}
                </div>
              )}
              {product.promocao && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold px-1 rounded">
                  PROMO
                </div>
              )}
            </div>
            <div>
              <h3 className={`font-semibold ${isWhite ? "text-slate-900" : "text-white"}`}>{product.produto}</h3>
              <p className={`text-sm ${isWhite ? "text-slate-600" : "text-slate-400"}`}>{product.categoria}</p>
              {product.promocao && (
                <Badge className="mt-1 bg-red-500 text-white text-[10px] px-2 py-0">
                  PROMO&Ccedil;&Atilde;O
                </Badge>
              )}
            </div>
          </div>
          <Badge
            variant={product.status === "DISPONÍVEL" ? "default" : "destructive"}
            className={
              product.status === "DISPONÍVEL"
                ? "bg-green-500/20 text-green-600 border-green-500/30"
                : "bg-red-500/20 text-red-600 border-red-500/30"
            }
          >
            {product.status}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className={`font-medium ${isWhite ? "text-slate-700" : "text-slate-300"}`}>Peso:</span>
            <p className={isWhite ? "text-slate-900" : "text-white"}>{product.peso}</p>
          </div>
          <div>
            <span className={`font-medium ${isWhite ? "text-slate-700" : "text-slate-300"}`}>MKP:</span>
            <p className="text-yellow-600 font-semibold">{product.mkp}</p>
          </div>
          <div>
            <span className={`font-medium ${isWhite ? "text-slate-700" : "text-slate-300"}`}>Atacado:</span>
            {product.promocao ? (
              <div>
                <p className="text-slate-400 line-through text-sm">{product.precoAtacadoOriginal}</p>
                <p className="text-green-600 font-semibold">{product.precoAtacado}</p>
              </div>
            ) : (
              <p className="text-green-600 font-semibold">{product.precoAtacado}</p>
            )}
          </div>
          <div>
            <span className={`font-medium ${isWhite ? "text-slate-700" : "text-slate-300"}`}>Revenda:</span>
            <p className="text-blue-600 font-semibold">{product.precoRevenda}</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-slate-50 rounded-lg border">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-700">Quantidade:</span>
              {product.status === "ESGOTADO" ? (
                <span className="text-slate-400 text-sm">Indisponivel</span>
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
                {quantity > 0 ? total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : "-"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-600">
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
