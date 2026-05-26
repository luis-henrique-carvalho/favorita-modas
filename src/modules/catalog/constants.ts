import type { PublicCategory, PublicProduct } from "./types";

export const COLOR_HEX_MAP: Record<string, string> = {
  "rosé divine": "#E5B6B6",
  "rose divine": "#E5B6B6",
  rosé: "#E5B6B6",
  rose: "#E5B6B6",
  preto: "#1B1B1B",
  branco: "#F3F0EF",
  azul: "#7FA3C9",
  estampado: "#D6A3C4",
  linen: "#D9CDC4",
  violeta: "#7f4b6c",
};

export function getColorHex(colorName: string): string {
  return COLOR_HEX_MAP[colorName.toLowerCase()] ?? "#804f6b";
}

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
  {
    id: "prod-4",
    name: "Vestido Midi Seda Rose",
    slug: "vestido-midi-seda-rose",
    price: 489.0,
    status: "AVAILABLE" as const,
    categoryName: "Vestidos",
    sizes: ["P", "M", "G"],
    totalStock: 8,
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAWTdRe7GTiUpV-EzVbTfSV3vTIDzr8rEibeiJQ3Mox3k8tQAkHqk53Sj85pKEgBpRehFv12sLpCcqZqDbsTdQAVwi_jwmWlpbKsFW7TiLy_GNkJ-iUKP1dGGHhh3NNXN0-Vjsqp5KzNddXIh7Iv2MQ8nqnbTxwT7d8BnbIysFp8k94_Z88rQ6oDEeo8eMXzyh8UmLKsfpyXsJQ1Kw8fkSaiyFBcIm6I96c52KKpvq0q8TyR9dU6D3s2UwmL6Msl4sItZGPpibBxus",
        alt: "A high-end editorial fashion shot of a woman wearing a luxurious midi dress in soft silk rose fabric.",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBh8IgGfrl7OUGNNT6aipPBIGLVGDDfuTAp1XaiQcD-3k3kytLJtSpF77ytsV_1cAh2l738ah563O3BWkfRO-yCRNBZo_ktL-YXjg-ui1G6y-VOFrswuiip401HTZ89zHo_KqdVf9ElmSZlUDhGu2For1YgUdGmWwWCfezBnIh8UndfgHwM1vfJ2rWIoF2g7ufN4jmOc0TN4k6MciG69UN0_HCkFXwiMUkT-7IggyPKa2ksvVXaxVT13NexuVwSG2cnUPfosIzJdlc",
        alt: "Close up detail of rose silk fabric texture in soft natural light.",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQYDlabF8FbI3cF_H8D6u9kAmGxB-YZ-Y8forzVgFgCdv-YJBad-eWMbH1ARMHpBt2vg45IgMeQ-gXWyc__R6q8hSHPxV8LXMSqrl4XYNm0mINoqJ73U9ONYC7QxSuBlnBmU_BsZtrQ1KkGnTBU7gBET3dXRQnPxfC00F7YCCmvJJs62CbMOmf62Vzne1VsvfubTfMzjhMaxhE4JTDzsQDBwIMEBcsUqH-xBpPf-6Wrs8SoE6q-Jlw4H2Gz20tMKqp_coe1m1XaZw",
        alt: "Model wearing silk dress looking through a minimalist window.",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCV7f_8HFlnkXtZVnqi9MvZY6EJC3PhxvVn5mqYduvvyMwY4fm2CFnwnU73t5NOBLR52FVerdVyYKJJ2NrEpwqAaYVdHWBo9NMYUMc8Om2887Kz_w7yHFAdZAq_G5yvK6KscO7rAvTN644S_e9Nm000xJU8zJKntwtNNkHP5eut0YxwoTALnZOXulDqYLh4M-sDGLfYBQBjBGUtJSwhNWqTZSEZx5_tNfxRb1LJyesDGxSKKBhbivw8H86iHC7VepSq97E87ETKpIM",
        alt: "Back detail of a midi rose dress in an elegant studio setting.",
      },
    ],
  },
] satisfies PublicProduct[];
