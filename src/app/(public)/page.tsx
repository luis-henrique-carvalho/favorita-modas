import { HomeClient } from "@/components/public/home-client";
import type { PublicCategory, PublicProduct } from "@/components/public/home-types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorita Modas | Boutique Premium e Catálogo Online",
  description:
    "Exclusividade em cada detalhe. Explore nossa curadoria de vestidos, conjuntos e novidades de moda feminina, e faça seu pedido de forma prática diretamente pelo WhatsApp.",
  keywords:
    "moda feminina, boutique, vestido de seda, alfaiataria, catalogo online, favorita modas",
  openGraph: {
    title: "Favorita Modas | Boutique Premium",
    description:
      "Curadoria exclusiva de moda feminina. Peças exclusivas para exaltar sua autenticidade. Peça via WhatsApp.",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

const FALLBACK_CATEGORIES = [
  { id: "cat-1", name: "Vestidos", slug: "vestidos" },
  { id: "cat-2", name: "Conjuntos", slug: "conjuntos" },
  { id: "cat-3", name: "Novidades", slug: "novidades" },
  { id: "cat-4", name: "Acessórios", slug: "acessorios" },
] satisfies PublicCategory[];

const FALLBACK_PRODUCTS = [
  {
    id: "prod-1",
    name: "Vestido Seda Violeta",
    slug: "vestido-seda-violeta",
    price: 489.9,
    status: "AVAILABLE" as const,
    categoryName: "Vestidos",
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
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1wxj9xKLt6efLDHYCw1wwduPQNtwSg1O2Om2Qg1-f7ywG0coMkrcSzQnWur1f5_K_1BN6lbYWmbbz3tdFnn-owWuNr55f8KJn4PbHnaONRF40rab50Deb0JCPsacDj-mTw5SF3akJKRZwZSY5hTyLnd65AvqT2P_yYNLubKaaZCm_YvHJvy98gkzTrU2Ihl6sUV4b-KXA3p4ylWABaVJTKMJ_HmGH4n0S6aYDfrqT1WV5W7MZIlw4XC5cf7ioqMvIqgPbpjVBfTA",
        alt: "Blazer Alfaiataria Off-White Forrado",
      },
    ],
  },
] satisfies PublicProduct[];

async function loadHomeData() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  try {
    const [{ db }, { category }, { product, productImage }] = await Promise.all([
      import("@/server/db"),
      import("@/server/db/schema/category"),
      import("@/server/db/schema/product"),
    ]);

    const [dbCategories, dbProducts, dbImages] = await Promise.all([
      db.select().from(category),
      db.select().from(product),
      db.select().from(productImage),
    ]);

    if (dbCategories.length === 0 || dbProducts.length === 0) {
      return null;
    }

    const categories = dbCategories.map((c) => ({ id: c.id, name: c.name, slug: c.slug }));

    const products = dbProducts.map((p) => {
      const pImages = dbImages
        .filter((img) => img.productId === p.id)
        .sort((a, b) => a.position - b.position);
      const pCategory = dbCategories.find((c) => c.id === p.categoryId);

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: p.price,
        status: p.status,
        description: p.description,
        categoryName: pCategory?.name || "Vestidos",
        images:
          pImages.length > 0 ? pImages.map((img) => ({ url: img.url, alt: img.alt })) : undefined,
      };
    });

    return { categories, products };
  } catch (error) {
    console.warn(
      "Database connection could not be established. Using public home fallbacks instead:",
      error,
    );
    return null;
  }
}

export default async function HomePage() {
  const homeData = await loadHomeData();
  const categories = homeData?.categories ?? FALLBACK_CATEGORIES;
  const products = homeData?.products ?? FALLBACK_PRODUCTS;

  const whatsappPhone = process.env.STORE_WHATSAPP_NUMBER || "5575999999999";

  return (
    <HomeClient
      initialCategories={categories}
      initialProducts={products}
      whatsappPhone={whatsappPhone}
    />
  );
}
