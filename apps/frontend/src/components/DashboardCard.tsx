import { cn } from "@/lib/utils";
import type { PropsWithChildren, ComponentProps } from "react";

export function DashboardCard({ className, ...props }: PropsWithChildren<ComponentProps<"div">>) {
  return <div className={cn("rounded-xl border border-border bg-card p-6", className)} {...props} />;
}
