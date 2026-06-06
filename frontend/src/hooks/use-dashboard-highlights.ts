import { useSuspenseQuery } from "@apollo/client/react";
import { useMemo } from "react";

import { DASHBOARD_LIST_TRANSACTIONS_QUERY } from "@/graphql/queries";
import { type DashboardListTransactionsOutput, TransactionValueType } from "@/types/transaction";
import { isCurrentMonthAndYear } from "@/utils/date";

export function useDashboardHighhlights() {
  const { data } = useSuspenseQuery<DashboardListTransactionsOutput>(DASHBOARD_LIST_TRANSACTIONS_QUERY);

  const summary = useMemo(() => {
    if (!data.listTransactions) {
      return {
        totalValue: 0,
        monthlyIncomeTotal: 0,
        monthlyExpenseTotal: 0,
      };
    }

    const totalValue = data.listTransactions.reduce((acc, transaction) => acc + (transaction.amount * (transaction.type === TransactionValueType.EXPENSE ? -1 : 1)), 0);
    const monthlyIncomeTotal = data.listTransactions.reduce((acc, transaction) => {
      if (isCurrentMonthAndYear(transaction.date) && transaction.type === TransactionValueType.INCOME) {
        return acc + transaction.amount;
      }
      return acc;
    }, 0);

    const monthlyExpenseTotal = data.listTransactions.reduce((acc, transaction) => {
      if (isCurrentMonthAndYear(transaction.date) && transaction.type === TransactionValueType.EXPENSE) {
        return acc + transaction.amount;
      }
      return acc;
    }, 0);

    return {
      totalValue,
      monthlyIncomeTotal,
      monthlyExpenseTotal,
    };
  }, [data.listTransactions]);

  return summary;
}
