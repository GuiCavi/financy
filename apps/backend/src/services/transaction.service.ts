import { prisma } from "../../prisma/prisma";
import { CreateTransactionInput, UpdateTransactionInput } from "../dtos/input/transaction.input";
import { TransactionModel } from "../models/transaction.model";

export class TransactionService {
  async createTransaction(data: CreateTransactionInput, userId: string): Promise<TransactionModel> {
    return prisma.transaction.create({
      data: {
        userId,
        description: data.description,
        amount: data.amount,
        type: data.type,
        date: data.date,
        categoryId: data.categoryId,
      },
    });
  }

  async updateTransaction(data: UpdateTransactionInput, id: string) {
    const existingTransaction = await prisma.transaction.findUnique({
      where: {
        id,
      },
    });

    if (!existingTransaction) {
      throw new Error("Categoria não encontrada");
    }

    return prisma.transaction.update({
      where: { id },
      data: {
        description: data.description,
        amount: data.amount,
        type: data.type,
        date: data.date,
        categoryId: data.categoryId,
      },
    });
  }

  async listTransactions(userId: string): Promise<TransactionModel[]> {
    return prisma.transaction.findMany({
      where: {
        userId,
      },
    });
  }

  async listTransactionsByCategory(categoryId: string): Promise<TransactionModel[]> {
    return prisma.transaction.findMany({
      where: {
        categoryId,
      },
    });
  }

  async deleteTransaction(id: string) {
    const existingTransaction = await prisma.transaction.findUnique({
      where: {
        id,
      },
    });

    if (!existingTransaction) {
      throw new Error("Categoria não encontrada");
    }

    return prisma.transaction.delete({
      where: { id },
    });
  }

  async sumAmountByCategory(categoryId: string): Promise<number> {
    const transactions = await this.listTransactionsByCategory(categoryId);
    return transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  }
}