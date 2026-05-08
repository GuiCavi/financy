import type { TransactionType } from "@/types/transaction";

export type CategoryColor = "blue" | "purple" | "pink" | "red" | "orange" | "yellow" | "green";

export const CategoryColors: CategoryColor[] = ["blue", "purple", "pink", "red", "orange", "yellow", "green"];

export const categoryColorVariants: Record<CategoryColor, string> = {
  blue: "bg-financy-blue-light text-financy-blue-dark dark:text-financy-blue-light dark:bg-financy-blue-dark",
  purple: "bg-financy-purple-light text-financy-purple-dark dark:text-financy-purple-light dark:bg-financy-purple-dark",
  orange: "bg-financy-orange-light text-financy-orange-dark dark:text-financy-orange-light dark:bg-financy-orange-dark",
  pink: "bg-financy-pink-light text-financy-pink-dark dark:text-financy-pink-light dark:bg-financy-pink-dark",
  yellow: "bg-financy-yellow-light text-financy-yellow-dark dark:text-financy-yellow-light dark:bg-financy-yellow-dark",
  green: "bg-financy-green-light text-financy-green-dark dark:text-financy-green-light dark:bg-financy-green-dark",
  red: "bg-financy-red-light text-financy-red-dark dark:text-financy-red-light dark:bg-financy-red-dark",
};

export const TransactionTypeColorVariants: Record<TransactionType, string> = {
  INCOME: "text-financy-green-dark dark:text-financy-green-base",
  EXPENSE: "text-financy-red-dark dark:text-financy-red-base",
};