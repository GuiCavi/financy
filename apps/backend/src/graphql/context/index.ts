import { ExpressContextFunctionArgument } from "@as-integrations/express5";

import { extractUserIdFromAuthHeader } from "../../utils/auth";

export type GraphqlContext = {
  user: string | undefined;
  token: string | undefined;
  req: ExpressContextFunctionArgument["req"];
  res: ExpressContextFunctionArgument["res"];
};

export const buildContext = async ({
  req,
  res,
}: ExpressContextFunctionArgument): Promise<GraphqlContext> => {
  const authHeader = req.headers.authorization;

  const extractedData = extractUserIdFromAuthHeader(authHeader);

  return {
    user: extractedData.id,
    token: extractedData.token,
    req,
    res,
  };
};