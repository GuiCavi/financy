import { ChevronRight, CircleArrowDown, CircleArrowUp, Plus, Wallet } from "lucide-react";
import { type CSSProperties, Suspense } from "react";

import { CategoryItem } from "@/components/CategoryItem";
import { DashboardCard, DashboardCardAction, DashboardCardContent, DashboardCardHeader } from "@/components/DashboardCard";
import { HighlightCard } from "@/components/HighlightCard";
import { TransactionItem } from "@/components/TransactionItem";
import { Button } from "@/components/ui/button";
import { DashboardCategoriesContainer } from "@/containers/DashboardCategoriesContainer";
import { DashboardTransactionsContainer } from "@/containers/DashboardTransactionsContainer";
import { useDashboardHighhlights } from "@/hooks/use-dashboard-highlights";
import { formatDate, formatMoney } from "@/utils/text";

export default function Dashboard() {
  const summary = useDashboardHighhlights();

  return (
    <div className="p-12 grid grid-cols-1 gap-6">
      <div className="auto-grid gap-6" style={{ "--auto-grid-min": "300px", "--auto-grid-type": "auto-fit" } as CSSProperties}>
        <HighlightCard icon={<Wallet className="size-5 text-financy-purple-base" />} title="Saldo total" value={formatMoney(summary.totalValue)} />
        <HighlightCard icon={<CircleArrowUp className="size-5 text-financy-green-base" />} title="Receitas do mês" value={formatMoney(summary.monthlyIncomeTotal)} />
        <HighlightCard icon={<CircleArrowDown className="size-5 text-financy-red-base" />} title="Despesas do mês" value={formatMoney(summary.monthlyExpenseTotal)} />
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
