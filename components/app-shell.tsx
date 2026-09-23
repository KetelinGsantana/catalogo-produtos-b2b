"use client"

import { useState } from "react"
import Image from "next/image"
import { BRAND } from "@/lib/brand"
import { ProductCatalog } from "@/components/product-catalog"
import { PublicCatalog } from "@/components/public-catalog"

export function AppShell() {
  const [activeTab, setActiveTab] = useState<"catalogo" | "pedido">("catalogo")

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFF8F0" }}>
      <header className="sticky top-0 z-30 shadow-md" style={{ backgroundColor: "#3D1C06" }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Image src={BRAND.logo} alt={BRAND.name} width={80} height={40} className="h-9 w-auto" />
          <nav className="flex gap-2">
            {[
              { id: "catalogo" as const, label: "📖 Catálogo", short: "Catálogo" },
              { id: "pedido" as const, label: "🛒 Fazer Pedido", short: "Pedido" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-4 py-2 rounded-lg font-semibold text-sm sm:text-base transition-all cursor-pointer"
                style={{
                  backgroundColor: activeTab === tab.id ? "#E85D04" : "transparent",
                  color: activeTab === tab.id ? "white" : "rgba(255,255,255,0.75)",
                  border: activeTab === tab.id ? "none" : "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <span className="sm:hidden">{tab.short}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main>
        {activeTab === "catalogo" && <PublicCatalog />}
        {activeTab === "pedido" && <ProductCatalog />}
      </main>
    </div>
  )
}
