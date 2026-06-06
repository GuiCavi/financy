import { RegisterForm } from "@/forms/RegisterForm";
import { useRegister } from "@/hooks/use-register";

export default function Register() {
  const { register } = useRegister();

  return (
    <RegisterForm
      onSubmit={(value) => register({
        data: {
          name: value.fullName,
          email: value.email,
          password: value.password,
        },
      })}
    />
  );
}
