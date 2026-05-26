import { z } from "zod";

export const createLeadSchema = z.object({
  productId: z.string().min(1, { message: "O ID do produto é obrigatório." }),
  productVariantId: z.string().optional(),
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  whatsapp: z
    .string()
    .min(10, { message: "O número de WhatsApp deve ter pelo menos 10 dígitos (com DDD)." }),
  selectedSize: z.string().optional(),
  selectedColor: z.string().optional(),
  message: z.string().optional(),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
