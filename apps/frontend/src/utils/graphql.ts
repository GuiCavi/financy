import { CombinedGraphQLErrors } from "@apollo/client";

export function handleGraphQLErrors(
  error: Error | CombinedGraphQLErrors,
  fallbackErrorMessage: string,
): string {
  if (CombinedGraphQLErrors.is(error)) {
    const graphQLErrors = error.errors;
    return graphQLErrors[0]?.message ?? fallbackErrorMessage;
  }
  return fallbackErrorMessage;
}
