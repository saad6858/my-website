"use client";

export interface SignedUpload { timestamp: number; signature: string; apiKey: string; cloudName: string; folder: string; }

export interface CloudinaryUploadResponse {
  public_id: string;
  secure_url: string;
  resource_type: "image" | "video" | "raw";
  format: string;
  bytes: number;
  original_filename?: string;
  folder?: string;
  width?: number;
  height?: number;
}

export async function getUploadSignature(folder?: string): Promise<SignedUpload> {
  const res = await fetch("/api/files/signature", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ folder }) });
  if (!res.ok) throw new Error("Unable to create upload signature");
  return res.json();
}

export async function uploadFile(path: string, file: File): Promise<CloudinaryUploadResponse> {
  const signed = await getUploadSignature(path);
  const form = new FormData();
  form.append("file", file);
  form.append("api_key", signed.apiKey);
  form.append("timestamp", String(signed.timestamp));
  form.append("signature", signed.signature);
  form.append("folder", signed.folder);
  const isVideo = file.type.startsWith("video/");
  const resourceType = isVideo ? "video" : file.type.startsWith("image/") ? "image" : "raw";
  const response = await fetch(`https://api.cloudinary.com/v1_1/${signed.cloudName}/${resourceType}/upload`, { method: "POST", body: form });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message ?? "Upload failed");
  return data;
}

export async function deleteFile(publicId: string, resourceType: CloudinaryUploadResponse["resource_type"] = "image") {
  const res = await fetch("/api/files/delete", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ publicId, resourceType }) });
  if (!res.ok) throw new Error("Delete failed");
}
