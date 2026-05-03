import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const categoryTagVariants = cva("", {
  variants: {
    color: {
      blue: "bg-financy-blue-light text-financy-blue-dark",
      purple: "bg-financy-purple-light text-financy-purple-dark",
      orange: "bg-financy-orange-light text-financy-orange-dark",
      pink: "bg-financy-pink-light text-financy-pink-dark",
      yellow: "bg-financy-yellow-light text-financy-yellow-dark",
      green: "bg-financy-green-light text-financy-green-dark",
    },
  },
  defaultVariants: {
    color: "blue",
  },
});

export interface CategoryTagProps extends React.ComponentProps<typeof Badge> {
  color?: VariantProps<typeof categoryTagVariants>["color"];
}

export function CategoryTag({ color, className, ...props }: CategoryTagProps) {
  return (
    <Badge
      className={cn(
        "h-auto rounded-full px-3 py-1 text-sm font-medium",
        categoryTagVariants({ color }),
        className,
      )}
      {...props}
    />
  );
}

export interface CategoryItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  itemsCount: number;
  value: string;
  color?: VariantProps<typeof categoryTagVariants>["color"];
}

export function CategoryItem({
  label,
  itemsCount,
  value,
  color,
  className,
  ...props
}: CategoryItemProps) {
  return (
    <div className={cn("flex w-full items-center gap-1", className)} {...props}>
      <CategoryTag color={color}>{label}</CategoryTag>
      <span className="flex-1 text-right text-sm font-normal text-muted-foreground">
        {itemsCount}
        {" "}
        itens
      </span>
      <span className="w-[88px] shrink-0 text-right text-sm font-semibold text-foreground">
        {value}
      </span>
    </div>
  );
}
