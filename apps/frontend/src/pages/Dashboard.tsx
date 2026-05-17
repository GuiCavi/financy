import { useSuspenseQuery } from "@apollo/client/react";
import { ChevronRight, CircleArrowDown, CircleArrowUp, Plus, Wallet } from "lucide-react";
import { type CSSProperties, Suspense, useMemo } from "react";

import { CategoryItem } from "@/components/CategoryItem";
import { DashboardCard, DashboardCardAction, DashboardCardContent, DashboardCardHeader } from "@/components/DashboardCard";
import { HighlightCard } from "@/components/HighlightCard";
import { TransactionItem } from "@/components/TransactionItem";
import { Button } from "@/components/ui/button";
import { DashboardCategoriesContainer } from "@/containers/DashboardCategoriesContainer";
import { DashboardTransactionsContainer } from "@/containers/DashboardTransactionsContainer";
import { DASHBOARD_LIST_TRANSACTIONS_QUERY } from "@/graphql/queries";
import { type DashboardListTransactionsOutput, TransactionValueType } from "@/types/transaction";
import { formatDate, formatMoney } from "@/utils/text";

function useDashboardHighhlights() {
  const { data } = useSuspenseQuery<DashboardListTransactionsOutput>(DASHBOARD_LIST_TRANSACTIONS_QUERY);

  const summary = useMemo(() => {
    if (!data.listTransactions) {
      return {
        totalValue: 0,
        totalIncome: 0,
        totalExpenses: 0,
      };
    }

    const totalValue = data.listTransactions.reduce((acc, transaction) => acc + (transaction.amount * (transaction.type === TransactionValueType.EXPENSE ? -1 : 1)), 0);
    const totalIncome = data.listTransactions.reduce((acc, transaction) => transaction.type === TransactionValueType.INCOME ? acc + transaction.amount : acc, 0);
    const totalExpenses = data.listTransactions.reduce((acc, transaction) => transaction.type === TransactionValueType.EXPENSE ? acc + transaction.amount : acc, 0);

    return {
      totalValue,
      totalIncome,
      totalExpenses,
    };
  }, [data.listTransactions]);

  return summary;
}

export default function Dashboard() {
  const summary = useDashboardHighhlights();

  return (
    <div className="p-12 grid grid-cols-1 gap-6">
      <div className="auto-grid gap-6" style={{ "--auto-grid-min": "300px", "--auto-grid-type": "auto-fit" } as CSSProperties}>
        <HighlightCard icon={<Wallet className="size-5 text-financy-purple-base" />} title="Saldo total" value={formatMoney(summary.totalValue)} />
        <HighlightCard icon={<CircleArrowUp className="size-5 text-financy-green-base" />} title="Receitas do mês" value={formatMoney(summary.totalIncome)} />
        <HighlightCard icon={<CircleArrowDown className="size-5 text-financy-red-base" />} title="Despesas do mês" value={formatMoney(summary.totalExpenses)} />
      </div>

      <div className="auto-grid gap-6" style={{ "--auto-grid-min": "300px", "--auto-grid-type": "auto-fit" } as CSSProperties}>
        <DashboardCard className="col-span-2">
          <DashboardCardHeader
            action={
              <DashboardCardAction icon={<ChevronRight className="size-5" />}>
                Ver todas
              </DashboardCardAction>
            }
          >
            Transações recentes
          </DashboardCardHeader>

          <DashboardCardContent className="p-0">
            <Suspense fallback={<span>Carregando transações...</span>}>
              <DashboardTransactionsContainer>
                {(transactions) => (
                  transactions.map((transaction) => (
                    <TransactionItem
                      key={transaction.id}
                      description={transaction.description}
                      date={formatDate(transaction.date)}
                      amount={transaction.amount}
                      type={transaction.type}
                      category={transaction.category}
                    />
                  ))
                )}
              </DashboardTransactionsContainer>
            </Suspense>
          </DashboardCardContent>

          <div className="flex items-center justify-center border-t border-border p-5 px-6">
            <Button
              variant="ghost"
              size="xs"
              type="button"
              className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              <Plus className="size-5" />
              {" "}
              Nova transação
            </Button>
          </div>
        </DashboardCard>

        <DashboardCard>
          <DashboardCardHeader
            action={
              <DashboardCardAction icon={<ChevronRight className="size-5" />}>
                Gerenciar
              </DashboardCardAction>
            }
          >
            Categorias
          </DashboardCardHeader>

          <DashboardCardContent className="gap-5">
            <Suspense fallback={<span>Carregando categorias...</span>}>
              <DashboardCategoriesContainer>
                {(categories) => (
                  categories.map((category) => (
                    <CategoryItem
                      key={category.id}
                      label={category.name}
                      itemsCount={category.transactionsCount}
                      value={formatMoney(category.totalAmount)}
                      color={category.color}
                    />
                  ))
                )}
              </DashboardCategoriesContainer>
            </Suspense>
          </DashboardCardContent>
        </DashboardCard>
      </div>
    </div >
  );
}
