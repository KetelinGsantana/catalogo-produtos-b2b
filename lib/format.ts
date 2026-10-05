const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })

/** Formats a number as US dollars, e.g. 24.9 → "$24.90" */
export function formatCurrency(value: number) {
  return currency.format(value)
}

/** Formats a YYYY-MM-DD date as "Mar 12, 2027" without timezone shifts */
export function formatDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number)
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
}
