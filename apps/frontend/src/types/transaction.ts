import type { CategoryColor } from "@/utils/icons";

export type TransactionType = "INCOME" | "EXPENSE";

export const TransactionValueType = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE",
} as const;

export type DashboardListTransactionsOutput = {
  listTransactions?: {
    id: string;
    description: string;
    date: string;
    amount: number;
    type: TransactionType;
    category: {
      name: string;
      iconName: string;
      color: CategoryColor;
    };
  }[];
};
