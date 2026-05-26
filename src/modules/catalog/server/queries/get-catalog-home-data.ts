import { FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from "../../constants";

import { db } from "@/server/db";
import { schema } from "@/server/db/schema";

export async function getCatalogHomeData() {
  if (!process.env.DATABASE_URL) {
    return {
      categories: FALLBACK_CATEGORIES,
      products: FALLBACK_PRODUCTS,
    };
  }

  try {
    const [dbCategories, dbProducts, dbImages] = await Promise.all([
      db.select().from(schema.category),
      db.select().from(schema.product),
      db.select().from(schema.productImage),
    ]);

    if (dbCategories.length === 0 || dbProducts.length === 0) {
      return {
        categories: FALLBACK_CATEGORIES,
        products: FALLBACK_PRODUCTS,
      };
    }

    const categories = dbCategories.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
    }));

    const products = dbProducts.map((item) => {
      const images = dbImages
        .filter((image) => image.productId === item.id)
        .sort((a, b) => a.position - b.position);
      const productCategory = dbCategories.find(
        (categoryItem) => categoryItem.id === item.categoryId,
      );

      return {
        id: item.id,
        name: item.name,
        slug: item.slug,
        price: item.price,
        status: item.status,
        description: item.description,
        categoryName: productCategory?.name || "Vestidos",
        images:
          images.length > 0
            ? images.map((image) => ({
                url: image.url,
                alt: image.alt,
              }))
            : undefined,
      };
    });

    return { categories, products };
  } catch (error) {
    console.warn(
      "Database connection could not be established. Using public catalog fallbacks instead:",
      error,
    );

    return {
      categories: FALLBACK_CATEGORIES,
      products: FALLBACK_PRODUCTS,
    };
  }
}
