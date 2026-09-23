export function Features() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-center text-card-foreground mb-8">Nossos Diferenciais</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌱</span>
              </div>
              <p className="text-sm text-muted-foreground">Ingredientes Naturais</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🚫</span>
              </div>
              <p className="text-sm text-muted-foreground">Sem Conservantes</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌾</span>
              </div>
              <p className="text-sm text-muted-foreground">Fonte de Fibras</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📦</span>
              </div>
              <p className="text-sm text-muted-foreground">Venda no Atacado</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-accent/10 to-accent/20 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🥣</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Granolas</h3>
            <p className="text-sm text-muted-foreground">Para o café da manhã</p>
          </div>

          <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🍿</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Snacks</h3>
            <p className="text-sm text-muted-foreground">Assados e crocantes</p>
          </div>

          <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎁</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Mini Packs</h3>
            <p className="text-sm text-muted-foreground">Degustação perfeita</p>
          </div>
        </div>
      </div>
    </section>
  )
}
