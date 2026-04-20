import { RegisterForm } from "@/forms/RegisterForm";
import { useAuthStore } from "@/stores/auth";

export function Register() {
  const { signup } = useAuthStore();

  return (
    <RegisterForm onSubmit={(value) => signup({ name: value.fullName, email: value.email, password: value.password })} />
  );
}
