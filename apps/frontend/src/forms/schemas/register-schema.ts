import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(1, "Nome completo é obrigatório").trim(),
  email: z.email("E-mail inválido").trim(),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres").trim(),
});

export type RegisterSchema = z.infer<typeof registerSchema>;