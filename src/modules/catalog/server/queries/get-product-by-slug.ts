import { eq } from "drizzle-orm";
import { FALLBACK_PRODUCTS } from "../../constants";
import { db } from "@/server/db";
import { schema } from "@/server/db/schema";
import type { ProductDetail, ProductVariant, PublicProduct } from "../../types";

export type { ProductDetail };

const FALLBACK_COLORS = ["Rosé Divine", "Preto", "Branco"];

function buildFallbackVariants(fallback: PublicProduct): ProductVariant[] {
  return (
    fallback.sizes?.flatMap((size) =>
      FALLBACK_COLORS.map((color, idx) => ({
        id: `var-${fallback.id}-${size}-${idx}`,
        size,
        color,
        stockQuantity: size === "M" && color === "Rosé Divine" ? 5 : size === "P" ? 0 : 2,
        isAvailable: true,
      })),
    ) ?? []
  );
}

function withFallbackVariants(fallback: PublicProduct): ProductDetail {
  return { ...fallback, variants: buildFallbackVariants(fallback) };
}

export async function getProductBySlug(slug: string): Promise<ProductDetail | null> {
  if (!process.env.DATABASE_URL) {
    const fallback = FALLBACK_PRODUCTS.find((p) => p.slug === slug);
    return fallback ? withFallbackVariants(fallback) : null;
  }

  try {
    const dbProductResult = await db
      .select()
      .from(schema.product)
      .where(eq(schema.product.slug, slug))
      .limit(1);

    if (dbProductResult.length === 0) {
      const fallback = FALLBACK_PRODUCTS.find((p) => p.slug === slug);
      return fallback ? withFallbackVariants(fallback) : null;
    }

    const item = dbProductResult[0];

    const [dbImages, dbVariants, dbCategory] = await Promise.all([
      db.select().from(schema.productImage).where(eq(schema.productImage.productId, item.id)),
      db.select().from(schema.productVariant).where(eq(schema.productVariant.productId, item.id)),
      db.select().from(schema.category).where(eq(schema.category.id, item.categoryId)).limit(1),
    ]);

    const sortedImages = dbImages.sort((a, b) => a.position - b.position);
    const sizes = Array.from(new Set(dbVariants.filter((v) => v.isAvailable).map((v) => v.size)));
    const totalStock = dbVariants.reduce((sum, v) => sum + v.stockQuantity, 0);

    return {
      id: item.id,
      name: item.name,
      slug: item.slug,
      price: item.price,
      status: item.status,
      description: item.description,
      categoryName: dbCategory[0]?.name ?? "Vestidos",
      sizes: sizes.length > 0 ? sizes : undefined,
      totalStock,
      images:
        sortedImages.length > 0
          ? sortedImages.map((image) => ({ url: image.url, alt: image.alt }))
          : undefined,
      variants: dbVariants.map((v) => ({
        id: v.id,
        size: v.size,
        color: v.color,
        stockQuantity: v.stockQuantity,
        isAvailable: v.isAvailable,
      })),
    };
  } catch (error) {
    console.warn(`Database query for slug ${slug} failed. Using fallback:`, error);
    const fallback = FALLBACK_PRODUCTS.find((p) => p.slug === slug);
    return fallback ? withFallbackVariants(fallback) : null;
  }
}
