import sharp from 'sharp';

const SUPPORTED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
type SupportedMimeType = (typeof SUPPORTED_MIME_TYPES)[number];

function isSupportedMimeType(mimetype: string): mimetype is SupportedMimeType {
  return (SUPPORTED_MIME_TYPES as readonly string[]).includes(mimetype);
}

export class ImageProcessor {
  /**
   * Crop an image buffer to a centered 1:1 square.
   * Preserves the original format. Does not upscale.
   * Throws if the format is not jpeg, png, or webp.
   *
   * @param buffer   The raw image buffer.
   * @param mimetype The MIME type of the image (e.g. "image/jpeg").
   * @returns        A promise resolving to the cropped image buffer.
   */
  async crop(buffer: Buffer, mimetype: string): Promise<Buffer> {
    if (!isSupportedMimeType(mimetype)) {
      throw new Error(
        `Unsupported image format: ${mimetype}. Accepted formats: image/jpeg, image/png, image/webp`,
      );
    }

    const image = sharp(buffer);
    const metadata = await image.metadata();

    const width = metadata.width;
    const height = metadata.height;

    if (width === undefined || height === undefined) {
      throw new Error('Unable to read image dimensions');
    }

    const size = Math.min(width, height);
    const left = Math.floor((width - size) / 2);
    const top = Math.floor((height - size) / 2);

    const cropped = image.extract({ left, top, width: size, height: size });

    switch (mimetype) {
      case 'image/jpeg':
        return cropped.jpeg().toBuffer();
      case 'image/png':
        return cropped.png().toBuffer();
      case 'image/webp':
        return cropped.webp().toBuffer();
    }
  }
}
