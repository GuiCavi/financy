import { create } from "zustand";
import { persist } from "zustand/middleware";

import { REGISTER_MUTATION } from "@/graphql/mutations/register";
import { apolloClient } from "@/lib/apollo";

import type { LoginInput, RegisterInput, RegisterOutput, User } from "../types/auth";

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
  signup: async ({ name, email, password }: RegisterInput) => {
    const { data } = await apolloClient.mutate<{ register?: RegisterOutput }, { data: RegisterInput }>({
      mutation: REGISTER_MUTATION,
      variables: {
        data: {
          name,
          email,
          password,
        },
      },
    });
    console.info("🚀 ~ data:", data);

    if (data.register) {
      set({
        user: data.register.user,
        token: data.register.token,
        isAuthenticated: true,
      });
    }
  },
  login: async ({ email, password }: LoginInput) => {

  },
  logout: () => {

  },
}), {
  name: "auth",
}));

useAuthStore.subscribe((state) => {
  console.info("🚀 ~ state:", state);
});