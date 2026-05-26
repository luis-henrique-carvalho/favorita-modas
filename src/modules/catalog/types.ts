import type { category } from "@/server/db/schema/category";
import type { product, productImage } from "@/server/db/schema/product";

export type PublicCategory = Pick<typeof category.$inferSelect, "id" | "name" | "slug">;

export type PublicProductImage = Pick<typeof productImage.$inferSelect, "url" | "alt">;

export type PublicProduct = Pick<typeof product.$inferSelect, "id" | "name" | "slug" | "status"> & {
  price: typeof product.$inferSelect.price | number;
  description?: typeof product.$inferSelect.description;
  categoryName?: string;
  images?: PublicProductImage[];
  sizes?: string[];
  totalStock?: number;
};

export type FavoriteProduct = Pick<PublicProduct, "id" | "name" | "slug" | "price"> & {
  image?: string;
};
