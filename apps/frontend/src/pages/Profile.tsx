import { LogOut, UserRoundPlus } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EditProfileForm } from "@/forms/EditProfileForm";
import { useUpdateUserData } from "@/hooks/use-update-user-data";
import { useAuthStore, useUser } from "@/stores/auth";
import { getInitials } from "@/utils/text";

export default function Profile() {
  const user = useUser();
  const { logout } = useAuthStore();
  const { updateUserData } = useUpdateUserData();

  const handleLogout = () => {
    logout();
  };

  return (
    <main className="flex flex-col">
      <Avatar className="size-24 self-center">
        {/* <AvatarImage src={user?.avatarUrl } /> */}
        <AvatarFallback className="bg-financy-grayscale-300 text-financy-grayscale-800 text-2xl">{getInitials(user.name)}</AvatarFallback>
      </Avatar>

      <div className="self-center">
        <h1 className="mt-4 text-xl font-semibold text-center">{user.name}</h1>
        <span className="text-muted-foreground text-center">{user.email}</span>
      </div>

      <Separator className="w-full mt-8" />

      <EditProfileForm
        defaultValues={user}
        onSubmit={async (value) => {
          await updateUserData({
            variables: {
              data: {
                name: value.name,
              },
            },
          });
        }}
      />

      <Button variant="outline" className="mt-6 w-full gap-2" onClick={handleLogout}>
        <LogOut className="text-financy-feedback-danger" />
        Sair da conta
      </Button>
    </main>
  );
}