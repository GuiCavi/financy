import type { User } from "@/types/auth";

export type Category = {
  id: string;
  name: string;
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
  };
};

export type CreateCategoryOutput = {
  createCategory?: Category;
};

export type ListCategoriesOutput = {
  listCategories?: Category[];
};
