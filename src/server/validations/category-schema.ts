import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, { message: "O nome da categoria deve ter pelo menos 2 caracteres." }),
  slug: z
    .string()
    .min(2, { message: "O slug deve ter pelo menos 2 caracteres." })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "O slug deve ser amigável para URL (letras minúsculas, números e hifens).",
    }),
});

export type CategoryInput = z.infer<typeof categorySchema>;
