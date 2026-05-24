import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddCategoryForm } from "@/forms/AddCategoryForm";
import { useCreateCategory } from "@/hooks/use-create-category";

export function AddCategoryDialog() {
  const [open, setOpen] = useState(false);
  const { createCategory } = useCreateCategory();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="flex items-center gap-2 text-white px-3 py-2 transition-colors rounded-md text-sm font-semibold">
            <Plus className="size-5" />
            Nova categoria
          </Button>
        }
      />
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
