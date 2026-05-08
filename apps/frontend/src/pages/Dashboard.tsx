import { useSuspenseQuery } from "@apollo/client/react";
import { ChevronRight, CircleArrowDown, CircleArrowUp, Plus, Wallet } from "lucide-react";
import { Suspense } from "react";

import { CategoryItem } from "@/components/CategoryItem";
import { DashboardCard, DashboardCardAction, DashboardCardContent, DashboardCardHeader } from "@/components/DashboardCard";
import { HighlightCard } from "@/components/HighlightCard";
import { TransactionItem } from "@/components/TransactionItem";
import { Button } from "@/components/ui/button";
import { DASHBOARD_LIST_CATEGORIES_QUERY, DASHBOARD_LIST_TRANSACTIONS_QUERY } from "@/graphql/queries";
import type { DashboardListCategoriesOutput } from "@/types/category";
import type { DashboardListTransactionsOutput } from "@/types/transaction";
import { formatDate, formatMoney } from "@/utils/text";

export default function Dashboard() {
  return (
    <div className="p-12 grid grid-cols-1 gap-6">
      <div className="grid grid-cols-3 gap-6">
        <HighlightCard icon={<Wallet className="size-5 text-financy-purple-base" />} title="Saldo total" value="R$ 12.847,32" />
        <HighlightCard icon={<CircleArrowUp className="size-5 text-financy-green-base" />} title="Receitas do mês" value="R$ 12.847,32" />
        <HighlightCard icon={<CircleArrowDown className="size-5 text-financy-red-base" />} title="Despesas do mês" value="R$ 12.847,32" />
      </div>

      <div className="grid grid-cols-3 gap-6">
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
              <TransactionsContainer>
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
              </TransactionsContainer>
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
              <CategoriesContainer>
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
              </CategoriesContainer>
            </Suspense>
          </DashboardCardContent>
        </DashboardCard>
      </div>
    </div >
  );
}

function CategoriesContainer({ children }: { children: (data: NonNullable<DashboardListCategoriesOutput["listCategories"]>) => void }) {
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

function TransactionsContainer({ children }: { children: (data: NonNullable<DashboardListTransactionsOutput["listTransactions"]>) => void }) {
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