import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query Me {
    me {
      user {
        id
        name
        email
        createdAt
        updatedAt
      }
    }
  }
`;
