import { useSuspenseQuery } from "@apollo/client/react";

import { DASHBOARD_LIST_CATEGORIES_QUERY } from "@/graphql/queries";
import type { DashboardListCategoriesOutput } from "@/types/category";

import type { ReactNode } from "react";

type CategoriesData = NonNullable<DashboardListCategoriesOutput["listCategories"]>;

export function CategoriesContainer({ children }: { children: (data: CategoriesData) => ReactNode }) {
  const { data: categoriesData } = useSuspenseQuery<DashboardListCategoriesOutput>(DASHBOARD_LIST_CATEGORIES_QUERY);

  const categories = categoriesData.listCategories ?? [];

  return children(categories);
}
