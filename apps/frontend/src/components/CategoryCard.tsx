import { SquarePen, Trash } from "lucide-react";

import { CategoryTag } from "@/components/CategoryItem";
import { DashboardCard, DashboardCardContent } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DashboardListCategoriesOutput } from "@/types/category";
import { CategoryColorVariants } from "@/utils/colors";
import { CategoryIconMap } from "@/utils/icons";
import { formatCount } from "@/utils/text";

type Category = NonNullable<DashboardListCategoriesOutput["listCategories"]>[number];

export function CategoryCard({ category }: { category: Category }) {
  const Icon = CategoryIconMap[category.icon as keyof typeof CategoryIconMap] || CategoryIconMap.asterisk;

  return (
    <DashboardCard className="group relative">
      <DashboardCardContent className="flex flex-col gap-8 h-full">
        <div className="flex flex-row justify-between">
          <div className={cn(
            "size-10 rounded-lg flex items-center justify-center",
            CategoryColorVariants[category.color as keyof typeof CategoryColorVariants] || CategoryColorVariants.blue,
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
