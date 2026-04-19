import { BrowserRouter, Outlet, Route, Routes } from "react-router";

import logoImg from "@/assets/Logo.svg";
import { RegisterForm } from "@/forms/RegisterForm";
import { Login } from "@/pages/Login";
import { useAuthStore } from "@/stores/auth";

function AuthLayout() {
  return (
    <div className="mx-auto w-md h-full">
      <div className="flex justify-center items-center pt-12 pb-8">
        <img src={logoImg} alt="Financy Logo" />
      </div>
      <div className="p-8 bg-financy-neutral-white dark:bg-card border border-border rounded-xl">
        <Outlet />
      </div>
    </div>
  );
}

function CreateAccount() {
  const { signup } = useAuthStore();

  return (
    <div>
      <RegisterForm onSubmit={(value) => signup({ name: value.fullName, email: value.email, password: value.password })} />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<CreateAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
