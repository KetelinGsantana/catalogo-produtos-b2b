// ============================================================
//  NUTRITION FACTS — SAMPLE DATA
//  Made-up values for demonstration. They do not describe any
//  real product.
//
//  How to edit:
//  - Each object in the "nutritionData" array is one product
//  - "key" is a free-form product identifier
//  - "highlights" are the 3 figures shown on each card
//  - "table" is the full nutrition table per serving
// ============================================================

export interface NutrientRow {
  nutrient: string
  amount: string
  dailyValue?: string // % Daily Value — optional
}

export interface NutritionInfo {
  /** Free-form product identifier */
  key: string
  /** Display name */
  name: string
  /** Product category */
  category: string
  /** Reference serving */
  servingSize: string
  /** Servings per package */
  servingsPerPackage?: string
  /** 3 highlighted figures (emoji icon, label, value) */
  highlights: { icon: string; label: string; value: string }[]
  /** Full nutrition table */
  table: NutrientRow[]
  /** Selling points (gluten free, vegan, etc.) */
  features: string[]
  /** Product image (path under /images/...) */
  image?: string
  /** Shelf life */
  shelfLife?: string
  /** Short directions for use */
  directions?: string
}

export const nutritionData: NutritionInfo[] = [
  // ─────────────────────────────────────────────────
  //  GRANOLA — 40g serving (4 tablespoons)
  // ─────────────────────────────────────────────────
  {
    key: "honey-granola",
    name: "Honey Granola",
    category: "Granola",
    servingSize: "40g (4 tablespoons)",
    servingsPerPackage: "20 servings",
    shelfLife: "12 months",
    directions: "Serve with yogurt, milk or fruit.",
    image: "/images/products/granola.svg",
    highlights: [
      { icon: "🔥", label: "Calories", value: "172 kcal" },
      { icon: "🌾", label: "Fiber", value: "3.6g" },
      { icon: "💪", label: "Protein", value: "4.1g" },
    ],
    features: ["Rolled oats", "No preservatives", "Sweetened with honey"],
    table: [
      { nutrient: "Energy", amount: "172 kcal / 722 kJ", dailyValue: "9%" },
      { nutrient: "Carbohydrates", amount: "26g", dailyValue: "—" },
      { nutrient: "Added Sugars", amount: "5.2g", dailyValue: "—" },
      { nutrient: "Protein", amount: "4.1g", dailyValue: "—" },
      { nutrient: "Total Fat", amount: "5.8g", dailyValue: "—" },
      { nutrient: "Saturated Fat", amount: "1.2g", dailyValue: "—" },
      { nutrient: "Trans Fat", amount: "0g", dailyValue: "0%" },
      { nutrient: "Dietary Fiber", amount: "3.6g", dailyValue: "—" },
      { nutrient: "Sodium", amount: "12mg", dailyValue: "—" },
    ],
  },
  {
    key: "no-sugar-nut-granola",
    name: "No Sugar Added Nut Granola",
    category: "Granola",
    servingSize: "40g (4 tablespoons)",
    servingsPerPackage: "10 servings",
    shelfLife: "12 months",
    directions: "Serve with yogurt, milk or fruit.",
    image: "/images/products/granola.svg",
    highlights: [
      { icon: "🔥", label: "Calories", value: "168 kcal" },
      { icon: "🌾", label: "Fiber", value: "4.4g" },
      { icon: "🍯", label: "Added sugar", value: "0g" },
    ],
    features: ["No added sugar", "With nuts", "Source of fiber"],
    table: [
      { nutrient: "Energy", amount: "168 kcal / 705 kJ", dailyValue: "8%" },
      { nutrient: "Carbohydrates", amount: "21g", dailyValue: "—" },
      { nutrient: "Added Sugars", amount: "0g", dailyValue: "—" },
      { nutrient: "Protein", amount: "4.8g", dailyValue: "—" },
      { nutrient: "Total Fat", amount: "7.1g", dailyValue: "—" },
      { nutrient: "Saturated Fat", amount: "1.4g", dailyValue: "—" },
      { nutrient: "Trans Fat", amount: "0g", dailyValue: "0%" },
      { nutrient: "Dietary Fiber", amount: "4.4g", dailyValue: "—" },
      { nutrient: "Sodium", amount: "8mg", dailyValue: "—" },
    ],
  },
  // ─────────────────────────────────────────────────
  //  NUT BUTTERS — 15g serving (1 tablespoon)
  // ─────────────────────────────────────────────────
  {
    key: "natural-peanut-butter",
    name: "Natural Peanut Butter",
    category: "Nut Butters",
    servingSize: "15g (1 tablespoon)",
    servingsPerPackage: "66 servings",
    shelfLife: "12 months",
    image: "/images/products/nut-butter.svg",
    highlights: [
      { icon: "💪", label: "Protein", value: "3.9g" },
      { icon: "🔥", label: "Calories", value: "92 kcal" },
      { icon: "🥜", label: "Peanuts", value: "100%" },
    ],
    features: ["100% peanuts", "No salt", "No added sugar"],
    table: [
      { nutrient: "Energy", amount: "92 kcal / 386 kJ", dailyValue: "5%" },
      { nutrient: "Carbohydrates", amount: "2.4g", dailyValue: "—" },
      { nutrient: "Added Sugars", amount: "0g", dailyValue: "—" },
      { nutrient: "Protein", amount: "3.9g", dailyValue: "—" },
      { nutrient: "Total Fat", amount: "7.4g", dailyValue: "—" },
      { nutrient: "Saturated Fat", amount: "1.3g", dailyValue: "—" },
      { nutrient: "Trans Fat", amount: "0g", dailyValue: "0%" },
      { nutrient: "Dietary Fiber", amount: "1.2g", dailyValue: "—" },
      { nutrient: "Sodium", amount: "2mg", dailyValue: "—" },
    ],
  },
  {
    key: "cashew-butter",
    name: "Cashew Butter",
    category: "Nut Butters",
    servingSize: "15g (1 tablespoon)",
    servingsPerPackage: "20 servings",
    shelfLife: "10 months",
    image: "/images/products/nut-butter.svg",
    highlights: [
      { icon: "🔥", label: "Calories", value: "88 kcal" },
      { icon: "💪", label: "Protein", value: "2.7g" },
      { icon: "🌾", label: "Fiber", value: "0.5g" },
    ],
    features: ["Creamy texture", "No preservatives", "Vegan"],
    table: [
      { nutrient: "Energy", amount: "88 kcal / 370 kJ", dailyValue: "4%" },
      { nutrient: "Carbohydrates", amount: "4.5g", dailyValue: "—" },
      { nutrient: "Added Sugars", amount: "0g", dailyValue: "—" },
      { nutrient: "Protein", amount: "2.7g", dailyValue: "—" },
      { nutrient: "Total Fat", amount: "6.9g", dailyValue: "—" },
      { nutrient: "Saturated Fat", amount: "1.4g", dailyValue: "—" },
      { nutrient: "Trans Fat", amount: "0g", dailyValue: "0%" },
      { nutrient: "Dietary Fiber", amount: "0.5g", dailyValue: "—" },
      { nutrient: "Sodium", amount: "3mg", dailyValue: "—" },
    ],
  },
  // ─────────────────────────────────────────────────
  //  BAKED SNACKS — 25g serving
  // ─────────────────────────────────────────────────
  {
    key: "paprika-chickpea-chips",
    name: "Paprika Chickpea Chips",
    category: "Baked Snacks",
    servingSize: "25g (1/3 of the bag)",
    servingsPerPackage: "~3 servings",
    shelfLife: "6 months",
    image: "/images/products/snack.svg",
    highlights: [
      { icon: "🔥", label: "Calories", value: "108 kcal" },
      { icon: "💪", label: "Protein", value: "4.2g" },
      { icon: "🌾", label: "Fiber", value: "2.9g" },
    ],
    features: ["Baked, not fried", "Gluten free", "Vegan"],
    table: [
      { nutrient: "Energy", amount: "108 kcal / 454 kJ", dailyValue: "5%" },
      { nutrient: "Carbohydrates", amount: "14g", dailyValue: "—" },
      { nutrient: "Added Sugars", amount: "0g", dailyValue: "—" },
      { nutrient: "Protein", amount: "4.2g", dailyValue: "—" },
      { nutrient: "Total Fat", amount: "3.6g", dailyValue: "—" },
      { nutrient: "Saturated Fat", amount: "0.5g", dailyValue: "—" },
      { nutrient: "Trans Fat", amount: "0g", dailyValue: "0%" },
      { nutrient: "Dietary Fiber", amount: "2.9g", dailyValue: "—" },
      { nutrient: "Sodium", amount: "140mg", dailyValue: "—" },
    ],
  },
  {
    key: "herb-rice-crackers",
    name: "Herb Brown Rice Crackers",
    category: "Baked Snacks",
    servingSize: "25g (5 crackers)",
    servingsPerPackage: "4 servings",
    shelfLife: "8 months",
    image: "/images/products/snack.svg",
    highlights: [
      { icon: "🔥", label: "Calories", value: "96 kcal" },
      { icon: "🧂", label: "Sodium", value: "85mg" },
      { icon: "🌾", label: "Fiber", value: "1.1g" },
    ],
    features: ["Brown rice", "Gluten free", "Low fat"],
    table: [
      { nutrient: "Energy", amount: "96 kcal / 403 kJ", dailyValue: "5%" },
      { nutrient: "Carbohydrates", amount: "20g", dailyValue: "—" },
      { nutrient: "Added Sugars", amount: "0g", dailyValue: "—" },
      { nutrient: "Protein", amount: "2.0g", dailyValue: "—" },
      { nutrient: "Total Fat", amount: "0.8g", dailyValue: "—" },
      { nutrient: "Saturated Fat", amount: "0.2g", dailyValue: "—" },
      { nutrient: "Trans Fat", amount: "0g", dailyValue: "0%" },
      { nutrient: "Dietary Fiber", amount: "1.1g", dailyValue: "—" },
      { nutrient: "Sodium", amount: "85mg", dailyValue: "—" },
    ],
  },
  // ─────────────────────────────────────────────────
  //  TEAS & INFUSIONS — 200ml serving (1 tea bag)
  // ─────────────────────────────────────────────────
  {
    key: "green-tea-mint",
    name: "Green Tea with Mint",
    category: "Teas & Infusions",
    servingSize: "200ml (1 tea bag)",
    servingsPerPackage: "20 servings",
    shelfLife: "24 months",
    directions: "Steep 1 tea bag in 200ml of hot water for 3 minutes.",
    image: "/images/products/tea.svg",
    highlights: [
      { icon: "🔥", label: "Calories", value: "2 kcal" },
      { icon: "🌿", label: "Ingredients", value: "2" },
      { icon: "🍯", label: "Added sugar", value: "0g" },
    ],
    features: ["No sugar", "No artificial flavors"],
    table: [
      { nutrient: "Energy", amount: "2 kcal / 8 kJ", dailyValue: "0%" },
      { nutrient: "Carbohydrates", amount: "0.4g", dailyValue: "—" },
      { nutrient: "Added Sugars", amount: "0g", dailyValue: "—" },
      { nutrient: "Protein", amount: "0g", dailyValue: "—" },
      { nutrient: "Total Fat", amount: "0g", dailyValue: "—" },
      { nutrient: "Saturated Fat", amount: "0g", dailyValue: "—" },
      { nutrient: "Trans Fat", amount: "0g", dailyValue: "0%" },
      { nutrient: "Dietary Fiber", amount: "0g", dailyValue: "—" },
      { nutrient: "Sodium", amount: "1mg", dailyValue: "—" },
    ],
  },
  // ─────────────────────────────────────────────────
  //  CEREAL BARS — 25g serving (1 bar)
  // ─────────────────────────────────────────────────
  {
    key: "banana-oat-bar",
    name: "Banana Oat Cereal Bar",
    category: "Cereal Bars",
    servingSize: "25g (1 bar)",
    servingsPerPackage: "12 bars per box",
    shelfLife: "9 months",
    image: "/images/products/bar.svg",
    highlights: [
      { icon: "🔥", label: "Calories", value: "98 kcal" },
      { icon: "🌾", label: "Fiber", value: "1.8g" },
      { icon: "🍌", label: "Fruit", value: "Banana" },
    ],
    features: ["With fruit pieces", "Source of fiber"],
    table: [
      { nutrient: "Energy", amount: "98 kcal / 412 kJ", dailyValue: "5%" },
      { nutrient: "Carbohydrates", amount: "17g", dailyValue: "—" },
      { nutrient: "Added Sugars", amount: "4.1g", dailyValue: "—" },
      { nutrient: "Protein", amount: "1.6g", dailyValue: "—" },
      { nutrient: "Total Fat", amount: "2.6g", dailyValue: "—" },
      { nutrient: "Saturated Fat", amount: "0.6g", dailyValue: "—" },
      { nutrient: "Trans Fat", amount: "0g", dailyValue: "0%" },
      { nutrient: "Dietary Fiber", amount: "1.8g", dailyValue: "—" },
      { nutrient: "Sodium", amount: "18mg", dailyValue: "—" },
    ],
  },
  {
    key: "nut-honey-bar",
    name: "Nut & Honey Cereal Bar",
    category: "Cereal Bars",
    servingSize: "25g (1 bar)",
    servingsPerPackage: "12 bars per box",
    shelfLife: "9 months",
    image: "/images/products/bar.svg",
    highlights: [
      { icon: "🔥", label: "Calories", value: "112 kcal" },
      { icon: "💪", label: "Protein", value: "2.3g" },
      { icon: "🌾", label: "Fiber", value: "1.5g" },
    ],
    features: ["With nuts", "Sweetened with honey"],
    table: [
      { nutrient: "Energy", amount: "112 kcal / 470 kJ", dailyValue: "6%" },
      { nutrient: "Carbohydrates", amount: "15g", dailyValue: "—" },
      { nutrient: "Added Sugars", amount: "4.8g", dailyValue: "—" },
      { nutrient: "Protein", amount: "2.3g", dailyValue: "—" },
      { nutrient: "Total Fat", amount: "4.6g", dailyValue: "—" },
      { nutrient: "Saturated Fat", amount: "0.8g", dailyValue: "—" },
      { nutrient: "Trans Fat", amount: "0g", dailyValue: "0%" },
      { nutrient: "Dietary Fiber", amount: "1.5g", dailyValue: "—" },
      { nutrient: "Sodium", amount: "22mg", dailyValue: "—" },
    ],
  },
]

// ─────────────────────────────────────────────────────────
//  LOOKUP MAP: key → NutritionInfo
// ─────────────────────────────────────────────────────────
export const nutritionMap = Object.fromEntries(
  nutritionData.map((n) => [n.key, n])
) as Record<string, NutritionInfo>

// Unique list of categories
export const nutritionCategories = Array.from(
  new Set(nutritionData.map((n) => n.category))
)
