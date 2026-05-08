import { ArrowUpDown, Edit, Plus, SquarePen, Tag, Trash } from "lucide-react";
import { type ReactNode, Suspense, useMemo } from "react";

import { CategoryTag } from "@/components/CategoryItem";
import { DashboardCard, DashboardCardContent } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { CategoriesContainer } from "@/containers/CategoriesContainer";
import { cn } from "@/lib/utils";
import type { DashboardListCategoriesOutput } from "@/types/category";
import { categoryColorVariants } from "@/utils/colors";
import { CategoryIconMap } from "@/utils/icons";
import { formatCount } from "@/utils/text";

type Category = NonNullable<DashboardListCategoriesOutput["listCategories"]>[number];

export default function Categories() {
  return (
    <div className="p-12 flex flex-col gap-6">
      <PageHeader
        title="Categorias"
        description="Organize suas transações por categorias"
        action={
          <Button className="flex items-center gap-2 bg-financy-brand-base px-3 py-2" size="sm">
            <Plus className="size-5" />
            Nova categoria
          </Button>
        }
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

function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div>
        {action}
      </div>
    </div>
  );
}

function CategoriesContent({ categories }: { categories: Category[] }) {
  const summary = useMemo(() => {
    const totalCategories = categories.length;
    const totalTransactions = categories.reduce((acc, cat) => acc + (cat.transactionsCount || 0), 0);
    const mostUsedCategory = [...categories].sort((a, b) => (b.transactionsCount || 0) - (a.transactionsCount || 0))[0];

    return {
      totalCategories,
      totalTransactions,
      mostUsedCategory,
    };
  }, [categories]);

  const Icon = summary.mostUsedCategory?.icon ? CategoryIconMap[summary.mostUsedCategory.icon] : CategoryIconMap.asterisk;
  const color = summary.mostUsedCategory?.color || "blue";

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="grid grid-cols-3 gap-6">
        <CategoriesHightlightCard
          icon={<Tag className="size-6 text-financy-grayscale-700" />}
          title={String(summary.totalCategories)}
          description="Total de categorias"
        />
        <CategoriesHightlightCard
          icon={<ArrowUpDown className="size-6 text-financy-purple-base" />}
          title={String(summary.totalTransactions)}
          description="Total de transações"
        />
        <CategoriesHightlightCard
          icon={<Icon className={cn("size-6", categoryColorVariants[color], "bg-transparent")} />}
          title={summary.mostUsedCategory?.name || "Nenhuma"}
          description="Categoria mais utilizada"
        />
      </div>

      <div className="grid grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}

function CategoriesHightlightCard({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <DashboardCard className="p-6">
      <Item className="gap-4">
        <ItemMedia variant="icon" className="mt-1">
          {icon}
        </ItemMedia>
        <ItemContent className="gap-2">
          <ItemTitle className="text-3xl font-bold text-foreground">{title}</ItemTitle>
          <ItemDescription className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {description}
          </ItemDescription>
        </ItemContent>
      </Item>
    </DashboardCard>
  );
}

function CategoryCard({ category }: { category: Category }) {
  const Icon = CategoryIconMap[category.icon as keyof typeof CategoryIconMap] || CategoryIconMap.asterisk;

  return (
    <DashboardCard className="group relative">
      <DashboardCardContent className="flex flex-col gap-8 h-full">
        <div className="flex flex-row justify-between">
          <div className={cn(
            "size-10 rounded-lg flex items-center justify-center",
            categoryColorVariants[category.color as keyof typeof categoryColorVariants] || categoryColorVariants.blue,
          )}
          >
            <Icon className="size-4" />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon-sm">
              <Trash className="size-4 text-financy-feedback-danger" />
            </Button>
            <Button variant="outline" size="icon-sm">
              <SquarePen className="size-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-lg text-foreground">{category.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              Gerencie suas transações de
              {" "}
              {category.name.toLowerCase()}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <CategoryTag color={category.color}>{category.name}</CategoryTag>
          <span className="text-sm text-muted-foreground">
            {formatCount(category.transactionsCount || 0)}
          </span>
        </div>
      </DashboardCardContent>
    </DashboardCard>
  );
}