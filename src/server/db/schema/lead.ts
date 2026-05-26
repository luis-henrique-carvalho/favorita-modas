import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { product, productVariant } from "./product";

export const leadStatusEnum = ["NEW", "CONTACTED", "CONVERTED", "LOST"] as const;
export type LeadStatus = typeof leadStatusEnum[number];

export const lead = pgTable("lead", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  productId: text("product_id")
    .notNull()
    .references(() => product.id, { onDelete: "cascade" }),
  productVariantId: text("product_variant_id")
    .references(() => productVariant.id, { onDelete: "set null" }),
  name: text("name").notNull(),
  whatsapp: text("whatsapp").notNull(),
  selectedSize: text("selected_size"),
  selectedColor: text("selected_color"),
  message: text("message"),
  status: text("status")
    .$type<LeadStatus>()
    .default("NEW")
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
