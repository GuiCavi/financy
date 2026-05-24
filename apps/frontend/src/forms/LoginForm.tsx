import { useForm } from "@tanstack/react-form";
import { Eye, EyeClosed, Loader2, LockIcon, MailIcon, UserRoundPlus } from "lucide-react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { loginSchema, type LoginSchema } from "@/forms/schemas/login-schema";
import { useViewPassword } from "@/hooks/use-view-password";

import type { SubmitEvent } from "react";

export function LoginForm({ onSubmit }: { onSubmit: (value: LoginSchema) => void }) {
  const navigate = useNavigate();
  const { fieldRef, toggleViewPassword, eyeOpen } = useViewPassword();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: loginSchema,
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
      <h1 className="text-xl font-bold text-foreground">Fazer login</h1>
      <p className="text-muted-foreground">Entre na sua conta para continuar</p>

      <FieldGroup className="mt-8">
        <form.Field
          name="email"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field className="max-w-sm" data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>E-mail</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="mail@exemplo.com"
                    autoComplete="off"
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
                <FieldLabel htmlFor={field.name}>Senha</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    ref={fieldRef}
                    type={eyeOpen ? "text" : "password"}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Digite sua senha"
                    autoComplete="off"
                  />
                  <InputGroupAddon align="inline-start">
                    <LockIcon className="text-muted-foreground size-4 data-[invalid=true]:text-destructive" data-invalid={isInvalid} />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end" onClick={toggleViewPassword} className="cursor-pointer">
                    {eyeOpen ? <Eye className="size-4" /> : <EyeClosed className="size-4" />}
                  </InputGroupAddon>
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <div className="flex justify-between">
          <Field orientation="horizontal">
            <Checkbox id="remember-me" name="remember-me" />
            <FieldLabel htmlFor="remember-me" className="text-sm text-foreground font-normal cursor-pointer">Lembrar-me</FieldLabel>
          </Field>
          <a href="/forgot-password" className="text-sm font-medium text-financy-brand-base dark:text-financy-feedback-success text-nowrap hover:underline">Recuperar senha</a>
        </div>
      </FieldGroup>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Field className="mt-6">
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? (<Loader2 className="size-4 animate-spin" />) : "Entrar"}
            </Button>
          </Field>
        )}
      />

      <div className="relative w-full flex flex-row items-center justify-center my-6">
        <Separator className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <span className="bg-card text-muted-foreground text-sm z-10 px-3">ou</span>
      </div>

      <p className="text-muted-foreground text-sm mb-4">Ainda não tem uma conta?</p>
      <Button variant="outline" className="w-full gap-2" onClick={() => navigate("/register")}>
        <UserRoundPlus data-icon="inline-start" />
        Criar conta
      </Button>
    </form>
  );
}