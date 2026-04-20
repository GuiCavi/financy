import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import { Dashboard } from "@/pages/Dashboard";
import { AuthLayout } from "@/pages/layouts/AuthLayout";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { useAuthStore } from "@/stores/auth";

import type { PropsWithChildren } from "react";

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
        <Route element={<AuthLayout />}>
          <Route path="login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="register" element={<PublicRoute><Register /></PublicRoute>} />
        </Route>
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
