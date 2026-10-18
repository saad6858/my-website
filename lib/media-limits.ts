export const VIDEO_MAX_BYTES = 95_000_000;
export const IMAGE_MAX_BYTES = 15_000_000;
export const SUPPORTED_MEDIA_TYPES = ['image/jpeg','image/png','image/webp','image/avif','video/mp4','video/webm'] as const;

export type SupportedMediaType = typeof SUPPORTED_MEDIA_TYPES[number];
export type MediaValidation = {ok:true;resourceType:'image'|'video';maxBytes:number}|{ok:false;error:string;status:400|413|415};

/** Shared by browser preflight and server metadata validation. The application cap is intentionally below Cloudinary's 100 MB standard-upload limit. */
export function validateMediaUpload(mimeType:string,bytes:number):MediaValidation {
  if (!SUPPORTED_MEDIA_TYPES.includes(mimeType as SupportedMediaType)) return {ok:false,error:'Use JPG, PNG, WebP, AVIF, MP4 or WebM media.',status:415};
  if (!Number.isFinite(bytes)||bytes<0) return {ok:false,error:'The media file size is invalid.',status:400};
  const resourceType=mimeType.startsWith('video/')?'video':'image';
  const maxBytes=resourceType==='video'?VIDEO_MAX_BYTES:IMAGE_MAX_BYTES;
  if (bytes>maxBytes) return {ok:false,error:resourceType==='video'?'Video files must be 95 MB or smaller. Image files must be 15 MB or smaller.':'Image files must be 15 MB or smaller.',status:413};
  return {ok:true,resourceType,maxBytes};
}
