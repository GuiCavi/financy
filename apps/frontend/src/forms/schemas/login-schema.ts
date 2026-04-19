import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("E-mail inválido").trim(),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres").trim(),
});

export type LoginSchema = z.infer<typeof loginSchema>;