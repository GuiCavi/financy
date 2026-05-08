import { LogOut } from "lucide-react";
import { NavLink, Outlet } from "react-router";

import logoImg from "@/assets/Logo.svg";
import { ToggleTheme } from "@/components/toggle-theme";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { useAuthStore, useUser } from "@/stores/auth";
import { getInitials } from "@/utils/text";

import type { NavigationMenuLinkProps } from "@base-ui/react/navigation-menu";

export function DashboardLayout() {
  const user = useUser();
  const { logout } = useAuthStore();

  return (
    <main>
      <header className="bg-card flex flex-row justify-between items-center px-12 py-4">
        <img src={logoImg} alt="Financy Logo" />

        <NavigationMenu>
          <NavigationMenuList className="gap-4">
            <NavigationMenuItem>
              <Link href="/">Dashboard</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/transactions">Transações</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/categories">Categorias</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex flex-row items-center gap-4">
          <ToggleTheme />
          <Avatar>
            {/* <AvatarImage src={user?.avatarUrl } /> */}
            <AvatarFallback className="bg-financy-grayscale-300 text-financy-grayscale-800">{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <Button variant="ghost" size="icon" onClick={() => logout()}>
            <LogOut />
          </Button>
        </div>
      </header>
      <Outlet />
    </main>
  );
}

function Link(props: NavigationMenuLinkProps) {
  return (
    <NavigationMenuLink
      render={<NavLink to={props.href || "#"} />}
      {...props}
    />
  );
}