import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getProductBySlug } from "@/modules/catalog/server/queries/get-product-by-slug";
import { ProductDetailView } from "@/modules/catalog/ui/views/product-detail-view";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produto Não Encontrado | Favorita Modas",
      description:
        "Desculpe, o produto que você procura não está disponível no momento em nosso catálogo.",
    };
  }

  return {
    title: `${product.name} | Favorita Modas`,
    description:
      product.description ||
      `Confira os detalhes de ${product.name}. Peça já o seu por meio de contato direto no WhatsApp de forma rápida e segura!`,
    openGraph: {
      title: `${product.name} | Boutique Premium`,
      description:
        product.description ||
        `Curadoria exclusiva. Veja tamanhos, cores e encomende pelo WhatsApp.`,
      images:
        product.images && product.images.length > 0 ? [{ url: product.images[0].url }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const whatsappPhone = process.env.STORE_WHATSAPP_NUMBER || "5575999999999";

  return <ProductDetailView product={product} whatsappPhone={whatsappPhone} />;
}
