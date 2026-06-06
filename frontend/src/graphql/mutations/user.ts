import { gql } from "@apollo/client";

export const UPDATE_USER_DATA_MUTATION = gql`
  mutation UpdateUser($data: UpdateUserInput!) {
    updateUser(data: $data) {
      name
      email
    }
  }
`;