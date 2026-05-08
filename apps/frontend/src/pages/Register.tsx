import { RegisterForm } from "@/forms/RegisterForm";
import { useAuthStore } from "@/stores/auth";

export default function Register() {
  const { signup } = useAuthStore();

  return (
    <RegisterForm onSubmit={(value) => signup({ data: { name: value.fullName, email: value.email, password: value.password } })} />
  );
}
