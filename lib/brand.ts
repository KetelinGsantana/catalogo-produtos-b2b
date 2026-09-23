// ============================================================
//  MARCA FICTÍCIA
//  Todos os nomes, produtos e dados deste projeto são
//  inventados para fins de demonstração. Troque aqui para
//  renomear a marca em toda a aplicação.
// ============================================================

export const BRAND = {
  name: "Aurora Naturais",
  tagline: "Alimentos naturais para o varejo",
  logo: "/images/logo.svg",
}

// Emoji usado quando o produto não tem imagem
export const categoryEmoji: Record<string, string> = {
  Granola: "🥣",
  "Pasta de Oleaginosas": "🥜",
  "Snack Assado": "🍘",
  "Chá e Infusão": "🍵",
  "Barra de Cereal": "🌾",
}

export function getCategoryEmoji(categoria: string) {
  return categoryEmoji[categoria] ?? "📦"
}
