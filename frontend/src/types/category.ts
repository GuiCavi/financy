import type { User } from "@/types/auth";
import type { CategoryColor } from "@/utils/colors";
import type { CategoryIconMap } from "@/utils/icons";

export type Category = {
  id: string;
  name: string;
  icon: keyof typeof CategoryIconMap;
  color: CategoryColor;
  userId: string;
  user: User;
  // transactions: [TransactionModel!];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateCategoryInput = {
  data: {
    name: string;
    icon: keyof typeof CategoryIconMap;
    color: CategoryColor;
  };
};

export type CreateCategoryOutput = {
  createCategory?: Category;
};

export type ListCategoriesOutput = {
  listCategories?: Category[];
};

export type DashboardListCategoriesOutput = {
  listCategories?: {
    id: string;
    name: string;
    icon: keyof typeof CategoryIconMap;
    color: CategoryColor;
    totalAmount: number;
    transactionsCount: number;
    user: User;
  }[];
};