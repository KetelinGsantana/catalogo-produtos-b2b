"use client"

// ============================================================
//  CATÁLOGO DE PRODUTOS — MARCA FICTÍCIA (lib/brand.ts)
//
//  Componente voltado ao público (lojistas / consumidores).
//  Exibe os produtos com cards visuais e tabelas nutricionais.
//
//  Como editar:
//  - Dados nutricionais → data/nutrition.ts
//  - Dados comerciais (preços, status) → data/products.ts
//  - Cores e fontes → seção "TEMA" abaixo
//  - Para adicionar um produto: insira em nutritionData e
//    (se tiver preço) em products.ts
// ============================================================

import { useState } from "react"
import Image from "next/image"
import { nutritionData, nutriCategories, type NutritionInfo } from "@/data/nutrition"
import { BRAND, getCategoryEmoji } from "@/lib/brand"

// ─────────────────────────────────────────────────────────
//  TEMA — edite aqui para mudar as cores globais
// ─────────────────────────────────────────────────────────
const THEME = {
  // Fundo da página
  pageBg: "bg-[#FFF8F0]",
  // Cor primária (marrom escuro da marca)
  primary: "#3D1C06",
  // Cor de destaque (laranja da marca)
  accent: "#E85D04",
  // Fundo de card
  cardBg: "bg-white",
  // Borda do card
  cardBorder: "border-[#E8D5C0]",
  // Texto principal
  textPrimary: "text-[#3D1C06]",
  // Texto secundário
  textSecondary: "text-[#7A5C44]",
  // Badge de categoria
  badgeBg: "bg-[#F4E4D4]",
  badgeText: "text-[#7A5C44]",
  // Tabela nutricional — linha alternada
  tableAlt: "bg-[#FFF8F0]",
  // Botão de ver tabela
  btnBg: "bg-[#3D1C06]",
  btnText: "text-white",
  btnHover: "hover:bg-[#5A2D0C]",
}

// ─────────────────────────────────────────────────────────
//  MAPA DE CORES POR CATEGORIA
//  Edite para mudar a identidade visual de cada categoria
// ─────────────────────────────────────────────────────────
const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  "Granola": {
    bg: "bg-amber-50",
    text: "text-amber-800",
    border: "border-amber-200",
  },
  "Pasta de Oleaginosas": {
    bg: "bg-orange-50",
    text: "text-orange-800",
    border: "border-orange-200",
  },
  "Snack Assado": {
    bg: "bg-red-50",
    text: "text-red-800",
    border: "border-red-200",
  },
  "Chá e Infusão": {
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    border: "border-emerald-200",
  },
  "Barra de Cereal": {
    bg: "bg-purple-50",
    text: "text-purple-800",
    border: "border-purple-200",
  },
}

function getCategoryStyle(categoria: string) {
  return categoryColors[categoria] ?? {
    bg: "bg-slate-50",
    text: "text-slate-700",
    border: "border-slate-200",
  }
}

// ─────────────────────────────────────────────────────────
//  SUB-COMPONENTE: Card de Produto
// ─────────────────────────────────────────────────────────
function ProductCard({ product }: { product: NutritionInfo }) {
  const [showTable, setShowTable] = useState(false)
  const catStyle = getCategoryStyle(product.categoria)

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
      {/* ── Imagem do produto ── */}
      <div className="relative bg-[#FFF8F0] flex items-center justify-center"
           style={{ minHeight: "200px" }}>
        {product.image ? (
          <Image
            src={product.image}
            alt={product.displayName}
            width={220}
            height={220}
            className="object-contain p-4 w-full"
            style={{ maxHeight: "220px", objectFit: "contain" }}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-48">
            <span className="text-6xl">{getCategoryEmoji(product.categoria)}</span>
          </div>
        )}

        {/* Badge de categoria no topo esquerdo */}
        <span
          className={`
            absolute top-3 left-3
            text-xs font-semibold px-3 py-1 rounded-full
            ${catStyle.bg} ${catStyle.text} border ${catStyle.border}
          `}
        >
          {product.categoria}
        </span>
      </div>

      {/* ── Conteúdo principal ── */}
      <div className="p-5 flex flex-col flex-1 gap-4">

        {/* Nome do produto */}
        <h3
          className={`text-lg font-bold leading-snug ${THEME.textPrimary}`}
          style={{ fontSize: "1.1rem", lineHeight: "1.4" }}
        >
          {product.displayName}
        </h3>

        {/* Porção */}
        <p className={`text-sm ${THEME.textSecondary}`}>
          📦 Porção: <strong>{product.porcao}</strong>
          {product.porcoesPorEmbalagem && (
            <> · {product.porcoesPorEmbalagem}</>
          )}
        </p>

        {/* ── Destaques nutricionais (3 números grandes) ── */}
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
                {h.valor}
              </span>
              <span className={`text-xs ${THEME.textSecondary}`}>{h.label}</span>
            </div>
          ))}
        </div>

        {/* ── Diferenciais / Alertas ── */}
        <div className="flex flex-wrap gap-2">
          {product.diferenciais.map((d, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-full bg-[#F4E4D4] text-[#7A5C44] font-medium"
            >
              ✓ {d}
            </span>
          ))}
        </div>

        {/* ── Modo de uso ── */}
        {product.modoDeUso && (
          <p className={`text-sm ${THEME.textSecondary} italic border-l-4 pl-3`}
             style={{ borderColor: THEME.accent }}>
            {product.modoDeUso}
          </p>
        )}

        {/* ── Shelf Life ── */}
        {product.shelfLife && product.shelfLife !== "—" && (
          <p className={`text-sm ${THEME.textSecondary}`}>
            ⏳ Validade: <strong>{product.shelfLife}</strong>
          </p>
        )}

        {/* ── Botão abrir/fechar tabela nutricional ── */}
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
          {showTable ? "▲ Ocultar" : "📊 Ver"} Tabela Nutricional
        </button>

        {/* ── Tabela Nutricional (expansível) ── */}
        {showTable && (
          <div className="mt-2 rounded-xl overflow-hidden border border-[#E8D5C0]">
            <table className="w-full text-sm" role="table" aria-label="Tabela Nutricional">
              <thead>
                <tr style={{ backgroundColor: THEME.primary }}>
                  <th
                    className="text-white text-left py-3 px-4 font-semibold"
                    style={{ fontSize: "0.9rem" }}
                    scope="col"
                  >
                    Nutriente
                  </th>
                  <th
                    className="text-white text-right py-3 px-4 font-semibold"
                    style={{ fontSize: "0.9rem" }}
                    scope="col"
                  >
                    Quantidade
                  </th>
                  <th
                    className="text-white text-right py-3 px-4 font-semibold"
                    style={{ fontSize: "0.9rem" }}
                    scope="col"
                  >
                    %VD*
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
                      {row.nutriente}
                    </td>
                    <td
                      className={`py-2 px-4 text-right ${THEME.textSecondary}`}
                      style={{ fontSize: "0.9rem" }}
                    >
                      {row.quantidade}
                    </td>
                    <td
                      className={`py-2 px-4 text-right ${THEME.textSecondary}`}
                      style={{ fontSize: "0.9rem" }}
                    >
                      {row.vd ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className={`text-xs ${THEME.textSecondary} px-4 py-2 bg-[#FFF8F0]`}>
              * % Valores Diários com base em uma dieta de 2.000 kcal. Seus valores diários
              podem ser maiores ou menores dependendo das suas necessidades energéticas.
            </p>
          </div>
        )}
      </div>
    </article>
  )
}

// ─────────────────────────────────────────────────────────
//  COMPONENTE PRINCIPAL: Catálogo Público
// ─────────────────────────────────────────────────────────
export function PublicCatalog() {
  const [activeCategory, setActiveCategory] = useState("Todos")

  const allCategories = ["Todos", ...nutriCategories]

  const filtered = activeCategory === "Todos"
    ? nutritionData
    : nutritionData.filter((p) => p.categoria === activeCategory)

  return (
    <section className={`min-h-screen ${THEME.pageBg}`}>

      {/* ─────── HERO / CABEÇALHO ─────── */}
      <div
        className="relative text-white py-12 px-4 text-center overflow-hidden"
        style={{ backgroundColor: THEME.primary }}
      >
        {/* Fundo decorativo */}
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
            Catálogo de Produtos
          </h1>

          <p
            className="text-white/80 max-w-md"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", lineHeight: "1.6" }}
          >
            Conheça a linha {BRAND.name}: granolas, pastas de oleaginosas, snacks,
            chás e barras de cereal para o seu ponto de venda.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {[
              { icon: "🌱", label: "Ingredientes Naturais" },
              { icon: "🚫", label: "Sem Conservantes" },
              { icon: "🌾", label: "Fonte de Fibras" },
              { icon: "📦", label: "Venda no Atacado" },
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

      {/* ─────── FILTROS DE CATEGORIA ─────── */}
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

      {/* ─────── GRID DE PRODUTOS ─────── */}
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Contador */}
        <p className={`mb-6 text-base ${THEME.textSecondary}`}>
          Exibindo <strong>{filtered.length}</strong> produto
          {filtered.length !== 1 && "s"}
          {activeCategory !== "Todos" && (
            <> em <strong>{activeCategory}</strong></>
          )}
        </p>

        {/* Grid responsivo */}
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
              Nenhum produto encontrado nesta categoria.
            </p>
          </div>
        )}
      </div>

      {/* ─────── RODAPÉ DO CATÁLOGO ─────── */}
      <footer
        className="text-center py-8 px-4 text-sm"
        style={{ color: THEME.accent, backgroundColor: "#FFF0E0" }}
      >
        <p className="font-semibold" style={{ color: THEME.primary }}>
          {BRAND.name} · {BRAND.tagline}
        </p>
        <p className="mt-1" style={{ color: "#7A5C44" }}>
          Marca e produtos fictícios. Informações nutricionais meramente ilustrativas.
        </p>
      </footer>
    </section>
  )
}
