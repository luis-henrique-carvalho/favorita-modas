# TECHNICAL.md

Detalhes técnicos do projeto Favorita Modas. Este documento concentra informações que não precisam ficar carregadas automaticamente no `AGENTS.md`.

## Stack

- Next.js Fullstack
- App Router
- Server Actions
- Better Auth
- PostgreSQL
- Drizzle ORM
- Cloudinary
- Tailwind CSS
- shadcn/ui
- TypeScript
- Vitest
- Testing Library
- Playwright

## Entidades Principais

### Product

Representa uma peça da loja.

```ts
Product {
  id
  name
  slug
  description
  price
  status
  isAvailable
  categoryId
  createdAt
  updatedAt
}
```

Status:

```ts
AVAILABLE;
UNAVAILABLE;
COMING_SOON;
PRE_ORDER;
```

### ProductImage

Imagens das peças armazenadas no Cloudinary.

```ts
ProductImage {
  id
  productId
  url
  publicId
  alt
  position
  createdAt
}
```

### Category

Categorias do catálogo.

```ts
Category {
  id
  name
  slug
  createdAt
  updatedAt
}
```

### ProductVariant

Combinações de tamanho, cor e disponibilidade.

```ts
ProductVariant {
  id
  productId
  size
  color
  stockQuantity
  isAvailable
  createdAt
  updatedAt
}
```

### Lead

Interesse do cliente em uma peça.

```ts
Lead {
  id
  productId
  productVariantId
  name
  whatsapp
  selectedSize
  selectedColor
  message
  status
  createdAt
  updatedAt
}
```

Status:

```ts
NEW;
CONTACTED;
CONVERTED;
LOST;
```

### User

Usuário administrativo da loja, gerenciado pelo Better Auth.

```ts
User {
  id
  name
  email
  role
  createdAt
  updatedAt
}
```

Roles:

```ts
ADMIN;
MANAGER;
```

## Rotas

### Públicas

- `/`: home com apresentação curta, produtos em destaque, categorias, CTA WhatsApp e link para catálogo.
- `/catalogo`: lista de produtos com filtro por categoria, busca e disponibilidade.
- `/produtos/[slug]`: galeria, preço, descrição, seleção de tamanho/cor, CTA WhatsApp ou formulário de interesse.

### Admin

Base: `/admin`

Deve ser protegida por Better Auth.

Funcionalidades principais:

- listar, criar, editar e remover produtos;
- gerenciar imagens;
- gerenciar categorias;
- controlar disponibilidade;
- visualizar leads/interesses;
- marcar lead como contactado ou convertido.

## MVP Prioritário

A primeira versão deve conter apenas:

- catálogo público;
- página de produto;
- redirecionamento para WhatsApp;
- formulário de interesse;
- painel admin;
- cadastro de produtos;
- upload de imagens;
- controle de disponibilidade;
- lista de interessados.

Não implemente no MVP:

- checkout online;
- pagamento;
- carrinho completo;
- cálculo de frete;
- login para clientes;
- cupons;
- marketplace;
- múltiplas lojas.

## Server Actions

Use Server Actions para mutações.

Actions esperadas:

```ts
createProductAction;
updateProductAction;
deleteProductAction;
createLeadAction;
updateLeadStatusAction;
uploadProductImageAction;
deleteProductImageAction;
```

Regras:

- validar dados com Zod;
- verificar autenticação quando necessário;
- retornar mensagens de erro claras;
- evitar lógica de negócio dentro de componentes React.

## Validação

Use Zod para entradas de usuário.

Exemplo:

```ts
const createLeadSchema = z.object({
  productId: z.string(),
  productVariantId: z.string().optional(),
  name: z.string().min(2),
  whatsapp: z.string().min(10),
  selectedSize: z.string().optional(),
  selectedColor: z.string().optional(),
});
```

## Banco de Dados

- Use PostgreSQL com Drizzle ORM.
- Não misture Prisma e Drizzle.
- Use migrations para alterações estruturais.
- Nunca rode testes automatizados contra dados reais da loja.

## Cloudinary

Regras para imagens de produto:

- salvar `url` e `publicId` no banco;
- otimizar imagens para web;
- permitir múltiplas imagens por produto;
- usar `position` para definir imagem principal/ordem;
- remover imagem do Cloudinary ao deletar do sistema.

Variáveis esperadas:

```env
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

## WhatsApp

Crie/utilize uma função utilitária:

```ts
generateWhatsAppLink({
  phone,
  productName,
  size,
  color,
  quantity,
  customerName,
});
```

A URL deve seguir:

```txt
https://wa.me/55XXXXXXXXXXX?text=...
```

A mensagem deve ser codificada com `encodeURIComponent`.

Exemplo de mensagem:

```txt
Olá! Tenho interesse nesta peça:

Produto: Vestido Floral Midi
Cor: Azul
Tamanho: M
Quantidade: 1

Meu nome é Ana.
Gostaria de saber mais sobre pagamento e entrega.
```

Variável esperada:

```env
STORE_WHATSAPP_NUMBER="5575999999999"
```

## Testes

Para fluxo TDD, gates de lint/formatação/tipos e validação final, consulte [QUALITY.md](QUALITY.md).

Use uma estratégia pragmática, proporcional ao MVP e focada nos fluxos que geram venda.

### Unitários - Vitest

Teste lógica isolada:

- geração de link do WhatsApp;
- formatação de preço;
- validação de telefone;
- schemas Zod;
- helpers do Cloudinary;
- regras de disponibilidade.

### Integração - Vitest + Banco de Teste

Teste:

- Server Actions;
- criação de produto;
- criação de lead;
- atualização de disponibilidade;
- listagem de interessados;
- permissões de admin.

### E2E - Playwright

Use apenas para fluxos críticos:

- cliente abre catálogo;
- cliente escolhe produto;
- cliente seleciona tamanho/cor;
- cliente clica no WhatsApp;
- produto indisponível mostra captação de interesse;
- cliente entra na lista de interesse;
- admin faz login;
- admin cadastra produto;
- admin altera disponibilidade.

Testes mínimos para o MVP:

```txt
[ ] generateWhatsAppLink gera URL correta
[ ] createLeadAction salva interesse
[ ] produto disponível mostra CTA WhatsApp
[ ] produto indisponível mostra formulário de interesse
[ ] admin consegue criar produto
[ ] admin consegue alterar disponibilidade
```

## Estrutura Recomendada

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

## Segurança

- Proteger todas as rotas `/admin`.
- Validar permissões no servidor.
- Nunca confiar apenas em validação client-side.
- Sanitizar entradas.
- Validar uploads.
- Não expor variáveis de ambiente privadas no client.

## Variáveis de Ambiente

Exemplo:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/catalogo"

BETTER_AUTH_SECRET=""
BETTER_AUTH_URL="http://localhost:3000"

CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

STORE_WHATSAPP_NUMBER="5575999999999"
```

## Regras de Desenvolvimento

1. Use TypeScript.
2. Use componentes pequenos e reutilizáveis.
3. Prefira Server Components quando possível.
4. Use Client Components apenas quando houver interatividade.
5. Use Server Actions para mutações.
6. Valide entradas com Zod.
7. Separe lógica de negócio da camada visual.
8. Não crie abstrações desnecessárias.
9. Mantenha o MVP simples.
10. Priorize clareza e manutenção.
