# Admin media upload limits

- **Video cap: 95,000,000 bytes (95 MB decimal).**
- **Image cap: 15,000,000 bytes (15 MB decimal).**
- Accepted videos: MP4 (`video/mp4`), WebM (`video/webm`) and MOV/QuickTime (`video/quicktime`).
- Accepted images: JPEG, PNG, WebP and AVIF.

The admin checks media MIME type and size before starting upload, uses an authenticated server-generated Cloudinary signature, displays transfer progress, and records the secure Cloudinary URL and metadata after upload. The limit constants live in `lib/upload-limits.ts` and are returned to the browser alongside signature metadata.

Cloudinary documents that assets larger than 100 MB must be uploaded in chunks with the appropriate large/chunked upload method, and that the maximum upload size also depends on the account plan and configuration: https://cloudinary.com/documentation/upload_images. The selected 95 MB cap leaves margin under the standard 100 MB single-request limit, but an account-level limit lower than 95 MB will still reject the upload. Browser-side checks are UX validation, not a substitute for Cloudinary account restrictions.
