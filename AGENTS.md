# AGENTS.md

Este arquivo é carregado automaticamente por agentes de IA. Mantenha-o curto.
Detalhes de produto, design, arquitetura e roadmap ficam em `docs/` e devem ser lidos somente quando a tarefa exigir.

## Leitura Sob Demanda

Use `rg` para localizar seções e abra apenas o documento necessário:

| Quando precisar de... | Consulte |
| --- | --- |
| Objetivo do produto, público, fluxos e requisitos funcionais | [docs/PRD.md](docs/PRD.md) |
| Identidade visual, tokens, tipografia, cores e componentes | [docs/DESIGN.md](docs/DESIGN.md) |
| Fases, progresso, checklist e próximas tasks | [docs/ROADMAP.md](docs/ROADMAP.md) |
| Stack, entidades, rotas, Server Actions, testes, env e estrutura | [docs/TECHNICAL.md](docs/TECHNICAL.md) |

Antes de criar algo novo, confira a implementação existente em `src/`.

## Contexto Essencial

Favorita Modas é um catálogo online mobile-first para uma loja pequena, focado em conversão pelo WhatsApp.

O sistema deve ajudar clientes vindas do Instagram a:

- ver produtos;
- escolher tamanho/cor;
- demonstrar interesse;
- enviar mensagem pronta no WhatsApp;
- entrar em lista de interesse quando a peça estiver indisponível.

Não transforme o MVP em e-commerce completo. Evite checkout online, carrinho completo, pagamento, cálculo de frete, login de cliente, marketplace e múltiplas lojas.

## Stack Base

- Next.js App Router com TypeScript
- Server Actions para mutações
- Better Auth para admin
- PostgreSQL + Drizzle ORM
- Cloudinary para imagens
- Tailwind CSS + shadcn/ui
- Vitest, Testing Library e Playwright para testes proporcionais ao risco

## Regras de Implementação

- Prefira Server Components; use Client Components apenas para interatividade.
- Valide entrada com Zod no servidor.
- Mantenha lógica de negócio fora dos componentes React.
- Use Drizzle; não adicione Prisma.
- Proteja rotas e ações de `/admin` no servidor.
- Nunca exponha segredos ou variáveis privadas no client.
- Priorize simplicidade, velocidade mobile e manutenção.

## Regra Central de Conversão

Produto disponível deve gerar link `wa.me` com mensagem codificada por `encodeURIComponent`.

Produto indisponível deve captar lead com nome, WhatsApp, produto, tamanho/cor desejados e data do interesse.
