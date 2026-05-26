# QUALITY.md

Guia de qualidade para manter o catálogo estável, simples e seguro enquanto o MVP evolui.

## Objetivo

Nenhuma mudança deve ser considerada pronta se quebrar comportamento existente, lint, tipos ou formatação.

Use este documento ao criar ou alterar:

- helpers e validações;
- Server Actions;
- fluxos de WhatsApp e lista de interesse;
- telas públicas;
- painel admin;
- integrações com banco, Better Auth ou Cloudinary.

## Princípios de TDD

Use TDD como ciclo de trabalho, não como burocracia.

1. Red: escreva um teste pequeno para um comportamento observável.
2. Green: implemente o mínimo necessário para passar.
3. Refactor: limpe duplicação e nomes mantendo todos os testes verdes.

Regras:

- Teste comportamento público, não detalhes internos.
- Faça fatias verticais pequenas: um teste, uma implementação, uma validação.
- Para bug, escreva primeiro um teste que reproduz a falha.
- Não adicione mocks para módulos internos se for possível testar pela interface real.
- Nunca refatore com teste vermelho.

## Pirâmide de Testes

Priorize testes que protegem conversão e operação da loja.

### Unitários

Use para lógica isolada:

- `generateWhatsAppLink`;
- formatação de preço;
- validação e normalização de WhatsApp;
- schemas Zod;
- regras de disponibilidade;
- helpers de Cloudinary.

### Integração

Use para contratos entre aplicação, validação e persistência:

- criação de lead;
- criação e edição de produto;
- atualização de disponibilidade;
- listagem de interessados;
- permissões de admin.

Use banco de teste isolado. Nunca rode testes automatizados contra dados reais.

### E2E

Use Playwright apenas nos fluxos críticos:

- cliente abre catálogo;
- escolhe produto;
- seleciona tamanho/cor;
- clica no WhatsApp;
- produto indisponível mostra formulário de interesse;
- admin cria produto;
- admin altera disponibilidade.

## Definition of Done

Antes de encerrar uma tarefa:

- comportamento novo ou alterado tem teste proporcional ao risco;
- bug corrigido tem teste de regressão quando viável;
- código está formatado;
- lint não tem erros;
- TypeScript não tem erros;
- fluxos críticos alterados foram validados manualmente ou por teste automatizado;
- limitações ou validações não executadas foram registradas na resposta final.

## Gates Locais

Scripts disponíveis:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test:run
npm run test:e2e
npm run quality
```

Use `npm run quality` como validação mínima ao final de mudanças de código. Ele valida formatação, lint, tipos e testes unitários.

Durante o ciclo TDD, rode testes focados sempre que fizer sentido:

```bash
npm run test:run
```

Quando a mudança tocar fluxo público, admin, autenticação, roteamento ou experiência mobile crítica, rode também `npm run test:e2e`.

Para mudanças pequenas de documentação, valide pelo menos a formatação quando o arquivo estiver coberto pelo Prettier.

## Formatação

Prettier é a fonte de verdade para formatação.

- Use `npm run format` para corrigir formatação.
- Use `npm run format:check` para validar sem alterar arquivos.
- Não entregue código com formatação pendente.
- Não ajuste estilo manualmente quando o formatter puder fazer isso.

## Lint e Tipos

- `npm run lint` não pode terminar com erro.
- `npm run typecheck` não pode terminar com erro.
- Warnings devem ser tratados quando indicarem risco real ou tendência de acúmulo.
- Não silencie regras sem justificar no código ou na resposta final.

## Validação Final de Qualidade

Ao final de uma tarefa de código, rode nesta ordem:

```bash
npm run quality
```

Depois rode validações específicas da mudança:

- teste unitário/integrado do arquivo alterado;
- teste E2E do fluxo crítico alterado;
- `npm run build` quando alterar rotas, configuração do Next, autenticação, banco ou comportamento de renderização.

Na resposta final, informe:

- quais comandos passaram;
- quais comandos não foram executados e por quê;
- qualquer risco residual relevante.

## CI Recomendado

Quando houver pipeline, bloqueie merge se qualquer etapa falhar:

1. instalar dependências com `npm ci`;
2. validar formatação com `npm run format:check`;
3. validar lint com `npm run lint`;
4. validar tipos com `npm run typecheck`;
5. rodar testes unitários e integração;
6. rodar E2E crítico quando a mudança tocar fluxo público ou admin.
