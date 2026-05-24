import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";

import { ME_QUERY } from "@/graphql";
import { REGISTER_MUTATION } from "@/graphql/mutations";
import { apolloClient } from "@/lib/apollo";
import { useAuthStore } from "@/stores/auth";
import { handleGraphQLErrors } from "@/utils/graphql";

import type { RegisterInput, RegisterOutput } from "../types/auth";

export function useRegister() {
  const { setToken } = useAuthStore();

  const [registerMutation] = useMutation<RegisterOutput>(REGISTER_MUTATION, {
    onError: (error) => {
      toast.error(handleGraphQLErrors(error, "Não foi possível registrar sua conta"));
    },
    onCompleted: (data) => {
      toast.success("Conta criada com sucesso");
      setToken(data.register.token);
    },
    update: (cache, { data }) => {
      if (!data?.register?.user) return;

      cache.writeQuery({
        query: ME_QUERY,
        data: { me: { user: data.register.user } },
      });
    },
  });

  const register = async (input: RegisterInput) => {
    try {
      const { data } = await registerMutation({
        variables: {
          data: {
            name: input.data.name,
            email: input.data.email,
            password: input.data.password,
          },
        },
      });

      if (!data?.register) {
        throw new Error("Não foi possível registrar sua conta");
      }

      apolloClient.cache.reset();
    } catch (error) {
      toast.error(handleGraphQLErrors(error, "Não foi possível registrar sua conta"));
    }
  };

  return { register };
}
