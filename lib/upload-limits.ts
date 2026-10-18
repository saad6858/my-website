/** Product-level upload limits. Decimal MB are used consistently with Cloudinary's stated 100 MB request ceiling. */
export const MAX_VIDEO_UPLOAD_BYTES = 95_000_000;
export const MAX_IMAGE_UPLOAD_BYTES = 15_000_000;
export const CLOUDINARY_STANDARD_UPLOAD_CEILING_BYTES = 100_000_000;
export const MAX_VIDEO_UPLOAD_LABEL = '95 MB';
export const MAX_IMAGE_UPLOAD_LABEL = '15 MB';
export const ACCEPTED_VIDEO_MIME_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'] as const;
export const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'] as const;
