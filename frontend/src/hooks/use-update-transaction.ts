import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";

import { UPDATE_TRANSACTION_MUTATION } from "@/graphql/mutations";
import { DASHBOARD_LIST_CATEGORIES_QUERY, DASHBOARD_LIST_TRANSACTIONS_QUERY } from "@/graphql/queries";
import { handleGraphQLErrors } from "@/utils/graphql";

export function useUpdateTransaction() {
  const [updateTransaction, { loading }] = useMutation(UPDATE_TRANSACTION_MUTATION, {
    onError: (error) => {
      toast.error(handleGraphQLErrors(error, "Não foi possível atualizar a transação"));
    },
    onCompleted: () => {
      toast.success("Transação atualizada com sucesso");
    },
    refetchQueries: [
      { query: DASHBOARD_LIST_TRANSACTIONS_QUERY },
      { query: DASHBOARD_LIST_CATEGORIES_QUERY },
    ],
  });

  return { updateTransaction, loading };
}
