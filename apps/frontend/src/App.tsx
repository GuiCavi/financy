import { lazy, type PropsWithChildren } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import { AuthLayout } from "@/pages/layouts/AuthLayout";
import { DashboardLayout } from "@/pages/layouts/DashboardLayout";
import { useAuthStore } from "@/stores/auth";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Categories = lazy(() => import("./pages/Categories"));
const Transactions = lazy(() => import("./pages/Transactions"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

function ProtectedRoute({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuthStore();
  return !isAuthenticated ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute><AuthLayout /></PublicRoute>}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="categories" element={<Categories />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
