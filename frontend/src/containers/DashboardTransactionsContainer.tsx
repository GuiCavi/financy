import { useSuspenseQuery } from "@apollo/client/react";

import { DASHBOARD_LIST_TRANSACTIONS_QUERY } from "@/graphql/queries";
import type { DashboardListTransactionsOutput } from "@/types/transaction";

import type { ReactNode } from "react";

type TransactionsData = NonNullable<DashboardListTransactionsOutput["listTransactions"]>;

export function DashboardTransactionsContainer({ children }: { children: (data: TransactionsData) => ReactNode }) {
  const { data } = useSuspenseQuery<DashboardListTransactionsOutput>(DASHBOARD_LIST_TRANSACTIONS_QUERY);

  if (!data.listTransactions) {
    return <span>Nenhuma transação encontrada</span>;
  }

  return children(data.listTransactions);
}
