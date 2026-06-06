import { gql } from "@apollo/client";

export const CREATE_TRANSACTION_MUTATION = gql`
  mutation CreateTransaction($data: CreateTransactionInput!) {
    createTransaction(data: $data) {
      id
      description
      amount
      date
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

export const UPDATE_TRANSACTION_MUTATION = gql`
  mutation UpdateTransaction($updateTransactionId: String!, $data: UpdateTransactionInput!) {
    updateTransaction(id: $updateTransactionId, data: $data) {
      id
      description
      amount
      date
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

export const DELETE_TRANSACTION_MUTATION = gql`
  mutation DeleteTransaction($transactionId: String!) {
    deleteTransaction(id: $transactionId)
  }
`;
