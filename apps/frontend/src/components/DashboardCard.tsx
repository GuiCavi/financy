import * as React from "react";

import { cn } from "@/lib/utils";

export function DashboardCard({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col rounded-xl border border-border bg-card", className)} {...props} />;
}

export interface DashboardCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  action?: React.ReactNode;
}

export function DashboardCardHeader({ className, children, action, ...props }: DashboardCardHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between border-b border-border px-6 py-5", className)} {...props}>
      <h2 className="text-xs font-medium uppercase tracking-[0.05em] text-muted-foreground">
        {children}
      </h2>
      {action}
    </div>
  );
}

export function DashboardCardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col p-6", className)} {...props} />;
}
