import type { User } from "@/types/auth";
import type { CategoryColor } from "@/utils/icons";

export type Category = {
  id: string;
  name: string;
  iconName: string;
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
    iconName: string;
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
    iconName: string;
    color: CategoryColor;
    totalAmount: number;
    transactionsCount: number;
    user: User;
  }[];
};