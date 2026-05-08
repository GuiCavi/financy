import { gql } from "@apollo/client";

export const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategory($data: CreateCategoryInput!) {
    createCategory(data: $data) {
      name
      user {
        id
        name
        email
      }
    }
  }
`;

export const UPDATE_CATEGORY_MUTATION = gql`
  mutation UpdateCategory($updateCategoryId: String!, $data: UpdateCategoryInput!) {
    updateCategory(id: $updateCategoryId, data: $data) {
      id
      name
      user {
        name
        email
      }
    }
  }
`;

export const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategory($categoryId: String!) {
    deleteCategory(id: $categoryId)
  }
`;