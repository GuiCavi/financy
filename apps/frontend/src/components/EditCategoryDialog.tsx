import { CombinedGraphQLErrors } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { SquarePen } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddCategoryForm } from "@/forms/AddCategoryForm";
import { UPDATE_CATEGORY_MUTATION } from "@/graphql/mutations";
import { DASHBOARD_LIST_CATEGORIES_QUERY } from "@/graphql/queries";
import type { DashboardListCategoriesOutput } from "@/types/category";

type Category = NonNullable<DashboardListCategoriesOutput["listCategories"]>[number];

export function EditCategoryDialog({ category }: { category: Category }) {
  const [open, setOpen] = useState(false);

  const [updateCategory] = useMutation(UPDATE_CATEGORY_MUTATION, {
    onError: (error) => {
      if (CombinedGraphQLErrors.is(error)) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Não foi possível atualizar a categoria");
      }
    },
    onCompleted: () => {
      toast.success("Categoria atualizada com sucesso");
      setOpen(false);
    },
    refetchQueries: [{ query: DASHBOARD_LIST_CATEGORIES_QUERY }],
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="icon-sm">
            <SquarePen className="size-4" />
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-semibold">Editar categoria</DialogTitle>
          <DialogDescription className="text-sm">
            Atualize as informações da categoria
          </DialogDescription>
        </DialogHeader>
        <AddCategoryForm
          defaultValues={{
            name: category.name,
            icon: category.icon,
            color: category.color,
          }}
          onSubmit={async (value) => {
            await updateCategory({
              variables: {
                updateCategoryId: category.id,
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
