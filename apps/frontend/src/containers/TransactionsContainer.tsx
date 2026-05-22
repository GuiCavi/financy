import { useSuspenseQuery } from "@apollo/client/react";

import { DASHBOARD_LIST_CATEGORIES_QUERY, DASHBOARD_LIST_TRANSACTIONS_QUERY } from "@/graphql/queries";
import type { DashboardListCategoriesOutput } from "@/types/category";
import type { DashboardListTransactionsOutput } from "@/types/transaction";

import type { ReactNode } from "react";

type TransactionsData = NonNullable<DashboardListTransactionsOutput["listTransactions"]>;
type CategoriesData = NonNullable<DashboardListCategoriesOutput["listCategories"]>;

interface TransactionsContainerProps {
  children: (props: { transactions: TransactionsData; categories: CategoriesData }) => ReactNode;
}

export function TransactionsContainer({ children }: TransactionsContainerProps) {
  const { data: transactionsData } = useSuspenseQuery<DashboardListTransactionsOutput>(
    DASHBOARD_LIST_TRANSACTIONS_QUERY,
  );
  const { data: categoriesData } = useSuspenseQuery<DashboardListCategoriesOutput>(
    DASHBOARD_LIST_CATEGORIES_QUERY,
  );

  const transactions = transactionsData.listTransactions ?? [];
  const categories = categoriesData.listCategories ?? [];

  return children({ transactions, categories });
}
