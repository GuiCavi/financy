import { ArrowUpDown, Tag } from "lucide-react";
import { type CSSProperties, useMemo } from "react";

import { CategoriesHighlightCard } from "@/components/CategoriesHighlightCard";
import { CategoryCard } from "@/components/CategoryCard";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { cn } from "@/lib/utils";
import type { DashboardListCategoriesOutput } from "@/types/category";
import { CategoryColorTexts } from "@/utils/colors";
import { CategoryIconMap } from "@/utils/icons";

import { AddCategoryDialog } from "./AddCategoryDialog";

type Category = NonNullable<DashboardListCategoriesOutput["listCategories"]>[number];

export function CategoriesContent({ categories }: { categories: Category[] }) {
  const summary = useMemo(() => {
    const totalCategories = categories.length;
    const totalTransactions = categories.reduce((acc, cat) => acc + cat.transactionsCount, 0);
    const mostUsedCategory = [...categories].sort((a, b) => b.transactionsCount - a.transactionsCount)[0];

    return {
      totalCategories,
      totalTransactions,
      mostUsedCategory,
    };
  }, [categories]);

  const Icon = summary.mostUsedCategory ? CategoryIconMap[summary.mostUsedCategory.icon] : CategoryIconMap.asterisk;
  const color = summary.mostUsedCategory ? summary.mostUsedCategory.color : "blue";

  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="auto-grid gap-6" style={{ "--auto-grid-min": "300px", "--auto-grid-type": "auto-fit" } as CSSProperties}>
        <CategoriesHighlightCard
          icon={<Tag className="size-6 text-financy-grayscale-700 dark:text-financy-grayscale-100" />}
          title={String(summary.totalCategories)}
          description="Total de categorias"
        />
        <CategoriesHighlightCard
          icon={<ArrowUpDown className="size-6 text-financy-purple-base" />}
          title={String(summary.totalTransactions)}
          description="Total de transações"
        />
        <CategoriesHighlightCard
          icon={<Icon className={cn("size-6", CategoryColorTexts[color], "bg-transparent dark:bg-transparent")} />}
          title={summary.mostUsedCategory?.name || "Nenhuma"}
          description="Categoria mais utilizada"
        />
      </div>

      {categories.length === 0 && (
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Tag />
              </EmptyMedia>
              <EmptyTitle>Nenhuma categoria encontrada</EmptyTitle>
              <EmptyDescription>Experimente adicionar uma nova categoria</EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center gap-2">
              <AddCategoryDialog>
                <Button variant="outline" size="sm">Nova categoria</Button>
              </AddCategoryDialog>
            </EmptyContent>
          </Empty>
        </div>
      )}

      <div className="grid gap-4 items-stretch auto-grid">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
