import { Suspense } from "react";

import { AddCategoryDialog } from "@/components/AddCategoryDialog";
import { CategoriesContent } from "@/components/CategoriesContent";
import { PageHeader } from "@/components/PageHeader";
import { CategoriesContainer } from "@/containers/CategoriesContainer";

export default function Categories() {
  return (
    <div className="p-12 flex flex-col gap-6">
      <PageHeader
        title="Categorias"
        description="Organize suas transações por categorias"
        action={<AddCategoryDialog />}
      />

      <Suspense fallback={<div className="text-muted-foreground">Carregando categorias...</div>}>
        <CategoriesContainer>
          {(categories) => (
            <CategoriesContent categories={categories} />
          )}
        </CategoriesContainer>
      </Suspense>
    </div>
  );
}