import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";

import { ME_QUERY } from "@/graphql";
import { LOGIN_MUTATION } from "@/graphql/mutations";
import { apolloClient } from "@/lib/apollo";
import { useAuthStore } from "@/stores/auth";
import { handleGraphQLErrors } from "@/utils/graphql";

import type { LoginInput, LoginOutput } from "../types/auth";

export function useLogin() {
  const { setToken } = useAuthStore();

  const [loginMutation] = useMutation<LoginOutput>(LOGIN_MUTATION, {
    onError: (error) => {
      toast.error(handleGraphQLErrors(error, "Não foi possível fazer login na sua conta"));
    },
    onCompleted: (data) => {
      setToken(data.login.token);
    },
    update: (cache, { data }) => {
      if (!data?.login?.user) return;

      cache.writeQuery({
        query: ME_QUERY,
        data: { me: { user: data.login.user }, fromCache: true },
      });
    },
  });

  const login = async (input: LoginInput) => {
    try {
      const { data } = await loginMutation({
        variables: {
          data: {
            email: input.data.email,
            password: input.data.password,
          },
        },
      });

      if (!data?.login) {
        throw new Error("Não foi possível acessar sua conta");
      }

      apolloClient.resetStore();
    } catch (error) {
      toast.error(handleGraphQLErrors(error, "Não foi possível fazer login na sua conta"));
    }
  };

  return { login };
}
