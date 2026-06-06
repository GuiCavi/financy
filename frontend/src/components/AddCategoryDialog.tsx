import { type PropsWithChildren, type ReactElement, useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddCategoryForm } from "@/forms/AddCategoryForm";
import { useCreateCategory } from "@/hooks/use-create-category";

export function AddCategoryDialog({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const { createCategory } = useCreateCategory();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children as ReactElement} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-semibold">Nova categoria</DialogTitle>
          <DialogDescription className="text-sm">
            Adicione uma nova categoria para suas transações
          </DialogDescription>
        </DialogHeader>
        <AddCategoryForm
          onSubmit={async (value) => {
            await createCategory({
              variables: {
                data: {
                  name: value.name,
                  description: value.description,
                  icon: value.icon,
                  color: value.color,
                },
              },
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
