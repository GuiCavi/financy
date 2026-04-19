import { LoginForm } from "@/forms/LoginForm";
import type { LoginSchema } from "@/forms/schemas/login-schema";

export function Login() {
  return (
    <div>
      <LoginForm
        onSubmit={(value: LoginSchema) => {
          console.info("🚀 ~ Login ~ value:", value);
        }}
      />
    </div>
  );
}