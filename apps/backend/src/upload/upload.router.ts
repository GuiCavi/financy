import { NextFunction, Request, Response, Router } from "express";
import multer, { memoryStorage } from "multer";

import { ImageProcessor } from "./image-processor";
import { jwtAuthMiddleware } from "./middlewares/jwt-auth.middleware";
import { StorageAdapter } from "./storage/storage-adapter.interface";
import { UserService } from "../services/user.service";

const ACCEPTED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

function multerErrorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      res.status(422).json({ error: "Maximum file size is 5 MB" });
      return;
    }
    res.status(422).json({ error: err.message });
    return;
  }
  next(err);
}

export function createUploadRouter(storageAdapter: StorageAdapter): Router {
  const router = Router();

  const upload = multer({
    storage: memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
  });

  const imageProcessor = new ImageProcessor();
  const userService = new UserService();

  router.post(
    "/avatar",
    jwtAuthMiddleware,
    upload.single("avatar"),
    async (req: Request & { userId?: string }, res: Response): Promise<void> => {
      // Validate presence of exactly one avatar field
      if (!req.file) {
        res.status(422).json({ error: "Field 'avatar' is required" });
        return;
      }

      // Validate MIME type
      if (!(ACCEPTED_MIME_TYPES as readonly string[]).includes(req.file.mimetype)) {
        res.status(422).json({ error: "Accepted types: jpeg, png, webp" });
        return;
      }

      // Crop image
      let croppedBuffer: Buffer;
      try {
        croppedBuffer = await imageProcessor.crop(req.file.buffer, req.file.mimetype);
      } catch {
        res.status(500).json({ error: "Image processing failed" });
        return;
      }

      // Build filename: userId + timestamp + extension
      const ext = MIME_TO_EXT[req.file.mimetype] ?? "jpg";
      const filename = `${req.userId}-${Date.now()}.${ext}`;

      // Store file
      let avatarUrl: string;
      try {
        avatarUrl = await storageAdapter.store(croppedBuffer, filename);
      } catch {
        res.status(500).json({ error: "Storage failed" });
        return;
      }

      // Persist avatarUrl on user record
      try {
        await userService.updateAvatarUrl(req.userId!, avatarUrl);
      } catch {
        res.status(500).json({ error: "Persistence failed" });
        return;
      }

      res.status(200).json({ avatarUrl });
    },
    multerErrorHandler,
  );

  return router;
}
