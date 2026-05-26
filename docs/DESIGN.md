---
name: Premium Boutique Identity
colors:
  surface: "#fcf9f8"
  surface-dim: "#dcd9d8"
  surface-bright: "#fcf9f8"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#f6f3f2"
  surface-container: "#f0edec"
  surface-container-high: "#eae7e7"
  surface-container-highest: "#e5e2e1"
  on-surface: "#1b1c1b"
  on-surface-variant: "#4f4349"
  inverse-surface: "#303030"
  inverse-on-surface: "#f3f0ef"
  outline: "#81737a"
  outline-variant: "#d3c2c9"
  surface-tint: "#824d6f"
  primary: "#7f4b6c"
  on-primary: "#ffffff"
  primary-container: "#9b6386"
  on-primary-container: "#fffbff"
  inverse-primary: "#f5b3da"
  secondary: "#804f6b"
  on-secondary: "#ffffff"
  secondary-container: "#fec0e0"
  on-secondary-container: "#7b4b66"
  tertiary: "#6c565c"
  on-tertiary: "#ffffff"
  tertiary-container: "#866e75"
  on-tertiary-container: "#fffbff"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  primary-fixed: "#ffd8ec"
  primary-fixed-dim: "#f5b3da"
  on-primary-fixed: "#350a29"
  on-primary-fixed-variant: "#673656"
  secondary-fixed: "#ffd8eb"
  secondary-fixed-dim: "#f2b5d5"
  on-secondary-fixed: "#330d26"
  on-secondary-fixed-variant: "#653853"
  tertiary-fixed: "#f9dbe2"
  tertiary-fixed-dim: "#dcbfc6"
  on-tertiary-fixed: "#27171c"
  on-tertiary-fixed-variant: "#564147"
  background: "#fcf9f8"
  on-background: "#1b1c1b"
  surface-variant: "#e5e2e1"
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: "700"
    lineHeight: "1.1"
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: "600"
    lineHeight: "1.2"
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: "600"
    lineHeight: "1.2"
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: "500"
    lineHeight: "1.3"
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: "400"
    lineHeight: "1.6"
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.6"
  label-md:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: "500"
    lineHeight: "1.4"
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: "600"
    lineHeight: "1.4"
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1200px
  gutter: 1.5rem
  margin-mobile: 1rem
  stack-sm: 0.5rem
  stack-md: 1.5rem
  stack-lg: 3rem
  section-padding: 5rem
---

## Brand & Style

O sistema de design é construído sobre os pilares da sofisticação e da exclusividade. Destinado a uma audiência feminina que valoriza o curadoria e o toque pessoal de uma boutique, o sistema evoca sentimentos de serenidade, confiança e luxo acessível.

A linguagem visual é **Minimalista e Elegante**, inspirada na estética de editorial de moda de alta costura. O design prioriza o "espaço negativo" para permitir que as peças de vestuário sejam as protagonistas. Influenciado pelo framework shadcn/ui, o sistema combina a precisão técnica moderna com uma suavidade orgânica, resultando em uma interface que parece tanto tecnológica quanto artesanal. A transição do tráfego vindo de redes sociais como Instagram e WhatsApp deve ser imperceptível, mantendo o apelo visual vibrante e a facilidade de interação mobile.

## Colors

A paleta de cores é monocromática em sua essência, utilizando variações de tons rosados e violetas para criar profundidade sem gerar ruído visual.

- **Primária (Violeta Peruana):** Utilizada para elementos de marca e intenções principais.
- **Secundária (Vinho Suave):** Reservada para textos de alto contraste, estados ativos e profundidade em elementos interativos.
- **Rosé Claro & Rosa Suave:** Tons de suporte para superfícies, estados de hover e separação sutil de seções.
- **Off-white:** A base de todo o sistema, proporcionando um fundo quente e menos cansativo que o branco puro, reforçando o aspecto premium.

## Typography

A tipografia utiliza o contraste clássico entre uma serifada expressiva e uma sans-serif contemporânea. (Nota: `beVietnamPro` foi selecionada como alternativa técnica otimizada para legibilidade digital, mantendo o espírito da Poppins solicitada).

As manchetes em **Playfair Display** trazem autoridade editorial e um toque de "moda clássica". Para o corpo de texto, a **Be Vietnam Pro** oferece uma legibilidade excepcional em dispositivos móveis, essencial para usuárias vindas de links rápidos no WhatsApp. O uso de `letterSpacing` generoso e `lineHeight` amplo reforça a sensação de respiro e luxo do sistema.

## Layout & Spacing

O sistema utiliza uma **Grade Fluida** baseada em um modelo de 12 colunas para desktop e 2 colunas para mobile (listagem de produtos).

O ritmo espacial é generoso. O distanciamento entre seções deve ser amplo (`section-padding`) para evitar a percepção de uma loja "comum" e densa. No mobile, as margens laterais são reduzidas ligeiramente para priorizar a visualização das imagens dos produtos, mas mantendo o respiro vertical entre elementos de texto.

## Elevation & Depth

Para manter o estilo minimalista e suave, a hierarquia é definida por **Camadas Tonais** e sombras de baixa opacidade:

- **Sombras:** Devem ser extremamente difusas, utilizando a cor primária ou secundária com opacidade entre 3% e 6% (sombras coloridas/ambientais) em vez de preto puro. Isso evita um visual "sujo".
- **Superfícies:** Cartões e elementos flutuantes utilizam o `Rosa Suave` ou `Rosé Claro` para se destacar sutilmente sobre o fundo `Off-white`.
- **Interação:** O estado de foco ou elevação de um card de produto deve ser indicado por um aumento suave no raio de difusão da sombra, nunca por bordas pesadas.

## Shapes

O sistema de formas é definido por um **Radius Generoso**. Cantos arredondados transmitem acolhimento e feminilidade, suavizando a estrutura rigorosa do grid.

- **Elementos Padrão (Inputs, Botões):** 0.5rem (8px).
- **Cartões de Produto & Containers:** 1rem (16px).
- **Elementos de Destaque/Imagens:** 1.5rem (24px).
- **Imagens de Perfil/Avatares:** Devem ser circulares para manter a suavidade.

## Components

Os componentes seguem a lógica estrutural do shadcn/ui, mas com uma camada visual personalizada para a boutique:

- **Buttons:** O botão primário utiliza o preenchimento `Violeta Peruana` com texto em `Off-white`. O estilo deve ser sólido, com cantos arredondados de 0.5rem. Botões secundários utilizam apenas um outline fino em `Violeta` ou fundo `Rosé`.
- **Input Fields:** Devem ter um fundo `Rosa Suave` com bordas que aparecem apenas no estado de foco (utilizando `Vinho Suave`).
- **Cards de Produto:** Sem bordas visíveis. A separação é feita pelo uso de sombras suaves ou pela própria foto do produto que ocupa 100% da largura superior do card.
- **Chips/Badges:** Utilizados para categorias ou status (ex: "Novo", "Premium"). Devem ser pill-shaped com cores pastéis (`Rosé Claro`) e tipografia `label-sm`.
- **WhatsApp Floating Button:** Um componente essencial para esta audiência. Deve ser um botão flutuante discreto, mas acessível, posicionado no canto inferior direito, utilizando a cor de marca para manter a consistência.
