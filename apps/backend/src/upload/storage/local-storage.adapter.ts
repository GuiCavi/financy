import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { env } from "../../../config/env";

import type { StorageAdapter } from "./storage-adapter.interface";

export class LocalStorageAdapter implements StorageAdapter {
  private readonly storagePath: string;

  constructor() {
    this.storagePath = env.AVATAR_STORAGE_PATH ?? os.tmpdir();
  }

  async store(fileBuffer: Buffer, filename: string): Promise<string> {
    const filePath = path.join(this.storagePath, filename);
    await fs.writeFile(filePath, fileBuffer);
    return `http://localhost:${env.PORT}/uploads/${filename}`;
  }
}
