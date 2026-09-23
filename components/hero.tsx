import { BRAND } from "@/lib/brand"

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-slate-100 to-slate-200 py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-accent font-bold text-3xl">AN</span>
        </div>

        <h1 className="text-5xl font-bold text-foreground mb-4">{BRAND.name.toUpperCase()}</h1>

        <p className="text-xl text-muted-foreground mb-12">Catálogo Atacado - Interativo</p>
      </div>
    </section>
  )
}
