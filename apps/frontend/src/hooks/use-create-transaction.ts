import { CombinedGraphQLErrors } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";

import { CREATE_TRANSACTION_MUTATION } from "@/graphql/mutations";
import { DASHBOARD_LIST_CATEGORIES_QUERY, DASHBOARD_LIST_TRANSACTIONS_QUERY } from "@/graphql/queries";

export function useCreateTransaction() {
  const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION_MUTATION, {
    onError: (error) => {
      if (CombinedGraphQLErrors.is(error)) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Não foi possível criar a transação");
      }
    },
    onCompleted: () => {
      toast.success("Transação criada com sucesso");
    },
    refetchQueries: [
      { query: DASHBOARD_LIST_TRANSACTIONS_QUERY },
      { query: DASHBOARD_LIST_CATEGORIES_QUERY },
    ],
  });

  return { createTransaction, loading };
}
