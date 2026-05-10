import { DashboardCard } from "@/components/DashboardCard";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";

import type { ReactNode } from "react";

type CategoriesHighlightCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export function CategoriesHighlightCard({ icon, title, description }: CategoriesHighlightCardProps) {
  return (
    <DashboardCard className="p-6 self-stretch">
      <Item className="gap-4">
        <ItemMedia variant="icon" className="mt-1">{icon}</ItemMedia>
        <ItemContent className="gap-2 w-full overflow-hidden">
          <ItemTitle className="text-3xl font-bold text-foreground truncate">{title}</ItemTitle>
          <ItemDescription className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {description}
          </ItemDescription>
        </ItemContent>
      </Item>
    </DashboardCard>
  );
}
