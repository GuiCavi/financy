import jwt, { Secret, SignOptions } from "jsonwebtoken";

import { env } from "../../config/env";

export type JwtPayload = {
  id: string;
  email: string;
};

export const signJwt = (payload: JwtPayload, expiresIn?: string): string => {
  const secret: Secret = env.JWT_SECRET as unknown as Secret;
  let options: SignOptions;

  if (expiresIn) {
    options = { expiresIn: expiresIn as unknown as NonNullable<SignOptions["expiresIn"]> };
  } else {
    options = { expiresIn: "7d" };
  }

  return jwt.sign(payload, secret, options);
};

export const verifyJwt = (token: string): JwtPayload => {
  const secret: Secret = env.JWT_SECRET as unknown as Secret;
  return jwt.verify(token, secret) as JwtPayload;
};