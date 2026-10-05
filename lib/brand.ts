// ============================================================
//  SAMPLE BRAND
//  Every name, product and figure in this project is made up
//  for demonstration. Change the values here to rename the
//  brand across the whole app.
// ============================================================

export const BRAND = {
  name: "Aurora Naturals",
  tagline: "Natural foods for retailers",
  logo: "/images/logo.svg",
}

// Emoji shown when a product has no image
const categoryEmoji: Record<string, string> = {
  Granola: "🥣",
  "Nut Butters": "🥜",
  "Baked Snacks": "🍘",
  "Teas & Infusions": "🍵",
  "Cereal Bars": "🌾",
}

export function getCategoryEmoji(category: string) {
  return categoryEmoji[category] ?? "📦"
}

// Badge color for the product highlight label ("tag" field in data/products.ts)
const tagColors: Record<string, string> = {
  SALE: "bg-red-500 text-white",
  NEW: "bg-blue-600 text-white",
}

export function getTagStyle(tag: string) {
  return tagColors[tag] ?? "bg-slate-700 text-white"
}
