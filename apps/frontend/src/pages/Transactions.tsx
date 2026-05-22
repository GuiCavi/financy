import { Suspense } from "react";

import { AddTransactionDialog } from "@/components/AddTransactionDialog";
import { PageHeader } from "@/components/PageHeader";
import { TransactionsContent } from "@/components/TransactionsContent";
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
                <AddTransactionDialog categories={categories} />
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