import { CombinedGraphQLErrors } from "@apollo/client";
import { toast } from "sonner";
import { create } from "zustand";

import { LIST_CATEGORIES_QUERY } from "@/graphql/queries/category";
import { apolloClient } from "@/lib/apollo";
import type { Category, ListCategoriesOutput } from "@/types/category";

interface CategoryState {
  categories: Category[];
  listCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>()((set) => ({
  categories: [],
  listCategories: async () => {
    try {
      const { data } = await apolloClient.query<ListCategoriesOutput>(
        {
          query: LIST_CATEGORIES_QUERY,
        },
      );

      console.info("🚀 ~ data.categories:", data);
      if (data.listCategories) {
        set({ categories: data.listCategories });
      } else {
        toast.error("Não foi possível listar as categorias");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof CombinedGraphQLErrors) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Não foi possível registrar sua conta");
      }
    }
  },
}));

useCategoryStore.subscribe((state) => {
  console.info("🚀 ~ state:", state);
});