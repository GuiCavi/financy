import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { CategoryTag } from "@/components/CategoryItem";
import { cn } from "@/lib/utils";
import { categoryColorVariants, TransactionTypeColorVariants } from "@/utils/colors";
import type { CategoryColor } from "@/utils/colors";
import { CategoryIconMap, TransactionTypeIconMap } from "@/utils/icons";

export interface TransactionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  description: string;
  date: string;
  amount: number;
  type: keyof typeof TransactionTypeIconMap;
  category: {
    name: string;
    icon: keyof typeof CategoryIconMap;
    color: CategoryColor;
  };
}

export function TransactionItem({ className, ...props }: TransactionItemProps) {
  const isIncome = props.type === "INCOME";
  const ValueIcon = TransactionTypeIconMap[props.type];

  return (
    <div className={cn("flex items-center border-b border-border p-5 px-6", className)} {...props}>
      <div className="flex flex-1 items-center gap-4">
        <CategoryIconContainer icon={props.category.icon} color={props.category.color} />

        <div className="flex flex-col gap-0.5">
          <span className="text-base font-medium text-foreground">{props.description}</span>
          <span className="text-sm font-normal text-muted-foreground">{props.date}</span>
        </div>
      </div>

      <div className="flex w-[160px] shrink-0 items-center justify-center">
        <CategoryTag color={props.category.color}>{props.category.name}</CategoryTag>
      </div>

      <div className="flex w-[160px] shrink-0 items-center justify-end gap-2">
        <span className="text-sm font-semibold text-foreground">
          {isIncome ? "+" : "-"}
          {" "}
          R$
          {Math.abs(props.amount).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
        <ValueIcon className={`size-4 ${TransactionTypeColorVariants[props.type]}`} />
      </div>
    </div>
  );
}

const categoryIconVariants = cva("flex size-10 shrink-0 items-center justify-center rounded-lg", {
  variants: {
    color: categoryColorVariants,
  },
  defaultVariants: {
    color: "blue",
  },
});

export interface CategoryIconContainerProps extends React.ComponentProps<"div"> {
  color?: VariantProps<typeof categoryIconVariants>["color"];
  icon: keyof typeof CategoryIconMap;
}

function CategoryIconContainer({ icon, color }: CategoryIconContainerProps) {
  const Icon = CategoryIconMap[icon];

  return (
    <div className={categoryIconVariants({ color })}>
      <Icon className="size-5" />
    </div>
  );
}