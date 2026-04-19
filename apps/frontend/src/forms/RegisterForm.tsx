import { EyeClosed, LogIn, MailIcon } from "lucide-react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { useViewPassword } from "@/hooks/use-view-password";

export function RegisterForm({ onSubmit }: { onSubmit: () => void }) {
  const navigate = useNavigate();
  const { fieldRef, toggleViewPassword } = useViewPassword();

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center">
      <h1 className="text-xl font-bold text-financy-grayscale-800">Criar conta</h1>
      <p className="text-financy-grayscale-600">Comece a controlar suas finanças ainda hoje</p>

      <FieldGroup className="mt-8">
        <Field className="max-w-sm">
          <FieldLabel htmlFor="inline-start-input">Nome completo</FieldLabel>
          <InputGroup>
            <InputGroupInput type="text" id="inline-start-input" placeholder="Seu nome completo" autoComplete="name" />
            <InputGroupAddon align="inline-start">
              <MailIcon className="text-muted-foreground" />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field className="max-w-sm">
          <FieldLabel htmlFor="inline-start-input">E-mail</FieldLabel>
          <InputGroup>
            <InputGroupInput type="email" id="inline-start-input" placeholder="mail@exemplo.com" autoComplete="email" />
            <InputGroupAddon align="inline-start">
              <MailIcon className="text-muted-foreground" />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field className="max-w-sm">
          <FieldLabel htmlFor="inline-start-input">Senha</FieldLabel>
          <InputGroup>
            <InputGroupInput ref={fieldRef} type="password" id="inline-start-input" placeholder="Digite sua senha" autoComplete="new-password" />
            <InputGroupAddon align="inline-start">
              <MailIcon className="text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end" onClick={toggleViewPassword} className="cursor-pointer">
              <EyeClosed />
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription>A senha deve ter no mínimo 8 caracteres</FieldDescription>
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

      <p className="text-financy-grayscale-600 text-sm mb-4">Já tem uma conta?</p>
      <Button variant="outline" className="w-full" onClick={() => navigate("/login")}>
        <LogIn />
        Fazer login
      </Button>
    </form>
  );
}