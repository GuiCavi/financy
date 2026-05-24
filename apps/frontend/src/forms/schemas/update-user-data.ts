import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").trim(),
  email: z.email().trim().optional(),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;