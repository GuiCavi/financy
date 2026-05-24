import { useForm } from "@tanstack/react-form";
import { Loader2, MailIcon, UserRoundPlus } from "lucide-react";
import { type SubmitEvent } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import type { UpdateUserSchema } from "@/forms/schemas/update-user-data";

type EditProfileFormProps = {
  onSubmit: (value: UpdateUserSchema) => Promise<void>;
  defaultValues?: Partial<UpdateUserSchema>;
};

export function EditProfileForm({ onSubmit, defaultValues }: EditProfileFormProps) {
  const form = useForm({
    defaultValues: {
      name: defaultValues?.name ?? "",
      email: defaultValues?.email ?? "",
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
