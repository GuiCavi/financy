import { LoginForm } from "@/forms/LoginForm";

export function Login() {
  return (
    <div>
      <LoginForm onSubmit={console.log} />
    </div>
  );
}