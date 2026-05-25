export interface StorageAdapter {
  /**
   * Persist a file buffer and return its publicly accessible URL.
   * @param fileBuffer  The processed image buffer.
   * @param filename    The target filename (including extension).
   * @returns           A promise resolving to the avatar URL.
   */
  store(fileBuffer: Buffer, filename: string): Promise<string>;
}
