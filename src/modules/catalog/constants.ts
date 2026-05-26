import type { PublicCategory, PublicProduct } from "./types";

export const FALLBACK_CATEGORIES = [
  { id: "cat-1", name: "Vestidos", slug: "vestidos" },
  { id: "cat-2", name: "Conjuntos", slug: "conjuntos" },
  { id: "cat-3", name: "Novidades", slug: "novidades" },
  { id: "cat-4", name: "Acessórios", slug: "acessorios" },
] satisfies PublicCategory[];

export const FALLBACK_PRODUCTS = [
  {
    id: "prod-1",
    name: "Vestido Seda Violeta",
    slug: "vestido-seda-violeta",
    price: 489.9,
    status: "AVAILABLE" as const,
    categoryName: "Vestidos",
    sizes: ["P", "M", "G"],
    totalStock: 5,
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCayCA3jxEDVsubdTDT7kDo4EPVFDG0PQfr2qkVY_QjFfEJmFMrWzayrWrGu985XFCnGdyfaYAd9Q7BvvsgSEBCe5RZ5Yo2sVDG1zuIQPcwh9761UC9OQ0q3SVP_NTf6XY8oGLOgT_xHxk3xP3M1C-gNQDEUBw3bbaRylahdhu67YyGjrnDRzi55U8N2cZZBCEVhOQ6AG5VuaPvfgpReGyzBcx31-ZqnfQu0ws6F5YefXlOfIfdiH01nEVnvqQlz59F_t6vXT9gsso",
        alt: "Vestido Seda Violeta de Alça Premium",
      },
    ],
  },
  {
    id: "prod-2",
    name: "Conjunto Linen Rosé",
    slug: "conjunto-linen-rose",
    price: 359.0,
    status: "AVAILABLE" as const,
    categoryName: "Conjuntos",
    sizes: ["P", "M", "G"],
    totalStock: 2, // Will trigger "Últimas peças" badge
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDq05Ad5LxtQ5gYFT8VW5hFkKFxC53fUMbQ4Eh80O1V1LPNkBxqTWaGAbez91SCJb_o7iaRx2zpYQjlJuTn9mTCiEAm1Jw4YI821NtNqNch98CYDktemUz7RedE9axnKpPX0vuA8i11cCHdqJVGtYqdc9yHwkbKpdXmmCAtU1SOYfLcIz-cCcklEIl1MifALf5EhD22Xz7h522BKQJAzMn95Z0UIrFlT8aSh_cK0W2fi7V9AduvwD_nAGxl2zZZyNbRDEvhCnPGMU",
        alt: "Conjunto Linen Rosé Alfaiataria Leve",
      },
    ],
  },
  {
    id: "prod-3",
    name: "Blazer Alfaiataria",
    slug: "blazer-alfaiataria",
    price: 520.0,
    status: "PRE_ORDER" as const,
    categoryName: "Novidades",
    sizes: ["Único"],
    totalStock: 10,
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1wxj9xKLt6efLDHYCw1wwduPQNtwSg1O2Om2Qg1-f7ywG0coMkrcSzQnWur1f5_K_1BN6lbYWmbbz3tdFnn-owWuNr55f8KJn4PbHnaONRF40rab50Deb0JCPsacDj-mTw5SF3akJKRZwZSY5hTyLnd65AvqT2P_yYNLubKaaZCm_YvHJvy98gkzTrU2Ihl6sUV4b-KXA3p4ylWABaVJTKMJ_HmGH4n0S6aYDfrqT1WV5W7MZIlw4XC5cf7ioqMvIqgPbpjVBfTA",
        alt: "Blazer Alfaiataria Off-White Forrado",
      },
    ],
  },
] satisfies PublicProduct[];
