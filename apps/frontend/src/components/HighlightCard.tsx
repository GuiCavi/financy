import { DashboardCard, DashboardCardContent } from "@/components/DashboardCard";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";

export function HighlightCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
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