import { verifyJwt } from "./jwt";

/**
 * Extracts and verifies a user ID from an Authorization header.
 * Returns the user ID string on success, or undefined if the header is
 * missing, malformed, or the token is invalid/expired.
 */
export function extractUserIdFromAuthHeader(
  authHeader: string | undefined,
): { id: string | undefined; token: string | undefined } {
  if (!authHeader?.startsWith("Bearer ")) return { id: undefined, token: undefined };
  try {
    const token = authHeader.substring("Bearer ".length);
    const payload = verifyJwt(token);
    return { id: payload.id, token };
  } catch {
    return { id: undefined, token: undefined };
  }
}
