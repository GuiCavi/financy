import { EyeClosed, MailIcon, UserRoundPlus } from "lucide-react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { useViewPassword } from "@/hooks/use-view-password";

export function LoginForm({ onSubmit }: { onSubmit: () => void }) {
  const navigate = useNavigate();
  const { fieldRef, toggleViewPassword } = useViewPassword();

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center">
      <h1 className="text-xl font-bold text-financy-grayscale-800">Fazer login</h1>
      <p className="text-financy-grayscale-600">Entre na sua conta para continuar</p>

      <FieldGroup className="mt-8">
        <Field className="max-w-sm">
          <FieldLabel htmlFor="email">E-mail</FieldLabel>
          <InputGroup>
            <InputGroupInput type="email" id="email" placeholder="mail@exemplo.com" autoComplete="email" />
            <InputGroupAddon align="inline-start">
              <MailIcon className="text-muted-foreground" />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field className="max-w-sm">
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <InputGroup>
            <InputGroupInput ref={fieldRef} type="password" id="password" placeholder="Digite sua senha" autoComplete="current-password" />
            <InputGroupAddon align="inline-start">
              <MailIcon className="text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end" onClick={toggleViewPassword} className="cursor-pointer">
              <EyeClosed />
            </InputGroupAddon>
          </InputGroup>
        </Field>

        <div className="flex justify-between">
          <Field orientation="horizontal">
            <Checkbox id="remember-me" name="remember-me" />
            <FieldLabel htmlFor="remember-me" className="text-sm text-financy-grayscale-700 cursor-pointer">Lembrar-me</FieldLabel>
          </Field>
          <a href="/forgot-password" className="text-sm font-medium text-financy-brand-base text-nowrap hover:underline">Recuperar senha</a>
        </div>
      </FieldGroup>

      <Field className="mt-6">
        <Button type="submit">Entrar</Button>
      </Field>

      <div className="relative w-full flex flex-row items-center justify-center my-6">
        <Separator className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <span className="bg-financy-neutral-white text-financy-grayscale-500 text-sm z-10 px-3">ou</span>
      </div>

      <p className="text-financy-grayscale-600 text-sm mb-4">Ainda não tem uma conta?</p>
      <Button variant="outline" className="w-full" onClick={() => navigate("/register")}>
        <UserRoundPlus />
        Criar conta
      </Button>
    </form>
  );
}