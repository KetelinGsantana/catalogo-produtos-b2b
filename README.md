# B2B Wholesale Ordering Catalog

An online catalog where wholesale customers browse products and build their orders. It replaces the huge Excel spreadsheet that usually goes back and forth between supplier and retailer: instead of scrolling row by row, the customer filters, searches, sees everything needed to buy, and exports a ready-made order.

For each product, the wholesale customer sees:

- **Wholesale price** and **suggested retail price**, with the **markup** already calculated
- **Expiration date** of the current batch and **months left** until it expires
- **EAN** (barcode) and **NCM** (Mercosur tax code), for registering the product in the store's system
- **Availability** (available / out of stock) and labels such as sale and new

> **About the sample data:** the "Aurora Naturals" brand, products, prices, EANs, expiration
> dates, nutrition facts and illustrations in this repository are fictional and used only to
> demonstrate the catalog. To use real products, edit `data/products.ts`, `data/nutrition.ts`
> and the brand name in `lib/brand.ts`.

## Features

- Order building: the customer enters a quantity for each item and sees the running total
- Order export to CSV or PDF to send to the supplier
- Product search by name and filters by category and availability
- Column sorting (product, category, size, prices, markup, expiration, EAN, NCM, status)
- Detail columns (expiration, EAN, NCM) that can be shown or hidden
- Responsive layout: a table on desktop and cards on mobile
- Visual catalog with a nutrition table for each product (`PublicCatalog` component)

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [shadcn/ui](https://ui.shadcn.com/) (Radix UI + Tailwind CSS)

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/           # Routes (Next.js App Router)
components/    # React components (order table, filters, cards, visual catalog)
data/          # Products (prices, expiration, EAN, NCM) and nutrition facts
lib/           # Utilities, formatting and brand name/logo (brand.ts)
public/        # Illustrations (SVG) and logo
```
