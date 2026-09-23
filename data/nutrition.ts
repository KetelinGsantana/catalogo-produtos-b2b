// ============================================================
//  DADOS NUTRICIONAIS — FICTÍCIOS
//  Valores inventados para demonstração. Não correspondem a
//  nenhum produto real.
//
//  Como editar:
//  - Cada objeto dentro do array "nutritionData" representa um produto
//  - "key" é um identificador livre do produto
//  - "highlights" são os 3 destaques que aparecem nos cards
//  - "table" é a tabela nutricional completa por porção
// ============================================================

export interface NutrientRow {
  nutriente: string
  quantidade: string
  vd?: string // % Valor Diário — opcional
}

export interface NutritionInfo {
  /** Deve bater com product.produto OU ser um id livre */
  key: string
  /** Nome amigável para exibição */
  displayName: string
  /** Categoria visual do produto */
  categoria: string
  /** Porção de referência */
  porcao: string
  /** Porções por embalagem */
  porcoesPorEmbalagem?: string
  /** 3 destaques visuais (ícone emoji, label, valor) */
  highlights: { icon: string; label: string; valor: string }[]
  /** Tabela nutricional completa */
  table: NutrientRow[]
  /** Diferenciais / alertas (sem glúten, vegan, etc.) */
  diferenciais: string[]
  /** Imagem do produto (caminho relativo /images/...) */
  image?: string
  /** Shelf life do produto */
  shelfLife?: string
  /** Modo de uso resumido */
  modoDeUso?: string
}

export const nutritionData: NutritionInfo[] = [
  // ─────────────────────────────────────────────────
  //  GRANOLAS — porção 40g (4 colheres de sopa)
  // ─────────────────────────────────────────────────
  {
    key: "granola-mel",
    displayName: "Granola Tradicional com Mel",
    categoria: "Granola",
    porcao: "40g (4 colheres de sopa)",
    porcoesPorEmbalagem: "20 porções",
    shelfLife: "12 meses",
    modoDeUso: "Sirva com iogurte, leite ou frutas.",
    image: "/images/products/granola.svg",
    highlights: [
      { icon: "🔥", label: "Calorias", valor: "172 kcal" },
      { icon: "🌾", label: "Fibras", valor: "3,6g" },
      { icon: "💪", label: "Proteínas", valor: "4,1g" },
    ],
    diferenciais: ["Com aveia em flocos", "Sem conservantes", "Adoçada com mel"],
    table: [
      { nutriente: "Valor Energético", quantidade: "172 kcal / 722 kJ", vd: "9%" },
      { nutriente: "Carboidratos", quantidade: "26g", vd: "—" },
      { nutriente: "Açúcares Adicionados", quantidade: "5,2g", vd: "—" },
      { nutriente: "Proteínas", quantidade: "4,1g", vd: "—" },
      { nutriente: "Gorduras Totais", quantidade: "5,8g", vd: "—" },
      { nutriente: "Gorduras Saturadas", quantidade: "1,2g", vd: "—" },
      { nutriente: "Gorduras Trans", quantidade: "0g", vd: "0%" },
      { nutriente: "Fibra Alimentar", quantidade: "3,6g", vd: "—" },
      { nutriente: "Sódio", quantidade: "12mg", vd: "—" },
    ],
  },
  {
    key: "granola-sem-acucar",
    displayName: "Granola Sem Açúcar Castanhas",
    categoria: "Granola",
    porcao: "40g (4 colheres de sopa)",
    porcoesPorEmbalagem: "10 porções",
    shelfLife: "12 meses",
    modoDeUso: "Sirva com iogurte, leite ou frutas.",
    image: "/images/products/granola.svg",
    highlights: [
      { icon: "🔥", label: "Calorias", valor: "168 kcal" },
      { icon: "🌾", label: "Fibras", valor: "4,4g" },
      { icon: "🍯", label: "Açúcar adic.", valor: "0g" },
    ],
    diferenciais: ["Zero açúcar adicionado", "Com castanhas", "Fonte de fibras"],
    table: [
      { nutriente: "Valor Energético", quantidade: "168 kcal / 705 kJ", vd: "8%" },
      { nutriente: "Carboidratos", quantidade: "21g", vd: "—" },
      { nutriente: "Açúcares Adicionados", quantidade: "0g", vd: "—" },
      { nutriente: "Proteínas", quantidade: "4,8g", vd: "—" },
      { nutriente: "Gorduras Totais", quantidade: "7,1g", vd: "—" },
      { nutriente: "Gorduras Saturadas", quantidade: "1,4g", vd: "—" },
      { nutriente: "Gorduras Trans", quantidade: "0g", vd: "0%" },
      { nutriente: "Fibra Alimentar", quantidade: "4,4g", vd: "—" },
      { nutriente: "Sódio", quantidade: "8mg", vd: "—" },
    ],
  },
  // ─────────────────────────────────────────────────
  //  PASTAS DE OLEAGINOSAS — porção 15g (1 colher de sopa)
  // ─────────────────────────────────────────────────
  {
    key: "pasta-amendoim-integral",
    displayName: "Pasta de Amendoim Integral",
    categoria: "Pasta de Oleaginosas",
    porcao: "15g (1 colher de sopa)",
    porcoesPorEmbalagem: "66 porções",
    shelfLife: "12 meses",
    image: "/images/products/pasta.svg",
    highlights: [
      { icon: "💪", label: "Proteínas", valor: "3,9g" },
      { icon: "🔥", label: "Calorias", valor: "92 kcal" },
      { icon: "🥜", label: "Amendoim", valor: "100%" },
    ],
    diferenciais: ["100% amendoim", "Sem sal", "Sem açúcar adicionado"],
    table: [
      { nutriente: "Valor Energético", quantidade: "92 kcal / 386 kJ", vd: "5%" },
      { nutriente: "Carboidratos", quantidade: "2,4g", vd: "—" },
      { nutriente: "Açúcares Adicionados", quantidade: "0g", vd: "—" },
      { nutriente: "Proteínas", quantidade: "3,9g", vd: "—" },
      { nutriente: "Gorduras Totais", quantidade: "7,4g", vd: "—" },
      { nutriente: "Gorduras Saturadas", quantidade: "1,3g", vd: "—" },
      { nutriente: "Gorduras Trans", quantidade: "0g", vd: "0%" },
      { nutriente: "Fibra Alimentar", quantidade: "1,2g", vd: "—" },
      { nutriente: "Sódio", quantidade: "2mg", vd: "—" },
    ],
  },
  {
    key: "pasta-caju",
    displayName: "Pasta de Castanha de Caju",
    categoria: "Pasta de Oleaginosas",
    porcao: "15g (1 colher de sopa)",
    porcoesPorEmbalagem: "20 porções",
    shelfLife: "10 meses",
    image: "/images/products/pasta.svg",
    highlights: [
      { icon: "🔥", label: "Calorias", valor: "88 kcal" },
      { icon: "💪", label: "Proteínas", valor: "2,7g" },
      { icon: "🌾", label: "Fibras", valor: "0,5g" },
    ],
    diferenciais: ["Textura cremosa", "Sem conservantes", "Vegano"],
    table: [
      { nutriente: "Valor Energético", quantidade: "88 kcal / 370 kJ", vd: "4%" },
      { nutriente: "Carboidratos", quantidade: "4,5g", vd: "—" },
      { nutriente: "Açúcares Adicionados", quantidade: "0g", vd: "—" },
      { nutriente: "Proteínas", quantidade: "2,7g", vd: "—" },
      { nutriente: "Gorduras Totais", quantidade: "6,9g", vd: "—" },
      { nutriente: "Gorduras Saturadas", quantidade: "1,4g", vd: "—" },
      { nutriente: "Gorduras Trans", quantidade: "0g", vd: "0%" },
      { nutriente: "Fibra Alimentar", quantidade: "0,5g", vd: "—" },
      { nutriente: "Sódio", quantidade: "3mg", vd: "—" },
    ],
  },
  // ─────────────────────────────────────────────────
  //  SNACKS ASSADOS — porção 25g
  // ─────────────────────────────────────────────────
  {
    key: "chips-grao-de-bico",
    displayName: "Chips de Grão-de-Bico Páprica",
    categoria: "Snack Assado",
    porcao: "25g (1/3 do pacote)",
    porcoesPorEmbalagem: "~3 porções",
    shelfLife: "6 meses",
    image: "/images/products/snack.svg",
    highlights: [
      { icon: "🔥", label: "Calorias", valor: "108 kcal" },
      { icon: "💪", label: "Proteínas", valor: "4,2g" },
      { icon: "🌾", label: "Fibras", valor: "2,9g" },
    ],
    diferenciais: ["Assado, não frito", "Sem glúten", "Vegano"],
    table: [
      { nutriente: "Valor Energético", quantidade: "108 kcal / 454 kJ", vd: "5%" },
      { nutriente: "Carboidratos", quantidade: "14g", vd: "—" },
      { nutriente: "Açúcares Adicionados", quantidade: "0g", vd: "—" },
      { nutriente: "Proteínas", quantidade: "4,2g", vd: "—" },
      { nutriente: "Gorduras Totais", quantidade: "3,6g", vd: "—" },
      { nutriente: "Gorduras Saturadas", quantidade: "0,5g", vd: "—" },
      { nutriente: "Gorduras Trans", quantidade: "0g", vd: "0%" },
      { nutriente: "Fibra Alimentar", quantidade: "2,9g", vd: "—" },
      { nutriente: "Sódio", quantidade: "140mg", vd: "—" },
    ],
  },
  {
    key: "biscoito-arroz",
    displayName: "Biscoito de Arroz Integral Ervas",
    categoria: "Snack Assado",
    porcao: "25g (5 unidades)",
    porcoesPorEmbalagem: "4 porções",
    shelfLife: "8 meses",
    image: "/images/products/snack.svg",
    highlights: [
      { icon: "🔥", label: "Calorias", valor: "96 kcal" },
      { icon: "🧂", label: "Sódio", valor: "85mg" },
      { icon: "🌾", label: "Fibras", valor: "1,1g" },
    ],
    diferenciais: ["Arroz integral", "Sem glúten", "Baixo teor de gordura"],
    table: [
      { nutriente: "Valor Energético", quantidade: "96 kcal / 403 kJ", vd: "5%" },
      { nutriente: "Carboidratos", quantidade: "20g", vd: "—" },
      { nutriente: "Açúcares Adicionados", quantidade: "0g", vd: "—" },
      { nutriente: "Proteínas", quantidade: "2,0g", vd: "—" },
      { nutriente: "Gorduras Totais", quantidade: "0,8g", vd: "—" },
      { nutriente: "Gorduras Saturadas", quantidade: "0,2g", vd: "—" },
      { nutriente: "Gorduras Trans", quantidade: "0g", vd: "0%" },
      { nutriente: "Fibra Alimentar", quantidade: "1,1g", vd: "—" },
      { nutriente: "Sódio", quantidade: "85mg", vd: "—" },
    ],
  },
  // ─────────────────────────────────────────────────
  //  CHÁS E INFUSÕES — porção 200ml (1 sachê)
  // ─────────────────────────────────────────────────
  {
    key: "cha-verde-hortela",
    displayName: "Chá Verde com Hortelã",
    categoria: "Chá e Infusão",
    porcao: "200ml (1 sachê)",
    porcoesPorEmbalagem: "20 porções",
    shelfLife: "24 meses",
    modoDeUso: "Deixe 1 sachê em infusão em 200ml de água quente por 3 minutos.",
    image: "/images/products/cha.svg",
    highlights: [
      { icon: "🔥", label: "Calorias", valor: "2 kcal" },
      { icon: "🌿", label: "Ingredientes", valor: "2" },
      { icon: "🍯", label: "Açúcar adic.", valor: "0g" },
    ],
    diferenciais: ["Sem açúcar", "Sem aromatizantes artificiais"],
    table: [
      { nutriente: "Valor Energético", quantidade: "2 kcal / 8 kJ", vd: "0%" },
      { nutriente: "Carboidratos", quantidade: "0,4g", vd: "—" },
      { nutriente: "Açúcares Adicionados", quantidade: "0g", vd: "—" },
      { nutriente: "Proteínas", quantidade: "0g", vd: "—" },
      { nutriente: "Gorduras Totais", quantidade: "0g", vd: "—" },
      { nutriente: "Gorduras Saturadas", quantidade: "0g", vd: "—" },
      { nutriente: "Gorduras Trans", quantidade: "0g", vd: "0%" },
      { nutriente: "Fibra Alimentar", quantidade: "0g", vd: "—" },
      { nutriente: "Sódio", quantidade: "1mg", vd: "—" },
    ],
  },
  // ─────────────────────────────────────────────────
  //  BARRAS DE CEREAL — porção 25g (1 unidade)
  // ─────────────────────────────────────────────────
  {
    key: "barra-banana-aveia",
    displayName: "Barra de Cereal Banana e Aveia",
    categoria: "Barra de Cereal",
    porcao: "25g (1 unidade)",
    porcoesPorEmbalagem: "12 unidades por caixa",
    shelfLife: "9 meses",
    image: "/images/products/barra.svg",
    highlights: [
      { icon: "🔥", label: "Calorias", valor: "98 kcal" },
      { icon: "🌾", label: "Fibras", valor: "1,8g" },
      { icon: "🍌", label: "Fruta", valor: "Banana" },
    ],
    diferenciais: ["Com pedaços de fruta", "Fonte de fibras"],
    table: [
      { nutriente: "Valor Energético", quantidade: "98 kcal / 412 kJ", vd: "5%" },
      { nutriente: "Carboidratos", quantidade: "17g", vd: "—" },
      { nutriente: "Açúcares Adicionados", quantidade: "4,1g", vd: "—" },
      { nutriente: "Proteínas", quantidade: "1,6g", vd: "—" },
      { nutriente: "Gorduras Totais", quantidade: "2,6g", vd: "—" },
      { nutriente: "Gorduras Saturadas", quantidade: "0,6g", vd: "—" },
      { nutriente: "Gorduras Trans", quantidade: "0g", vd: "0%" },
      { nutriente: "Fibra Alimentar", quantidade: "1,8g", vd: "—" },
      { nutriente: "Sódio", quantidade: "18mg", vd: "—" },
    ],
  },
  {
    key: "barra-castanhas-mel",
    displayName: "Barra de Cereal Castanhas e Mel",
    categoria: "Barra de Cereal",
    porcao: "25g (1 unidade)",
    porcoesPorEmbalagem: "12 unidades por caixa",
    shelfLife: "9 meses",
    image: "/images/products/barra.svg",
    highlights: [
      { icon: "🔥", label: "Calorias", valor: "112 kcal" },
      { icon: "💪", label: "Proteínas", valor: "2,3g" },
      { icon: "🌾", label: "Fibras", valor: "1,5g" },
    ],
    diferenciais: ["Com castanhas", "Adoçada com mel"],
    table: [
      { nutriente: "Valor Energético", quantidade: "112 kcal / 470 kJ", vd: "6%" },
      { nutriente: "Carboidratos", quantidade: "15g", vd: "—" },
      { nutriente: "Açúcares Adicionados", quantidade: "4,8g", vd: "—" },
      { nutriente: "Proteínas", quantidade: "2,3g", vd: "—" },
      { nutriente: "Gorduras Totais", quantidade: "4,6g", vd: "—" },
      { nutriente: "Gorduras Saturadas", quantidade: "0,8g", vd: "—" },
      { nutriente: "Gorduras Trans", quantidade: "0g", vd: "0%" },
      { nutriente: "Fibra Alimentar", quantidade: "1,5g", vd: "—" },
      { nutriente: "Sódio", quantidade: "22mg", vd: "—" },
    ],
  },
]

// ─────────────────────────────────────────────────────────
//  MAPA DE LOOKUP: key → NutritionInfo
//  Útil para componentes que precisam buscar por chave
// ─────────────────────────────────────────────────────────
export const nutritionMap = Object.fromEntries(
  nutritionData.map((n) => [n.key, n])
) as Record<string, NutritionInfo>

// Lista de categorias únicas
export const nutriCategories = Array.from(
  new Set(nutritionData.map((n) => n.categoria))
)
