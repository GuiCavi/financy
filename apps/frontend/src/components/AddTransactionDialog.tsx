import { CombinedGraphQLErrors } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { type PropsWithChildren, type ReactElement, useState } from "react";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TransactionForm } from "@/forms/TransactionForm";
import { CREATE_TRANSACTION_MUTATION } from "@/graphql/mutations";
import { DASHBOARD_LIST_CATEGORIES_QUERY, DASHBOARD_LIST_TRANSACTIONS_QUERY } from "@/graphql/queries";

interface AddTransactionDialogProps {
  categories: { id: string; name: string }[];
}

export function AddTransactionDialog({ categories, children }: PropsWithChildren<AddTransactionDialogProps>) {
  const [open, setOpen] = useState(false);

  const [createTransaction] = useMutation(CREATE_TRANSACTION_MUTATION, {
    onError: (error) => {
      if (CombinedGraphQLErrors.is(error)) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Não foi possível criar a transação");
      }
    },
    onCompleted: () => {
      toast.success("Transação criada com sucesso");
      setOpen(false);
    },
    refetchQueries: [
      { query: DASHBOARD_LIST_TRANSACTIONS_QUERY },
      { query: DASHBOARD_LIST_CATEGORIES_QUERY },
    ],
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children as ReactElement} />
      <DialogContent className="sm:max-w-md ">
        <DialogHeader>
          <DialogTitle className="font-semibold text-lg">Nova transação</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Adicione uma nova transação financeira
          </DialogDescription>
        </DialogHeader>
        <TransactionForm
          categories={categories}
          onSubmit={async (value) => {
            await createTransaction({
              variables: {
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
