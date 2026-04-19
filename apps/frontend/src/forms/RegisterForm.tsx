import { useForm } from "@tanstack/react-form";
import { Eye, EyeClosed, LockIcon, LogIn, MailIcon, User } from "lucide-react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { registerSchema, type RegisterSchema } from "@/forms/schemas/register-schema";
import { useViewPassword } from "@/hooks/use-view-password";

import type { SubmitEvent } from "react";

export function RegisterForm({ onSubmit }: { onSubmit: (value: RegisterSchema) => void }) {
  const navigate = useNavigate();
  const { fieldRef, toggleViewPassword, eyeOpen } = useViewPassword();

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validators: {
      onChange: registerSchema,
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  });

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <h1 className="text-xl font-bold text-foreground">Criar conta</h1>
      <p className="text-muted-foreground">Comece a controlar suas finanças ainda hoje</p>

      <FieldGroup className="mt-8">
        <form.Field
          name="fullName"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field className="max-w-sm" data-invalid={isInvalid}>
                <FieldLabel htmlFor="full-name">Nome completo</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    type="text"
                    id="full-name"
                    name="full-name"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Seu nome completo"
                    autoComplete="name"
                  />
                  <InputGroupAddon align="inline-start">
                    <User className="text-muted-foreground size-4 data-[invalid=true]:text-destructive" data-invalid={isInvalid} />
                  </InputGroupAddon>
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <form.Field
          name="email"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field className="max-w-sm" data-invalid={isInvalid}>
                <FieldLabel htmlFor="email">E-mail</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    type="email"
                    disabled
                    id="email"
                    name="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="mail@exemplo.com"
                    autoComplete="email"
                  />
                  <InputGroupAddon align="inline-start">
                    <MailIcon className="text-muted-foreground size-4 data-[invalid=true]:text-destructive" data-invalid={isInvalid} />
                  </InputGroupAddon>
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <form.Field
          name="password"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field className="max-w-sm" data-invalid={isInvalid}>
                <FieldLabel htmlFor="password">Senha</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    ref={fieldRef}
                    type="password"
                    id="password"
                    name="password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Digite sua senha"
                    autoComplete="new-password"
                  />
                  <InputGroupAddon align="inline-start">
                    <LockIcon className="text-muted-foreground size-4 data-[invalid=true]:text-destructive" data-invalid={isInvalid} />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end" onClick={toggleViewPassword} className="cursor-pointer">
                    {eyeOpen ? <Eye className="size-4" /> : <EyeClosed className="size-4" />}
                  </InputGroupAddon>
                </InputGroup>
                {!isInvalid && <FieldDescription>A senha deve ter no mínimo 8 caracteres</FieldDescription>}
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </FieldGroup>

      <Field className="mt-6">
        <Button type="submit">Cadastrar</Button>
      </Field>

      <div className="relative w-full flex flex-row items-center justify-center my-6">
        <Separator className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <span className="bg-card text-muted-foreground text-sm z-10 px-3">ou</span>
      </div>

      <p className="text-muted-foreground text-sm mb-4">Já tem uma conta?</p>
      <Button variant="outline" className="w-full" onClick={() => navigate("/login")}>
        <LogIn />
        Fazer login
      </Button>
    </form>
  );
}