import { useSuspenseQuery } from "@apollo/client/react";

import { DASHBOARD_LIST_TRANSACTIONS_QUERY } from "@/graphql/queries";
import type { DashboardListTransactionsOutput } from "@/types/transaction";

export function DashboardTransactionsContainer({ children }: { children: (data: NonNullable<DashboardListTransactionsOutput["listTransactions"]>) => void }) {
  const { data } = useSuspenseQuery<DashboardListTransactionsOutput>(DASHBOARD_LIST_TRANSACTIONS_QUERY);

  if (!data.listTransactions) {
    return <span>Nenhuma transação encontrada</span>;
  }

  return (
    <>
      {children(data.listTransactions)}
    </>
  );
}
