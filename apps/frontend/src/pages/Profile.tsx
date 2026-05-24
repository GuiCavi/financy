import { useForm } from "@tanstack/react-form";
import { Loader2, LogOut, MailIcon, UserRoundPlus } from "lucide-react";
import { type SubmitEvent } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import type { UpdateUserSchema } from "@/forms/schemas/update-user-data";
import { useUpdateUserData } from "@/hooks/use-update-user-data";
import { useAuthStore, useUser } from "@/stores/auth";
import { getInitials } from "@/utils/text";

type AddCategoryFormProps = {
  onSubmit: (value: UpdateUserSchema) => Promise<void>;
  defaultValues?: Partial<UpdateUserSchema>;
};

function EditProfileForm({ onSubmit, defaultValues }: AddCategoryFormProps) {
  const form = useForm({
    defaultValues: {
      name: defaultValues.name ?? "",
      email: defaultValues.email ?? "",
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup className="mt-8">
        <form.Field
          name="name"
          children={(field) => (
            <Field className="">
              <FieldLabel htmlFor={field.name}>Nome completo</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Seu nome completo"
                />
                <InputGroupAddon align="inline-start">
                  <UserRoundPlus className="text-muted-foreground size-4" />
                </InputGroupAddon>
              </InputGroup>
            </Field>
          )}
        />

        <Field className="">
          <FieldLabel htmlFor="email">E-mail</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="email"
              name="email"
              value={form.state.values.email || ""}
              disabled
              placeholder="Seu e-mail"
            />
            <InputGroupAddon align="inline-start">
              <MailIcon className="text-muted-foreground size-4" />
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription>
            O e-mail não pode ser alterado
          </FieldDescription>
        </Field>
      </FieldGroup>

      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <Field className="mt-6 flex justify-end">
            <Button type="submit" disabled={isSubmitting} className="w-full bg-financy-brand-base text-white hover:bg-financy-brand-dark transition-colors">
              {isSubmitting ? (<Loader2 className="size-4 animate-spin" />) : "Salvar alterações"}
            </Button>
          </Field>
        )}
      </form.Subscribe>
    </form>
  );
}

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