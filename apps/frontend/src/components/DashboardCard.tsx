import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DashboardCard({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col rounded-xl border border-border bg-card", className)} {...props} />;
}

export interface DashboardCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  action?: React.ReactNode;
}

export function DashboardCardHeader({ className, children, action, ...props }: DashboardCardHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between border-b border-border pl-6 pr-3 py-5", className)} {...props}>
      <h2 className="text-xs font-medium uppercase tracking-[0.05em] text-muted-foreground">
        {children}
      </h2>
      {action}
    </div>
  );
}

export interface DashboardCardActionProps extends React.ComponentProps<typeof Button> {
  icon?: React.ReactNode;
}

export function DashboardCardAction({ className, children, icon, ...props }: DashboardCardActionProps) {
  return (
    <Button
      variant="ghost"
      size="xs"
      className={cn("flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80", className)}
      {...props}
    >
      {children}
      {icon}
    </Button>
  );
}

export function DashboardCardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col p-6", className)} {...props} />;
}
