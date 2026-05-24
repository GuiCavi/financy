import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";

import { CREATE_CATEGORY_MUTATION } from "@/graphql/mutations";
import { DASHBOARD_LIST_CATEGORIES_QUERY } from "@/graphql/queries";
import { handleGraphQLErrors } from "@/utils/graphql";

export function useCreateCategory() {
  const [createCategory, { loading }] = useMutation(CREATE_CATEGORY_MUTATION, {
    onError: (error) => {
      toast.error(handleGraphQLErrors(error, "Não foi possível criar a categoria"));
    },
    onCompleted: () => {
      toast.success("Categoria criada com sucesso");
    },
    refetchQueries: [{ query: DASHBOARD_LIST_CATEGORIES_QUERY }],
  });

  return { createCategory, loading };
}
