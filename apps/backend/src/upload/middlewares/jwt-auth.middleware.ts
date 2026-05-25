import { NextFunction, Request, Response } from "express";

import { extractUserIdFromAuthHeader } from "../../utils/auth";

export function jwtAuthMiddleware(
  req: Request & { userId?: string },
  res: Response,
  next: NextFunction,
): void {
  const extractedData = extractUserIdFromAuthHeader(req.headers.authorization);

  if (!extractedData.id || !extractedData.token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  req.userId = extractedData.id;
  next();
}
