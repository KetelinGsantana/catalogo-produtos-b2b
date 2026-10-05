"use client"

// ============================================================
//  PRODUCT CATALOG — SAMPLE BRAND (lib/brand.ts)
//
//  Public-facing component (retailers / shoppers).
//  Shows products as visual cards with nutrition tables.
//
//  How to edit:
//  - Nutrition data → data/nutrition.ts
//  - Commercial data (prices, status) → data/products.ts
//  - Colors and fonts → "THEME" section below
//  - To add a product: add it to nutritionData and
//    (if it has a price) to products.ts
// ============================================================

import { useState } from "react"
import Image from "next/image"
import { nutritionData, nutritionCategories, type NutritionInfo } from "@/data/nutrition"
import { BRAND, getCategoryEmoji } from "@/lib/brand"

// ─────────────────────────────────────────────────────────
//  THEME — edit here to change the global colors
// ─────────────────────────────────────────────────────────
const THEME = {
  // Page background
  pageBg: "bg-[#FFF8F0]",
  // Primary color (brand dark brown)
  primary: "#3D1C06",
  // Accent color (brand orange)
  accent: "#E85D04",
  // Card background
  cardBg: "bg-white",
  // Card border
  cardBorder: "border-[#E8D5C0]",
  // Main text
  textPrimary: "text-[#3D1C06]",
  // Secondary text
  textSecondary: "text-[#7A5C44]",
  // Category badge
  badgeBg: "bg-[#F4E4D4]",
  badgeText: "text-[#7A5C44]",
  // Nutrition table — alternate row
  tableAlt: "bg-[#FFF8F0]",
  // Show-table button
  btnBg: "bg-[#3D1C06]",
  btnText: "text-white",
  btnHover: "hover:bg-[#5A2D0C]",
}

// ─────────────────────────────────────────────────────────
//  CATEGORY COLOR MAP
//  Edit to change the visual identity of each category
// ─────────────────────────────────────────────────────────
const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  "Granola": {
    bg: "bg-amber-50",
    text: "text-amber-800",
    border: "border-amber-200",
  },
  "Nut Butters": {
    bg: "bg-orange-50",
    text: "text-orange-800",
    border: "border-orange-200",
  },
  "Baked Snacks": {
    bg: "bg-red-50",
    text: "text-red-800",
    border: "border-red-200",
  },
  "Teas & Infusions": {
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    border: "border-emerald-200",
  },
  "Cereal Bars": {
    bg: "bg-purple-50",
    text: "text-purple-800",
    border: "border-purple-200",
  },
}

function getCategoryStyle(category: string) {
  return categoryColors[category] ?? {
    bg: "bg-slate-50",
    text: "text-slate-700",
    border: "border-slate-200",
  }
}

// ─────────────────────────────────────────────────────────
//  SUB-COMPONENT: Product Card
// ─────────────────────────────────────────────────────────
function ProductCard({ product }: { product: NutritionInfo }) {
  const [showTable, setShowTable] = useState(false)
  const catStyle = getCategoryStyle(product.category)

  return (
    <article
      className={`
        ${THEME.cardBg} ${THEME.cardBorder}
        rounded-2xl border shadow-sm
        flex flex-col
        overflow-hidden
        transition-shadow duration-200
        hover:shadow-lg
      `}
    >
      {/* ── Product image ── */}
      <div className="relative bg-[#FFF8F0] flex items-center justify-center"
           style={{ minHeight: "200px" }}>
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={220}
            height={220}
            className="object-contain p-4 w-full"
            style={{ maxHeight: "220px", objectFit: "contain" }}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-48">
            <span className="text-6xl">{getCategoryEmoji(product.category)}</span>
          </div>
        )}

        {/* Category badge in the top-left corner */}
        <span
          className={`
            absolute top-3 left-3
            text-xs font-semibold px-3 py-1 rounded-full
            ${catStyle.bg} ${catStyle.text} border ${catStyle.border}
          `}
        >
          {product.category}
        </span>
      </div>

      {/* ── Main content ── */}
      <div className="p-5 flex flex-col flex-1 gap-4">

        {/* Product name */}
        <h3
          className={`text-lg font-bold leading-snug ${THEME.textPrimary}`}
          style={{ fontSize: "1.1rem", lineHeight: "1.4" }}
        >
          {product.name}
        </h3>

        {/* Serving */}
        <p className={`text-sm ${THEME.textSecondary}`}>
          📦 Serving: <strong>{product.servingSize}</strong>
          {product.servingsPerPackage && (
            <> · {product.servingsPerPackage}</>
          )}
        </p>

        {/* ── Nutrition highlights (3 big figures) ── */}
        <div className="grid grid-cols-3 gap-2">
          {product.highlights.map((h, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center bg-[#FFF8F0] rounded-xl p-3 gap-1"
            >
              <span className="text-2xl">{h.icon}</span>
              <span
                className="font-extrabold"
                style={{ color: THEME.accent, fontSize: "1.2rem", lineHeight: 1 }}
              >
                {h.value}
              </span>
              <span className={`text-xs ${THEME.textSecondary}`}>{h.label}</span>
            </div>
          ))}
        </div>

        {/* ── Features ── */}
        <div className="flex flex-wrap gap-2">
          {product.features.map((d, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-full bg-[#F4E4D4] text-[#7A5C44] font-medium"
            >
              ✓ {d}
            </span>
          ))}
        </div>

        {/* ── Directions ── */}
        {product.directions && (
          <p className={`text-sm ${THEME.textSecondary} italic border-l-4 pl-3`}
             style={{ borderColor: THEME.accent }}>
            {product.directions}
          </p>
        )}

        {/* ── Shelf Life ── */}
        {product.shelfLife && product.shelfLife !== "—" && (
          <p className={`text-sm ${THEME.textSecondary}`}>
            ⏳ Shelf life: <strong>{product.shelfLife}</strong>
          </p>
        )}

        {/* ── Show/hide nutrition table button ── */}
        <button
          onClick={() => setShowTable((v) => !v)}
          className={`
            w-full mt-auto py-3 px-4 rounded-xl
            ${THEME.btnBg} ${THEME.btnText} ${THEME.btnHover}
            font-semibold text-base
            flex items-center justify-center gap-2
            transition-colors duration-150
            cursor-pointer
          `}
          aria-expanded={showTable}
          style={{ fontSize: "1rem" }}
        >
          {showTable ? "▲ Hide" : "📊 View"} Nutrition Facts
        </button>

        {/* ── Nutrition table (expandable) ── */}
        {showTable && (
          <div className="mt-2 rounded-xl overflow-hidden border border-[#E8D5C0]">
            <table className="w-full text-sm" role="table" aria-label="Nutrition Facts">
              <thead>
                <tr style={{ backgroundColor: THEME.primary }}>
                  <th
                    className="text-white text-left py-3 px-4 font-semibold"
                    style={{ fontSize: "0.9rem" }}
                    scope="col"
                  >
                    Nutrient
                  </th>
                  <th
                    className="text-white text-right py-3 px-4 font-semibold"
                    style={{ fontSize: "0.9rem" }}
                    scope="col"
                  >
                    Amount
                  </th>
                  <th
                    className="text-white text-right py-3 px-4 font-semibold"
                    style={{ fontSize: "0.9rem" }}
                    scope="col"
                  >
                    %DV*
                  </th>
                </tr>
              </thead>
              <tbody>
                {product.table.map((row, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-white" : THEME.tableAlt}
                  >
                    <td
                      className={`py-2 px-4 ${THEME.textPrimary} font-medium`}
                      style={{ fontSize: "0.9rem" }}
                    >
                      {row.nutrient}
                    </td>
                    <td
                      className={`py-2 px-4 text-right ${THEME.textSecondary}`}
                      style={{ fontSize: "0.9rem" }}
                    >
                      {row.amount}
                    </td>
                    <td
                      className={`py-2 px-4 text-right ${THEME.textSecondary}`}
                      style={{ fontSize: "0.9rem" }}
                    >
                      {row.dailyValue ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className={`text-xs ${THEME.textSecondary} px-4 py-2 bg-[#FFF8F0]`}>
              * Percent Daily Values are based on a 2,000 calorie diet. Your daily values may
              be higher or lower depending on your calorie needs.
            </p>
          </div>
        )}
      </div>
    </article>
  )
}

// ─────────────────────────────────────────────────────────
//  MAIN COMPONENT: Public Catalog
// ─────────────────────────────────────────────────────────
export function PublicCatalog() {
  const [activeCategory, setActiveCategory] = useState("All")

  const allCategories = ["All", ...nutritionCategories]

  const filtered = activeCategory === "All"
    ? nutritionData
    : nutritionData.filter((p) => p.category === activeCategory)

  return (
    <section className={`min-h-screen ${THEME.pageBg}`}>

      {/* ─────── HERO / HEADER ─────── */}
      <div
        className="relative text-white py-12 px-4 text-center overflow-hidden"
        style={{ backgroundColor: THEME.primary }}
      >
        {/* Decorative background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #E85D04 0, #E85D04 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-4">
          <Image
            src={BRAND.logo}
            alt={`${BRAND.name} Logo`}
            width={120}
            height={60}
            className="h-14 w-auto"
          />

          <h1
            className="font-extrabold leading-tight"
            style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)" }}
          >
            Product Catalog
          </h1>

          <p
            className="text-white/80 max-w-md"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", lineHeight: "1.6" }}
          >
            Discover the {BRAND.name} line: granolas, nut butters, snacks,
            teas and cereal bars for your store.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {[
              { icon: "🌱", label: "Natural Ingredients" },
              { icon: "🚫", label: "No Preservatives" },
              { icon: "🌾", label: "Source of Fiber" },
              { icon: "📦", label: "Wholesale Supply" },
            ].map((tag) => (
              <span
                key={tag.label}
                className="flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full bg-white/15"
              >
                {tag.icon} {tag.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─────── CATEGORY FILTERS ─────── */}
      <div
        className="sticky top-0 z-20 border-b border-[#E8D5C0] bg-white/95 backdrop-blur-sm"
        style={{ boxShadow: "0 2px 8px rgba(61,28,6,0.06)" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {allCategories.map((cat) => {
              const isActive = cat === activeCategory
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    px-5 py-2 rounded-full font-semibold whitespace-nowrap
                    transition-all duration-200 cursor-pointer
                    ${isActive
                      ? "text-white shadow-md scale-105"
                      : `${THEME.textSecondary} bg-[#F4E4D4] hover:bg-[#E8D5C0]`
                    }
                  `}
                  style={{
                    backgroundColor: isActive ? THEME.accent : undefined,
                    fontSize: "0.95rem",
                  }}
                  aria-pressed={isActive}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ─────── PRODUCT GRID ─────── */}
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Counter */}
        <p className={`mb-6 text-base ${THEME.textSecondary}`}>
          Showing <strong>{filtered.length}</strong> product
          {filtered.length !== 1 && "s"}
          {activeCategory !== "All" && (
            <> in <strong>{activeCategory}</strong></>
          )}
        </p>

        {/* Responsive grid */}
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
          }}
        >
          {filtered.map((product) => (
            <ProductCard key={product.key} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <span className="text-5xl">😕</span>
            <p className={`mt-4 text-lg ${THEME.textSecondary}`}>
              No products found in this category.
            </p>
          </div>
        )}
      </div>

      {/* ─────── CATALOG FOOTER ─────── */}
      <footer
        className="text-center py-8 px-4 text-sm"
        style={{ color: THEME.accent, backgroundColor: "#FFF0E0" }}
      >
        <p className="font-semibold" style={{ color: THEME.primary }}>
          {BRAND.name} · {BRAND.tagline}
        </p>
        <p className="mt-1" style={{ color: "#7A5C44" }}>
          Sample brand and products. Nutrition facts are for illustration only.
        </p>
      </footer>
    </section>
  )
}
