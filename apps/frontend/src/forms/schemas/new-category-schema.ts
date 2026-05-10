import { z } from "zod";

export const newCategorySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").trim(),
  description: z.string().trim(),
  icon: z.string().min(1, "Ícone é obrigatório").trim(),
  color: z.string().min(1, "Cor é obrigatória").trim(),
});

export type NewCategorySchema = z.infer<typeof newCategorySchema>;