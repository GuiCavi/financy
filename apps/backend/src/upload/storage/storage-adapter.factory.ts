import { env } from "../../../config/env";

import { LocalStorageAdapter } from "./local-storage.adapter";

import type { StorageAdapter } from "./storage-adapter.interface";

export function createStorageAdapter(): StorageAdapter {
  const adapter = env.STORAGE_ADAPTER ?? "local";
  switch (adapter) {
    case "local":
      return new LocalStorageAdapter();
    default:
      throw new Error(`Unknown storage adapter: ${adapter}`);
  }
}
