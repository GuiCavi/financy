import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";

import { UPDATE_CATEGORY_MUTATION } from "@/graphql/mutations";
import { DASHBOARD_LIST_CATEGORIES_QUERY } from "@/graphql/queries";
import { handleGraphQLErrors } from "@/utils/graphql";

export function useUpdateCategory() {
  const [updateCategory, { loading }] = useMutation(UPDATE_CATEGORY_MUTATION, {
    onError: (error) => {
      toast.error(handleGraphQLErrors(error, "Não foi possível atualizar a categoria"));
    },
    onCompleted: () => {
      toast.success("Categoria atualizada com sucesso");
    },
    refetchQueries: [{ query: DASHBOARD_LIST_CATEGORIES_QUERY }],
  });

  return { updateCategory, loading };
}
