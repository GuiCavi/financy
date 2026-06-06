import { Outlet } from "react-router";

export function SettingsLayout() {
  return (
    <div className="mx-auto mt-12 w-full max-w-lg h-full">
      <div className="p-8 bg-financy-neutral-white dark:bg-card border border-border rounded-xl">
        <Outlet />
      </div>
    </div>
  );
}
