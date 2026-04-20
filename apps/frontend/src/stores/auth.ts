import { CombinedGraphQLErrors } from "@apollo/client";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { LOGIN_MUTATION } from "@/graphql/mutations/login";
import { REGISTER_MUTATION } from "@/graphql/mutations/register";
import { apolloClient } from "@/lib/apollo";

import type { LoginInput, LoginOutput, RegisterInput, RegisterOutput, User } from "../types/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  signup: (data: RegisterInput) => Promise<void>;
  login: (data: LoginInput) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(persist((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  signup: async (input: RegisterInput) => {
    try {
      const { data } = await apolloClient.mutate<RegisterOutput, RegisterInput>({
        mutation: REGISTER_MUTATION,
        variables: {
          data: {
            name: input.data.name,
            email: input.data.email,
            password: input.data.password,
          },
        },
      });

      if (data.register) {
        set({
          user: data.register.user,
          token: data.register.token,
          isAuthenticated: true,
        });
      } else {
        toast.error("Não foi possível registrar sua conta");
      }
    } catch (error) {
      if (error instanceof CombinedGraphQLErrors) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Não foi possível registrar sua conta");
      }
    }
  },
  login: async (input: LoginInput) => {
    try {
      const { data } = await apolloClient.mutate<LoginOutput, LoginInput>({
        mutation: LOGIN_MUTATION,
        variables: {
          data: {
            email: input.data.email,
            password: input.data.password,
          },
        },
      });

      if (data.login) {
        set({
          user: data.login.user,
          token: data.login.token,
          isAuthenticated: true,
        });
      } else {
        toast.error("Não foi possível fazer login");
      }
    } catch (error) {
      if (error instanceof CombinedGraphQLErrors) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Não foi possível fazer login");
      }
    }
  },
  logout: () => {

  },
}), {
  name: "@financy/auth",
}));

useAuthStore.subscribe((state) => {
  console.info("🚀 ~ state:", state);
});