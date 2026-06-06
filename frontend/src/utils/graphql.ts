import { CombinedGraphQLErrors } from "@apollo/client";

export function handleGraphQLErrors(
  error: unknown,
  fallbackErrorMessage: string,
): string {
  if (CombinedGraphQLErrors.is(error)) {
    const graphQLErrors = error.errors;
    return graphQLErrors[0]?.message ?? fallbackErrorMessage;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallbackErrorMessage;
}
