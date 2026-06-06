import { DashboardCard, DashboardCardContent } from "@/components/DashboardCard";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";

import type { ReactNode } from "react";

export function HighlightCard({
  icon,
  title,
  value,
}: {
  icon: ReactNode;
  title: string;
  value: string;
}) {
  return (
    <DashboardCard>
      <DashboardCardContent>
        <Item className="gap-3 p-0">
          <ItemMedia>{icon}</ItemMedia>
          <ItemContent>
            <ItemTitle className="text-financy-grayscale-500 uppercase font-medium">{title}</ItemTitle>
          </ItemContent>
        </Item>

        <p className="text-3xl font-bold text-foreground mt-4">{value}</p>
      </DashboardCardContent>
    </DashboardCard>
  );
}