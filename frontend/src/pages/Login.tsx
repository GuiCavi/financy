import { LoginForm } from "@/forms/LoginForm";
import { useLogin } from "@/hooks/use-login";

export default function Login() {
  const { login } = useLogin();

  return (
    <LoginForm onSubmit={(value) => login({ data: { email: value.email, password: value.password } })} />
  );
}