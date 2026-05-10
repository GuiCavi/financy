import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CategoryColorVariants } from "@/utils/colors";
import { formatCount } from "@/utils/text";

export const categoryTagVariants = cva("", {
  variants: {
    color: CategoryColorVariants,
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
        {formatCount(itemsCount)}
      </span>
      <span className="w-[88px] shrink-0 text-right text-sm font-semibold text-foreground">
        {value}
      </span>
    </div>
  );
}
