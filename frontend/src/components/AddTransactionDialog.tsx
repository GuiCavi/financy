import { type PropsWithChildren, type ReactElement, useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TransactionForm } from "@/forms/TransactionForm";
import { useCreateTransaction } from "@/hooks/use-create-transaction";

interface AddTransactionDialogProps {
  categories: { id: string; name: string }[];
}

export function AddTransactionDialog({ categories, children }: PropsWithChildren<AddTransactionDialogProps>) {
  const [open, setOpen] = useState(false);
  const { createTransaction } = useCreateTransaction();

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
