import { pgTable, text, timestamp, boolean, integer, numeric } from "drizzle-orm/pg-core";
import { category } from "./category";

export const productStatusEnum = ["AVAILABLE", "UNAVAILABLE", "COMING_SOON", "PRE_ORDER"] as const;
export type ProductStatus = (typeof productStatusEnum)[number];

export const product = pgTable("product", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  status: text("status").$type<ProductStatus>().default("AVAILABLE").notNull(),
  isAvailable: boolean("is_available").default(true).notNull(),
  categoryId: text("category_id")
    .notNull()
    .references(() => category.id, { onDelete: "restrict" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const productImage = pgTable("product_image", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  productId: text("product_id")
    .notNull()
    .references(() => product.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  publicId: text("public_id").notNull(),
  alt: text("alt"),
  position: integer("position").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const productVariant = pgTable("product_variant", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  productId: text("product_id")
    .notNull()
    .references(() => product.id, { onDelete: "cascade" }),
  size: text("size").notNull(), // e.g., P, M, G, GG, 38, 40
  color: text("color").notNull(), // e.g., Azul, Rosa, Estampado
  stockQuantity: integer("stock_quantity").default(0).notNull(),
  isAvailable: boolean("is_available").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
