import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { CategoryTag } from "@/components/CategoryItem";
import { cn } from "@/lib/utils";
import type { CategoryColor } from "@/utils/icons";
import { CategoryIconMap, TransactionTypeIconMap } from "@/utils/icons";

export interface TransactionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  description: string;
  date: string;
  amount: number;
  type: keyof typeof TransactionTypeIconMap;
  category: {
    name: string;
    icon: string;
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
        <ValueIcon className="size-4 text-muted-foreground" />
      </div>
    </div>
  );
}

const categoryIconVariants = cva("flex size-10 shrink-0 items-center justify-center rounded-lg", {
  variants: {
    color: {
      blue: "bg-financy-blue-light text-financy-blue-dark dark:text-financy-blue-light dark:bg-financy-blue-dark",
      purple: "bg-financy-purple-light text-financy-purple-dark dark:text-financy-purple-light dark:bg-financy-purple-dark",
      orange: "bg-financy-orange-light text-financy-orange-dark dark:text-financy-orange-light dark:bg-financy-orange-dark",
      pink: "bg-financy-pink-light text-financy-pink-dark dark:text-financy-pink-light dark:bg-financy-pink-dark",
      yellow: "bg-financy-yellow-light text-financy-yellow-dark dark:text-financy-yellow-light dark:bg-financy-yellow-dark",
      green: "bg-financy-green-light text-financy-green-dark dark:text-financy-green-light dark:bg-financy-green-dark",
      red: "bg-financy-red-light text-financy-red-dark dark:text-financy-red-light dark:bg-financy-red-dark",
    },
  },
  defaultVariants: {
    color: "blue",
  },
});

export interface CategoryIconContainerProps extends React.ComponentProps<"div"> {
  color?: VariantProps<typeof categoryIconVariants>["color"];
  icon: string;
}

function CategoryIconContainer({ icon, color }: CategoryIconContainerProps) {
  const Icon = CategoryIconMap[icon];

  return (
    <div className={categoryIconVariants({ color })}>
      <Icon className="size-5" />
    </div>
  );
}