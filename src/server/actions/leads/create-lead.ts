"use server";

import { db } from "@/server/db";
import { schema } from "@/server/db/schema";
import { createLeadSchema } from "@/server/validations/lead-schema";

export type CreateLeadResult =
  | { success: true; message: string }
  | { success: false; errors?: Record<string, string[]>; error?: string };

export async function createLeadAction(formData: {
  productId: string;
  productVariantId?: string;
  name: string;
  whatsapp: string;
  selectedSize?: string;
  selectedColor?: string;
  message?: string;
}): Promise<CreateLeadResult> {
  // Validate input schema with Zod
  const validation = createLeadSchema.safeParse(formData);

  if (!validation.success) {
    const fieldErrors = validation.error.flatten().fieldErrors;
    const errors: Record<string, string[]> = {};
    for (const key in fieldErrors) {
      errors[key] = fieldErrors[key as keyof typeof fieldErrors] || [];
    }
    return { success: false, errors };
  }

  const data = validation.data;

  // Check if DATABASE_URL is defined
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL is not set. Simulating successful lead creation in mock mode.");
    return {
      success: true,
      message: "Seu interesse foi registrado com sucesso (Modo Demonstração)! Nós te avisaremos.",
    };
  }

  try {
    await db.insert(schema.lead).values({
      productId: data.productId,
      productVariantId: data.productVariantId || null,
      name: data.name,
      whatsapp: data.whatsapp,
      selectedSize: data.selectedSize || null,
      selectedColor: data.selectedColor || null,
      message: data.message || null,
      status: "NEW",
    });

    return {
      success: true,
      message:
        "Seu interesse foi registrado com sucesso! Nós te avisaremos assim que estiver disponível.",
    };
  } catch (error) {
    console.error("Failed to insert lead into database:", error);
    return {
      success: false,
      error:
        "Ocorreu um erro interno no servidor ao registrar seu interesse. Tente novamente mais tarde.",
    };
  }
}
