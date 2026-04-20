import { gql } from "@apollo/client";

export const LIST_CATEGORIES_QUERY = gql`
  query ListCategories {
    listCategories {
      id
      name
      totalAmount
      user {
        name
      }
      transactions {
        id
        type
        amount
        description
        user {
          name
          email
        }
      }
    }
  }
`;