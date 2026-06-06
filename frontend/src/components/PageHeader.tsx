import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  action: ReactNode;
}

export function PageHeader(props: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-foreground">{props.title}</h1>
        <p className="text-sm text-muted-foreground">{props.description}</p>
      </div>

      <div>{props.action}</div>
    </div>
  );
}
