import { getCatalogHomeData } from "@/modules/catalog/server/queries/get-catalog-home-data";
import { CatalogHomeView } from "@/modules/catalog/ui/views/catalog-home-view";
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

export default async function HomePage() {
  const { categories, products } = await getCatalogHomeData();
  const whatsappPhone = process.env.STORE_WHATSAPP_NUMBER || "5575999999999";

  return (
    <CatalogHomeView
      initialCategories={categories}
      initialProducts={products}
      whatsappPhone={whatsappPhone}
    />
  );
}
