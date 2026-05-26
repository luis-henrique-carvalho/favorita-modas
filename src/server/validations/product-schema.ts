import { z } from "zod";

export const productStatusEnum = z.enum(["AVAILABLE", "UNAVAILABLE", "COMING_SOON", "PRE_ORDER"]);

export const productVariantSchema = z.object({
  id: z.string().optional(),
  size: z.string().min(1, "O tamanho não pode estar vazio."),
  color: z.string().min(1, "A cor não pode estar vazia."),
  stockQuantity: z
    .number({
      message: "A quantidade em estoque deve ser um número.",
    })
    .min(0, "A quantidade em estoque não pode ser negativa."),
  isAvailable: z.boolean().default(true),
});

export const productSchema = z.object({
  name: z.string().min(2, { message: "O nome do produto deve ter pelo menos 2 caracteres." }),

  slug: z
    .string()
    .min(2, { message: "O slug deve ter pelo menos 2 caracteres." })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "O slug deve ser amigável para URL (letras minúsculas, números e hifens).",
    }),

  description: z.string().optional().nullable(),

  price: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        const parsed = parseFloat(val);
        return isNaN(parsed) ? undefined : parsed;
      }
      return val;
    },
    z
      .number({
        message: "O preço deve ser um número.",
      })
      .positive("O preço deve ser maior que zero."),
  ),

  status: productStatusEnum.default("AVAILABLE"),

  isAvailable: z.boolean().default(true),

  categoryId: z.string().min(1, "A categoria é obrigatória."),

  variants: z.array(productVariantSchema).optional().default([]),
});

export type ProductInput = z.infer<typeof productSchema>;
export type ProductVariantInput = z.infer<typeof productVariantSchema>;
