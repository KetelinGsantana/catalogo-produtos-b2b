import { Button } from "@/components/ui/button"
import { BRAND } from "@/lib/brand"

export function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-lg">AN</span>
            </div>
            <span className="font-semibold text-foreground">{BRAND.name}</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              🏠 Home
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              🥣 Granolas
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              🍿 Snacks
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              🎁 Mini Packs
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              📊 Comparativo
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              📞 Contato
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
