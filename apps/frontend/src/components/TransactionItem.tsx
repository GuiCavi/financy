import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { CategoryTag } from "@/components/CategoryItem";
import { cn } from "@/lib/utils";
import { TransactionValueType } from "@/types/transaction";
import type { CategoryColor } from "@/utils/colors";
import { CategoryColorVariants, TransactionTypeColorVariants } from "@/utils/colors";
import { CategoryIconMap, TransactionTypeIconMap } from "@/utils/icons";
import { formatMoney } from "@/utils/text";

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

interface TransactionAmountProps extends React.HTMLAttributes<HTMLSpanElement> {
  amount: number;
  type: keyof typeof TransactionValueType;
}

export function TransactionAmount({ amount, type, className, ...props }: TransactionAmountProps) {
  const isIncome = type === TransactionValueType.INCOME;

  return (
    <span className={cn("text-sm font-semibold", className)} {...props}>
      {isIncome ? "+" : "-"}
      {" "}
      {formatMoney(Math.abs(amount), {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </span>
  );
}

export function TransactionItem({ className, ...props }: TransactionItemProps) {
  const ValueIcon = TransactionTypeIconMap[props.type];

  return (
    <div className={cn("flex items-center border-b border-border p-5 px-6", className)} {...props}>
      <div className="flex items-center gap-4">
        <CategoryIconContainer icon={props.category.icon} color={props.category.color} />

        <div className="flex flex-col gap-0.5">
          <span className="text-base font-medium text-foreground">{props.description}</span>
          <span className="text-sm font-normal text-muted-foreground">{props.date}</span>
        </div>
      </div>

      <div className="flex ml-auto w-40 px-4 shrink-0 items-center justify-center">
        <CategoryTag color={props.category.color}>{props.category.name}</CategoryTag>
      </div>

      <div className="flex shrink-0 w-40 items-center justify-end gap-2">
        <TransactionAmount amount={props.amount} type={props.type} />
        <ValueIcon className={`size-4 ${TransactionTypeColorVariants[props.type]}`} />
      </div>
    </div>
  );
}

const categoryIconVariants = cva("flex size-10 shrink-0 items-center justify-center rounded-lg", {
  variants: {
    color: CategoryColorVariants,
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