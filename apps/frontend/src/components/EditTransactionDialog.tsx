import { CombinedGraphQLErrors } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { SquarePen } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TransactionForm } from "@/forms/TransactionForm";
import { UPDATE_TRANSACTION_MUTATION } from "@/graphql/mutations";
import { DASHBOARD_LIST_CATEGORIES_QUERY, DASHBOARD_LIST_TRANSACTIONS_QUERY } from "@/graphql/queries";
import type { DashboardListTransactionsOutput } from "@/types/transaction";

type Transaction = NonNullable<DashboardListTransactionsOutput["listTransactions"]>[number];

interface EditTransactionDialogProps {
  transaction: Transaction;
  categories: { id: string; name: string }[];
}

export function EditTransactionDialog({ transaction, categories }: EditTransactionDialogProps) {
  const [open, setOpen] = useState(false);

  const [updateTransaction] = useMutation(UPDATE_TRANSACTION_MUTATION, {
    onError: (error) => {
      if (CombinedGraphQLErrors.is(error)) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Não foi possível atualizar a transação");
      }
    },
    onCompleted: () => {
      toast.success("Transação atualizada com sucesso");
      setOpen(false);
    },
    refetchQueries: [
      { query: DASHBOARD_LIST_TRANSACTIONS_QUERY },
      { query: DASHBOARD_LIST_CATEGORIES_QUERY },
    ],
  });

  // Convert the ISO/full date back into YYYY-MM-DD for the date input
  const formattedDate = transaction.date
    ? new Date(transaction.date).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="icon-sm" className="hover:bg-accent hover:text-accent-foreground">
            <SquarePen className="size-4" />
          </Button>
        }
      />
      <DialogContent className="max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="font-semibold text-lg">Editar transação</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Atualize as informações da transação financeira
          </DialogDescription>
        </DialogHeader>
        <TransactionForm
          categories={categories}
          defaultValues={{
            description: transaction.description,
            amount: transaction.amount,
            categoryId: transaction.category.id,
            date: formattedDate,
            type: transaction.type,
          }}
          onSubmit={async (value) => {
            await updateTransaction({
              variables: {
                updateTransactionId: transaction.id,
                data: {
                  description: value.description,
                  amount: Number(value.amount),
                  categoryId: value.categoryId,
                  date: new Date(value.date).toISOString(),
                  type: value.type,
                },
              },
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
