import type { TransactionType } from "@/types/transaction";

export type CategoryColor = "blue" | "purple" | "pink" | "red" | "orange" | "yellow" | "green";

export const CategoryColors: CategoryColor[] = ["blue", "purple", "pink", "red", "orange", "yellow", "green"];

export const CategoryColorVariants: Record<CategoryColor, string> = {
  blue: "bg-financy-blue-light text-financy-blue-dark dark:text-financy-blue-light dark:bg-financy-blue-dark",
  purple: "bg-financy-purple-light text-financy-purple-dark dark:text-financy-purple-light dark:bg-financy-purple-dark",
  orange: "bg-financy-orange-light text-financy-orange-dark dark:text-financy-orange-light dark:bg-financy-orange-dark",
  pink: "bg-financy-pink-light text-financy-pink-dark dark:text-financy-pink-light dark:bg-financy-pink-dark",
  yellow: "bg-financy-yellow-light text-financy-yellow-dark dark:text-financy-yellow-light dark:bg-financy-yellow-dark",
  green: "bg-financy-green-light text-financy-green-dark dark:text-financy-green-light dark:bg-financy-green-dark",
  red: "bg-financy-red-light text-financy-red-dark dark:text-financy-red-light dark:bg-financy-red-dark",
};

export const CategoryColorBackgrounds: Record<CategoryColor, string> = {
  blue: "bg-financy-blue-base",
  purple: "bg-financy-purple-base",
  orange: "bg-financy-orange-base",
  pink: "bg-financy-pink-base",
  yellow: "bg-financy-yellow-base",
  green: "bg-financy-green-base",
  red: "bg-financy-red-base",
};

export const CategoryColorTexts: Record<CategoryColor, string> = {
  blue: "text-financy-blue-base",
  purple: "text-financy-purple-base",
  orange: "text-financy-orange-base",
  pink: "text-financy-pink-base",
  yellow: "text-financy-yellow-base",
  green: "text-financy-green-base",
  red: "text-financy-red-base",
};

export const TransactionTypeColorVariants: Record<TransactionType, string> = {
  INCOME: "text-financy-green-base dark:text-financy-green-base",
  EXPENSE: "text-financy-red-base dark:text-financy-red-base",
};

export const TransactionTypeBorderColor: Record<TransactionType, string> = {
  INCOME: "data-active:border-financy-green-base dark:data-active:border-financy-green-base",
  EXPENSE: "data-active:border-financy-red-base dark:data-active:border-financy-red-base",
};