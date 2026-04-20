import { Outlet } from "react-router";

import logoImg from "@/assets/Logo.svg";

export function AuthLayout() {
  return (
    <div className="mx-auto w-md h-full">
      <div className="flex justify-center items-center pt-12 pb-8">
        <img src={logoImg} alt="Financy Logo" />
      </div>
      <div className="p-8 bg-financy-neutral-white dark:bg-card border border-border rounded-xl">
        <Outlet />
      </div>
    </div>
  );
}
