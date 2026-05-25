````md
# AGENT.md

## Documentação do Projeto

| Documento                     | Descrição                                                           |
| ----------------------------- | ------------------------------------------------------------------- |
| [PRD.md](docs/PRD.md)         | Requisitos do produto, fluxo do usuário e especificações funcionais |
| [ROADMAP.md](docs/ROADMAP.md) | Fases de desenvolvimento, tasks e progresso                         |
| [DESIGN.md](docs/DESIGN.md)   | Sistema de design, paleta de cores e tipografia                     |

---

## Contexto do Projeto

Este projeto é um catálogo online para uma loja pequena, com foco em vendas e atendimento via WhatsApp.

O objetivo principal não é criar um e-commerce completo com checkout, mas sim um catálogo rápido, bonito e mobile-first, onde clientes vindos do Instagram possam:

- visualizar peças;
- escolher tamanho e cor;
- demonstrar interesse;
- deixar nome e WhatsApp;
- ser redirecionados para o WhatsApp com uma mensagem pronta;
- entrar em lista de interesse quando a peça estiver indisponível.

O sistema deve priorizar simplicidade, velocidade, boa experiência mobile e facilidade de manutenção.

---

## Stack Principal

Use esta stack como base do projeto:

- Next.js Fullstack
- App Router
- Server Actions
- Better Auth
- PostgreSQL
- Prisma ou Drizzle
- Cloudinary para upload de imagens
- Tailwind CSS
- shadcn/ui
- TypeScript

---

## Objetivo do Produto

Criar um catálogo comercial inteligente para WhatsApp.

Este projeto deve funcionar como:

- catálogo online;
- captação de leads;
- lista de interesse;
- pré-venda;
- painel administrativo simples para a loja.

Evite transformar o projeto em um marketplace ou e-commerce complexo.

---

## Princípios do Projeto

### 1. Mobile First

A maior parte dos usuários virá do Instagram e WhatsApp.

Priorize:

- carregamento rápido;
- layout responsivo;
- botões grandes;
- navegação simples;
- poucos campos nos formulários;
- experiência fluida em celular.

---

### 2. WhatsApp como canal principal

O WhatsApp é parte central da conversão.

Sempre que o cliente demonstrar interesse em uma peça disponível, o sistema deve gerar uma mensagem automática com os dados selecionados.

Exemplo:

```txt
Olá! Tenho interesse nesta peça:

Produto: Vestido Floral Midi
Cor: Azul
Tamanho: M
Quantidade: 1

Meu nome é Ana.
Gostaria de saber mais sobre pagamento e entrega.
```
````

---

### 3. Indisponibilidade gera lead

Quando um produto estiver indisponível, o usuário não deve simplesmente sair da página.

Em vez disso, deve existir uma ação como:

- “Quero ser avisado”
- “Tenho interesse”
- “Entrar na lista de espera”

O sistema deve salvar:

- nome;
- WhatsApp;
- produto;
- tamanho desejado;
- cor desejada;
- data do interesse.

---

## Entidades Principais

### Product

Representa uma peça da loja.

Campos recomendados:

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

Status possíveis:

```ts
AVAILABLE;
UNAVAILABLE;
COMING_SOON;
PRE_ORDER;
```

---

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

---

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

---

### ProductVariant

Representa combinações de tamanho, cor e disponibilidade.

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

---

### Lead

Representa um interesse do cliente.

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

Status possíveis:

```ts
NEW;
CONTACTED;
CONVERTED;
LOST;
```

---

### User

Usuário administrativo da loja.

Gerenciado pelo Better Auth.

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

---

## Páginas Públicas

### Home

Rota:

```txt
/
```

Deve conter:

- apresentação curta da loja;
- produtos em destaque;
- categorias;
- botão para WhatsApp;
- link para catálogo completo.

---

### Catálogo

Rota:

```txt
/catalogo
```

Deve conter:

- lista de produtos;
- filtro por categoria;
- busca por nome;
- filtro por disponibilidade;
- cards otimizados para mobile.

---

### Página do Produto

Rota:

```txt
/produtos/[slug]
```

Deve conter:

- galeria de imagens;
- nome;
- preço;
- descrição;
- status de disponibilidade;
- seleção de tamanho;
- seleção de cor;
- botão de WhatsApp se disponível;
- botão de interesse se indisponível.

---

## Painel Administrativo

Rota base:

```txt
/admin
```

O painel deve ser protegido por autenticação usando Better Auth.

Funcionalidades principais:

- listar produtos;
- criar produto;
- editar produto;
- remover produto;
- gerenciar imagens;
- gerenciar categorias;
- controlar disponibilidade;
- visualizar leads/interesses;
- marcar lead como contactado ou convertido.

---

## Server Actions

Use Server Actions para operações de mutação.

Exemplos:

```ts
createProductAction;
updateProductAction;
deleteProductAction;
createLeadAction;
updateLeadStatusAction;
uploadProductImageAction;
deleteProductImageAction;
```

As Server Actions devem:

- validar dados com Zod;
- verificar autenticação quando necessário;
- retornar mensagens de erro claras;
- evitar lógica de negócio dentro dos componentes React.

---

## Validação

Use Zod para validar dados de entrada.

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

---

## Banco de Dados

Use PostgreSQL.

Pode usar Prisma ou Drizzle, mas mantenha consistência no projeto.

Preferência:

- Prisma se quiser velocidade e simplicidade;
- Drizzle se quiser mais controle SQL e tipagem próxima do banco.

Não misture Prisma e Drizzle no mesmo projeto.

---

## Upload de Imagens

Use Cloudinary para imagens dos produtos.

Regras:

- salvar `url` e `publicId` no banco;
- otimizar imagens para web;
- permitir múltiplas imagens por produto;
- permitir imagem principal por ordenação;
- remover imagem do Cloudinary ao deletar do sistema.

---

## Geração de Link para WhatsApp

Criar uma função utilitária:

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

A função deve gerar uma URL no formato:

```txt
https://wa.me/55XXXXXXXXXXX?text=...
```

A mensagem deve ser codificada com `encodeURIComponent`.

---

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

---

## Regras de UI

Use Tailwind CSS e shadcn/ui.

A interface deve ser:

- limpa;
- moderna;
- feminina/elegante se combinar com a identidade da loja;
- rápida;
- simples;
- com foco em conversão.

Componentes recomendados:

- Button
- Card
- Input
- Select
- Dialog
- Badge
- Table
- Dropdown Menu
- Sheet
- Toast

---

## Experiência do Cliente

Evite exigir cadastro do cliente.

O cliente só deve informar:

- nome;
- WhatsApp;
- tamanho/cor, se necessário.

Não crie login para cliente final no MVP.

---

## Experiência da Loja

O painel administrativo deve ser simples o suficiente para uma pessoa não técnica usar.

Evite telas complexas.

Priorize:

- botão claro para adicionar produto;
- status visível;
- edição rápida;
- lista de interessados fácil de entender;
- botão para abrir conversa no WhatsApp.

---

## Segurança

- Proteger todas as rotas `/admin`;
- Validar permissões no servidor;
- Nunca confiar apenas em validação client-side;
- Sanitizar entradas;
- Validar uploads;
- Não expor variáveis de ambiente no client.

---

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

---

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

---

## Regras para Desenvolvimento com IA

Ao gerar código para este projeto:

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

---

## Tomada de Decisão

Sempre que houver dúvida entre simplicidade e complexidade, escolha simplicidade.

Este projeto é para uma loja pequena, com foco em venda por WhatsApp.

O sucesso do projeto será medido por:

- facilidade para encontrar peças;
- quantidade de interessados;
- cliques no WhatsApp;
- facilidade da loja em atualizar produtos;
- velocidade em dispositivos móveis.

---

## Direção Técnica Final

Construa o sistema como um catálogo online de alta conversão, não como um e-commerce tradicional.

A arquitetura deve ser simples, fullstack com Next.js, usando Server Actions para mutações, Better Auth para proteger o admin, PostgreSQL como banco principal e Cloudinary para imagens.

O foco é gerar conversas no WhatsApp e transformar interesse em venda.
