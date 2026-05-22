import { CombinedGraphQLErrors } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddCategoryForm } from "@/forms/AddCategoryForm";
import { CREATE_CATEGORY_MUTATION } from "@/graphql/mutations";
import { DASHBOARD_LIST_CATEGORIES_QUERY } from "@/graphql/queries";

export function AddCategoryDialog() {
  const [open, setOpen] = useState(false);

  const [createCategory] = useMutation(CREATE_CATEGORY_MUTATION, {
    onError: (error) => {
      if (CombinedGraphQLErrors.is(error)) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Não foi possível criar a categoria");
      }
    },
    onCompleted: () => {
      toast.success("Categoria criada com sucesso");
    },
    refetchQueries: [{ query: DASHBOARD_LIST_CATEGORIES_QUERY }],
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="flex items-center gap-2 bg-financy-brand-base px-3 py-2">
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
