import { LoginForm } from "@/forms/LoginForm";
import { useAuthStore } from "@/stores/auth";

export function Login() {
  const { login } = useAuthStore();

  return (
    <LoginForm onSubmit={(value) => login({ email: value.email, password: value.password })} />
  );
}