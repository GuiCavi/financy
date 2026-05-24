import { Plus } from "lucide-react";
import { Suspense } from "react";

import { AddTransactionDialog } from "@/components/AddTransactionDialog";
import { PageHeader } from "@/components/PageHeader";
import { TransactionsContent } from "@/components/TransactionsContent";
import { Button } from "@/components/ui/button";
import { TransactionsContainer } from "@/containers/TransactionsContainer";

export default function Transactions() {
  return (
    <div className="p-12 flex flex-col gap-6">
      <PageHeader
        title="Transações"
        description="Gerencie e acompanhe seus ganhos e despesas"
        action={
          <Suspense fallback={null}>
            <TransactionsContainer>
              {({ categories }) => (
                <AddTransactionDialog categories={categories}>
                  <Button className="flex items-center gap-2 bg-financy-brand-base text-white px-3 py-2 hover:bg-financy-brand-dark transition-colors rounded-md text-sm font-semibold">
                    <Plus className="size-4" />
                    Nova transação
                  </Button>
                </AddTransactionDialog>
              )}
            </TransactionsContainer>
          </Suspense>
        }
      />

      <Suspense fallback={<div className="text-muted-foreground">Carregando transações...</div>}>
        <TransactionsContainer>
          {({ transactions, categories }) => (
            <TransactionsContent transactions={transactions} categories={categories} />
          )}
        </TransactionsContainer>
      </Suspense>
    </div>
  );
}