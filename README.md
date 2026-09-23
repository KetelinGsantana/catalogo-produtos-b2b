# Catálogo de Produtos com Controle de Validade

Aplicação web para gestão de catálogo de produtos com foco em rastreamento de datas de validade. Desenvolvida para times de operações e logística que precisam monitorar estoque por prazo de vencimento.

> **Dados fictícios.** A marca "Aurora Naturais", os produtos, preços, EANs, validades,
> tabelas nutricionais e ilustrações são inventados para demonstração e não representam
> nenhuma empresa real. O nome da marca fica em `lib/brand.ts`.

## Funcionalidades

- Listagem de produtos com status de disponibilidade
- Filtros por categoria e status (disponível / esgotado)
- Busca por nome do produto
- Ordenação por qualquer coluna (nome, categoria, validade, preço)
- Indicação visual de produtos próximos ao vencimento
- Layout responsivo com cards para mobile e tabela para desktop
- Catálogo público separado para visualização sem autenticação

## Tecnologias

- [Next.js 16](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [shadcn/ui](https://ui.shadcn.com/) (Radix UI + Tailwind CSS)

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Estrutura

```
app/           # Rotas (Next.js App Router)
components/    # Componentes React (catálogo, filtros, cards)
data/          # Dados dos produtos e informações nutricionais
lib/           # Utilitários e marca fictícia (brand.ts)
public/        # Ilustrações (SVG) e logo fictício
```
