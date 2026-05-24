import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";

import { LOGIN_MUTATION, UPDATE_USER_DATA_MUTATION } from "@/graphql/mutations";
import { handleGraphQLErrors } from "@/utils/graphql";

export function useUpdateUserData() {
  const [updateUserData, { loading }] = useMutation(UPDATE_USER_DATA_MUTATION, {
    onError: (error) => {
      toast.error(handleGraphQLErrors(error, "Não foi possível atualizar os dados do usuário"));
    },
    onCompleted: () => {
      toast.success("Dados do usuário atualizados com sucesso");
    },
    refetchQueries: [{ query: LOGIN_MUTATION }],
  });

  return { updateUserData, loading };
}
