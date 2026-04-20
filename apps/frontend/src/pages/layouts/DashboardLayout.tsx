import { NavLink, Outlet } from "react-router";

import logoImg from "@/assets/Logo.svg";
import { ToggleTheme } from "@/components/toggle-theme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { getInitials } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth";

import type { NavigationMenuLinkProps } from "@base-ui/react/navigation-menu";

export function DashboardLayout() {
  const { user } = useAuthStore();

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
            <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <Outlet />
    </main>
  );
}

function Link(props: NavigationMenuLinkProps) {
  return (
    <NavigationMenuLink
      render={<NavLink to={props.href} />}
      {...props}
    />
  );
}