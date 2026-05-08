import type { CategoryColor } from "@/utils/colors";
import type { CategoryIconMap } from "@/utils/icons";

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
      icon: keyof typeof CategoryIconMap;
      color: CategoryColor;
    };
  }[];
};
