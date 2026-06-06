import { useSuspenseQuery } from "@apollo/client/react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ME_QUERY } from "@/graphql/queries";
import { apolloClient } from "@/lib/apollo";

import type { MeOutput } from "../types/auth";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(persist((set) => ({
  token: null,
  isAuthenticated: false,
  setToken: (token: string) => {
    set({
      token,
      isAuthenticated: true,
    });
  },
  logout: () => {
    set({ token: null, isAuthenticated: false });
    apolloClient.resetStore();
  },
}), {
  name: "@financy/auth",
}));

export const useUser = () => {
  const { data } = useSuspenseQuery<MeOutput>(ME_QUERY);

  if (!data?.me?.user) {
    throw new Error("useUser must be used within an authenticated route");
  }

  return data.me.user;
};
