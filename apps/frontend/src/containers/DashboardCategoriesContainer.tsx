import { useSuspenseQuery } from "@apollo/client/react";

import { DASHBOARD_LIST_CATEGORIES_QUERY } from "@/graphql/queries";
import type { DashboardListCategoriesOutput } from "@/types/category";

export function DashboardCategoriesContainer({ children }: { children: (data: NonNullable<DashboardListCategoriesOutput["listCategories"]>) => void }) {
  const { data } = useSuspenseQuery<DashboardListCategoriesOutput>(DASHBOARD_LIST_CATEGORIES_QUERY);

  if (!data.listCategories) {
    return <span>Nenhuma categoria encontrada</span>;
  }

  return (
    <>
      {children(data.listCategories)}
    </>
  );
}
