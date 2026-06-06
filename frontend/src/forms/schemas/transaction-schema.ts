import { z } from "zod";

export const transactionSchema = z.object({
  description: z.string().min(1, "Descrição é obrigatória").trim(),
  amount: z.number({ message: "Valor inválido" }).gt(0, "Valor deve ser maior que zero"),
  categoryId: z.string().min(1, "Categoria é obrigatória"),
  date: z.string().min(1, "Data é obrigatória"),
  type: z.enum(["INCOME", "EXPENSE"]),
});

export type TransactionSchema = z.infer<typeof transactionSchema>;
