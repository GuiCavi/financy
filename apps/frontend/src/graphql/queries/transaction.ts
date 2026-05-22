import { gql } from "@apollo/client";

export const DASHBOARD_LIST_TRANSACTIONS_QUERY = gql`
  query ListTransactions {
    listTransactions {
      id
      description
      date
      amount
      type
      category {
        id
        name
        icon
        color
      }
    }
  }
`;