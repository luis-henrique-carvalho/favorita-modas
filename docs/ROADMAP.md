# ROADMAP.md

> Guia de desenvolvimento técnico. Para convenções, entidades e regras do projeto, consulte o [TECHNICAL.md](TECHNICAL.md).

# Favorita Modas — Roadmap do Projeto

## Visão Geral

Favorita Modas será um catálogo online mobile-first focado em conversão via WhatsApp.

O sistema NÃO será um ecommerce tradicional.

O objetivo principal é:

- exibir produtos;
- gerar interesse;
- capturar leads;
- converter usuários vindos do Instagram em conversas no WhatsApp.

Stack principal:

- Next.js Fullstack
- App Router
- Server Actions
- Better Auth
- PostgreSQL
- Drizzle ORM
- Tailwind CSS
- shadcn/ui
- Cloudinary

---

# FASE 1 — Setup Inicial do Projeto

## Objetivo

Criar toda a fundação técnica do sistema.

---

## 1. Criar projeto Next.js

### Tasks

- [x] Criar projeto com App Router
- [x] Configurar TypeScript
- [x] Configurar ESLint
- [x] Configurar Tailwind
- [x] Configurar alias `@/*`

---

## 2. Instalar dependências

### UI

- [x] shadcn/ui
- [x] lucide-react
- [x] sonner
- [x] next-themes

### Backend

- [x] drizzle-orm
- [x] postgres
- [x] drizzle-kit
- [x] zod

### Forms

- [x] react-hook-form
- [x] @hookform/resolvers

### Upload

- [ ] cloudinary

### Auth

- [x] better-auth

---

## 3. Estruturar pastas

> Estrutura definida no [TECHNICAL.md](TECHNICAL.md#estrutura-recomendada).

### Estrutura

```txt
src/
  app/
    (public)/
      page.tsx
      catalogo/
        page.tsx
      produtos/
        [slug]/
          page.tsx
    admin/
      layout.tsx
      page.tsx
      produtos/
        page.tsx
        novo/
          page.tsx
        [id]/
          editar/
            page.tsx
      categorias/
        page.tsx
      interesses/
        page.tsx
    api/
      auth/
        [...all]/
          route.ts
  components/
    ui/
    public/
      product-card.tsx
      product-grid.tsx
      whatsapp-button.tsx
      lead-form.tsx
    admin/
      product-form.tsx
      category-form.tsx
      lead-table.tsx
  server/
    actions/
      products/
        create-product.ts
        update-product.ts
        delete-product.ts
      categories/
        create-category.ts
        update-category.ts
        delete-category.ts
      leads/
        create-lead.ts
        update-lead-status.ts
      uploads/
        upload-product-image.ts
        delete-product-image.ts
    db/
      index.ts
      schema/
        product.ts
        category.ts
        lead.ts
        user.ts
    auth/
      auth.ts
  lib/
    utils.ts
    whatsapp.ts
    cloudinary.ts
    validations/
      product-schema.ts
      lead-schema.ts
      category-schema.ts
  types/
    index.ts
```

### Tasks

- [ ] Criar estrutura `/components/ui`, `/components/public`, `/components/admin`
- [ ] Criar estrutura `/server/actions/products`, `/categories`, `/leads`, `/uploads`
- [x] Criar estrutura `/server/db/schema/`
- [ ] Criar estrutura `/lib/validations/`
- [ ] Criar estrutura `/app/(public)`
- [ ] Criar estrutura `/app/admin`

---

# FASE 2 — Design System

## Objetivo

Criar identidade visual consistente da marca.

---

## 1. Configurar Tailwind Theme

### Tasks

- [ ] Adicionar paleta Favorita Modas
- [ ] Configurar tokens semânticos
- [ ] Configurar sombras
- [ ] Configurar border radius
- [ ] Configurar spacing scale

---

## 2. Configurar fontes

### Tasks

- [ ] Instalar Playfair Display
- [ ] Instalar Be Vietnam Pro
- [ ] Configurar typography scale
- [ ] Configurar headings
- [ ] Configurar body text

---

## 3. Criar Design Tokens

### Tasks

- [ ] Definir cores principais
- [ ] Definir cores secundárias
- [ ] Definir estados
- [ ] Definir gradients
- [ ] Definir glassmorphism leve

---

## 4. Criar componentes base

### Tasks

- [ ] Button
- [ ] Product Card
- [ ] Badge
- [ ] Input
- [ ] Select
- [ ] Dialog
- [ ] Drawer
- [ ] Sheet
- [ ] WhatsApp Button
- [ ] Skeleton
- [ ] Toast

---

# FASE 3 — Estrutura Pública

## Objetivo

Criar toda experiência do cliente.

---

# HOME PAGE

## Tasks

- [ ] Criar navbar mobile-first
- [ ] Criar hero moderno
- [ ] Criar categorias
- [ ] Criar destaque de produtos
- [ ] Criar seção novidades
- [ ] Criar CTA WhatsApp
- [ ] Criar botão flutuante WhatsApp
- [ ] Criar footer

---

# CATÁLOGO

## Tasks

- [ ] Criar grid responsivo
- [ ] Criar filtros
- [ ] Criar busca
- [ ] Criar badges de disponibilidade
- [ ] Criar paginação ou infinite scroll
- [ ] Criar skeleton loading

---

# PÁGINA DE PRODUTO

## Tasks

- [ ] Criar galeria de imagens
- [ ] Criar seleção de tamanho
- [ ] Criar seleção de cor
- [ ] Criar status de disponibilidade
- [ ] Criar CTA WhatsApp
- [ ] Criar formulário de interesse
- [ ] Criar preview da mensagem WhatsApp

---

# FLUXO WHATSAPP

## Tasks

- [ ] Criar util de geração de link
- [ ] Criar mensagem dinâmica
- [ ] Adicionar encodeURIComponent
- [ ] Adicionar tracking futuro

---

# FASE 4 — Banco de Dados

## Objetivo

Modelar estrutura principal da aplicação.

---

## 1. Configurar PostgreSQL

### Tasks

- [x] Criar banco local
- [x] Configurar `.env`
- [x] Configurar conexão

---

## 2. Configurar Drizzle

### Tasks

- [x] Criar schema
- [x] Configurar migrations
- [x] Configurar drizzle.config.ts
- [x] Rodar primeira migration

---

## 3. Criar entidades

### Tasks

- [x] Product
- [x] ProductImage
- [x] ProductVariant
- [x] Category
- [x] Lead
- [x] User

---

## 4. Seeds

### Tasks

- [ ] Criar categorias mockadas
- [ ] Criar produtos mockados
- [ ] Criar variantes mockadas

---

# FASE 5 — Cloudinary

## Objetivo

Criar fluxo completo de upload.

---

## Tasks

- [ ] Configurar Cloudinary
- [ ] Criar upload helper
- [ ] Criar remoção de imagens
- [ ] Criar compressão
- [ ] Criar preview de upload
- [ ] Criar drag and drop

---

# FASE 6 — Server Actions

## Objetivo

Criar backend da aplicação.

---

# PRODUCTS

## Tasks

- [ ] createProductAction
- [ ] updateProductAction
- [ ] deleteProductAction
- [ ] getProductsAction
- [ ] getProductBySlugAction

---

# CATEGORIES

## Tasks

- [ ] createCategoryAction
- [ ] updateCategoryAction
- [ ] deleteCategoryAction

---

# LEADS

## Tasks

- [ ] createLeadAction
- [ ] getLeadsAction
- [ ] updateLeadStatusAction

---

# UPLOADS

## Tasks

- [ ] uploadImageAction
- [ ] deleteImageAction

---

# FASE 7 — Better Auth

## Objetivo

Criar autenticação do admin.

---

## Tasks

- [x] Configurar Better Auth
- [ ] Criar login admin
- [ ] Criar middleware
- [ ] Proteger rotas admin
- [ ] Criar logout
- [ ] Criar session provider

---

# FASE 8 — Dashboard Admin

## Objetivo

Criar painel administrativo simples.

---

# DASHBOARD

## Tasks

- [ ] Criar layout admin
- [ ] Criar sidebar
- [ ] Criar navbar admin
- [ ] Criar dashboard inicial

---

# PRODUTOS

## Tasks

- [ ] Listagem
- [ ] Criação
- [ ] Edição
- [ ] Exclusão
- [ ] Upload imagens
- [ ] Controle estoque

---

# CATEGORIAS

## Tasks

- [ ] CRUD categorias

---

# INTERESSADOS

## Tasks

- [ ] Listar leads
- [ ] Filtrar leads
- [ ] Abrir WhatsApp rapidamente
- [ ] Marcar como contactado
- [ ] Marcar como convertido

---

# FASE 9 — UX Mobile

## Objetivo

Refinar experiência mobile-first.

---

## Tasks

- [ ] Melhorar touch targets
- [ ] Melhorar bottom navigation
- [ ] Melhorar scrolling
- [ ] Melhorar drawers
- [ ] Melhorar sheets
- [ ] Melhorar responsividade
- [ ] Melhorar carregamento

---

# FASE 10 — Performance

## Objetivo

Deixar aplicação extremamente rápida.

---

## Tasks

- [ ] Otimizar imagens
- [ ] Configurar lazy loading
- [ ] Configurar cache
- [ ] Otimizar Server Components
- [ ] Reduzir Client Components
- [ ] Melhorar Lighthouse
- [ ] Melhorar SEO

---

# FASE 11 — Analytics

## Objetivo

Entender comportamento dos usuários.

---

## Tasks

- [ ] Google Analytics
- [ ] Eventos WhatsApp
- [ ] Tracking produtos
- [ ] Tracking conversão
- [ ] Heatmaps futuros

---

# FASE 12 — Deploy

## Objetivo

Publicar aplicação.

---

## Tasks

- [ ] Configurar Vercel
- [ ] Configurar variáveis ambiente
- [ ] Configurar domínio
- [ ] Configurar PostgreSQL produção
- [ ] Configurar Cloudinary produção

---

# FASE 13 — Pós MVP

## Objetivo

Melhorias futuras.

---

# Features Futuras

## Lista de espera inteligente

- [ ] Notificação automática
- [ ] Aviso reposição

---

## Social Commerce

- [ ] Compartilhar produto
- [ ] Links Instagram
- [ ] Deep links WhatsApp

---

## IA

- [ ] Recomendar produtos
- [ ] Classificar tendências
- [ ] Descrever produtos automaticamente

---

## Marketing

- [ ] Banner sazonal
- [ ] Campanhas
- [ ] Cupons futuros

---

# Checklist Técnico Final

## Frontend

- [ ] Mobile-first
- [ ] shadcn/ui
- [ ] Tailwind
- [ ] Responsivo
- [ ] Performance

---

## Backend

- [ ] Server Actions
- [ ] Validação Zod
- [ ] Segurança
- [ ] Auth
- [ ] Uploads

---

## Banco

- [ ] PostgreSQL
- [ ] Drizzle
- [ ] Migrations
- [ ] Seeds

---

## Conversão

- [ ] WhatsApp CTA
- [ ] Interesse produto
- [ ] Catálogo rápido
- [ ] UX Instagram-first

---

# Meta Principal do Projeto

Criar uma experiência moderna de catálogo fashion mobile-first com foco em:

- conversão via WhatsApp;
- estética premium;
- simplicidade;
- velocidade;
- facilidade de uso para a loja.

O projeto deve parecer:

- boutique premium;
- social commerce moderno;
- experiência elegante e rápida;
- mistura entre Instagram + catálogo inteligente + SaaS moderno.
