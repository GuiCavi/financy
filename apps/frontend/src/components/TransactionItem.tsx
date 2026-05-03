import {
  BriefcaseBusiness,
  CarFront,
  CircleArrowDown,
  CircleArrowUp,
  PiggyBank,
  ShoppingCart,
  Utensils,
} from "lucide-react";
import * as React from "react";

import { CategoryTag } from "@/components/CategoryItem";
import { cn } from "@/lib/utils";

export type IconName = "BriefcaseBusiness" | "Utensils" | "CarFront" | "ShoppingCart" | "PiggyBank";

export interface Transaction {
  id: string;
  title: string;
  date: string;
  category: {
    label: string;
    color: "blue" | "purple" | "orange" | "green" | "pink" | "yellow";
  };
  amount: number;
  type: "income" | "expense";
  iconName: IconName;
}

const iconMap: Record<IconName, React.ElementType> = {
  BriefcaseBusiness,
  Utensils,
  CarFront,
  ShoppingCart,
  PiggyBank,
};

export interface TransactionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  transaction: Transaction;
}

export function TransactionItem({ transaction, className, ...props }: TransactionItemProps) {
  const Icon = iconMap[transaction.iconName];
  const isIncome = transaction.type === "income";
  const ValueIcon = isIncome ? CircleArrowUp : CircleArrowDown;

  return (
    <div className={cn("flex items-center border-b border-border p-5 px-6", className)} {...props}>
      <div className="flex flex-1 items-center gap-4">
        <div className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
          `bg-financy-${transaction.category.color}-light`,
        )}
        >
          <Icon className={cn(
            "size-5",
            `text-financy-${transaction.category.color}-dark`,
          )}
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-base font-medium text-foreground">{transaction.title}</span>
          <span className="text-sm font-normal text-muted-foreground">{transaction.date}</span>
        </div>
      </div>

      <div className="flex w-[160px] shrink-0 items-center justify-center">
        <CategoryTag color={transaction.category.color}>{transaction.category.label}</CategoryTag>
      </div>

      <div className="flex w-[160px] shrink-0 items-center justify-end gap-2">
        <span className="text-sm font-semibold text-foreground">
          {isIncome ? "+" : "-"}
          {" "}
          R$
          {Math.abs(transaction.amount).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
        <ValueIcon className="size-4 text-muted-foreground" />
      </div>
    </div>
  );
}
