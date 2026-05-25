# PRD: Favorita Modas - Boutique Digital Premium

## 1. Visão Geral do Projeto

A **Favorita Modas** é uma boutique de moda feminina com forte presença no Instagram e WhatsApp. O objetivo deste projeto é transformar a experiência de compra informal em uma jornada digital sofisticada, mobile-first, que combina a estética de uma boutique premium com a eficiência de um catálogo moderno.

**Objetivo Principal:** Maximizar a conversão para vendas via WhatsApp e captação de leads para peças sob encomenda ou esgotadas.

---

## 2. Público-Alvo

- **Perfil:** Mulheres que buscam exclusividade, elegância e praticidade.
- **Origem:** Usuárias vindas principalmente de links na bio do Instagram e anúncios em Stories.
- **Comportamento:** Preferem atendimento personalizado via chat em vez de checkouts automatizados complexos.

---

## 3. Identidade Visual (Premium Boutique Identity)

A marca comunica luxo acessível, feminilidade e modernidade.

### 3.1 Paleta de Cores

- **Violeta Peruana (#A46B8E):** Cor principal da marca, usada em CTAs e elementos de destaque.
- **Vinho Suave (#6B3D58):** Tons profundos para contraste e sofisticação.
- **Rosé Claro (#E6C9D0) & Rosa Suave (#F3E6EA):** Cores de fundo e superfícies secundárias.
- **Off-White (#FAF7F6):** Superfície principal para garantir leveza e respiro.

### 3.2 Tipografia

- **Títulos:** _Playfair Display_ (Serifada, clássica, elegante).
- **Corpo:** _Poppins_ ou sans-serif clean (Moderna, legível, funcional).

### 3.3 Atributos de Design

- Bordas arredondadas (estilo shadcn/ui).
- Sombras suaves e profundidade sutil.
- Uso generoso de espaços em branco (layout respirável).
- Imagens grandes e de alta qualidade.

---

## 4. Requisitos Funcionais (MVP)

### 4.1 Home Page

- **Hero Section:** Impacto visual imediato com foco em conversão.
- **Categorias Rápidas:** Acesso facilitado a Vestidos, Conjuntos, Acessórios, etc.
- **Destaques:** Exibição dos produtos mais desejados com badges de status.

### 4.2 Catálogo de Produtos

- Grid responsivo otimizado para scroll infinito.
- Filtros simplificados por categoria.
- Badges dinâmicos: "Novo", "Premium", "Últimas Peças", "Esgotado".

### 4.3 Detalhes do Produto

- Galeria de imagens com zoom sutil.
- Seleção de Atributos: Tamanho (P, M, G) e Cor.
- **CTA WhatsApp:** Inicia o fluxo de compra personalizado.
- Seção "Combine Com": Cross-selling de acessórios e peças complementares.

### 4.4 Fluxo de Conversão (WhatsApp)

- Resumo da escolha (foto, nome, tamanho, preço).
- Botão "Iniciar Conversa Agora" que abre o app com mensagem pré-configurada.

### 4.5 Lista de Espera VIP

- Formulário simplificado para captar interesse em produtos indisponíveis.
- Campos: Nome e WhatsApp.

### 4.6 Painel Administrativo (Backoffice)

- Dashboard de métricas (cliques no WA, interessados na lista).
- Gestão de estoque e disponibilidade.
- Cadastro simplificado de novos produtos e coleções.

---

## 5. Especificações Técnicas (Tech Stack)

- **Framework:** Next.js (App Router)
- **Estilização:** Tailwind CSS + shadcn/ui
- **Banco de Dados:** PostgreSQL via Drizzle ORM
- **Autenticação:** Better Auth
- **Media:** Cloudinary (Hospedagem de imagens de alta performance)
- **Deployment:** Vercel

---

## 6. Fluxo do Usuário (Happy Path)

1. Usuária clica no link do Instagram.
2. Navega pela **Home** ou **Catálogo** com visual de boutique.
3. Seleciona um produto e escolhe o tamanho.
4. Clicar em **"Comprar pelo WhatsApp"**.
5. Revisa o pedido na tela de **Fluxo WhatsApp**.
6. É redirecionada para o atendimento humano para fechar o pagamento e envio.

---

## 7. Próximos Passos & Evolução

- Implementação de microinterações de scroll e entrada.
- Integração de "Shop the Look" diretamente em banners editoriais.
- Sistema de notificações via WhatsApp para aviso de reposição automática.
