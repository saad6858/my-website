"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { uploadFile, type CloudinaryUploadResponse } from "@/lib/storage";

export interface UploadedClientFile { file: File; progress: number; result?: CloudinaryUploadResponse; error?: string; }

export function FileUploader({ onUpload }: { onUpload: (data: CloudinaryUploadResponse) => Promise<void> }) {
  const input = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<UploadedClientFile[]>([]);
  const [drag, setDrag] = useState(false);

  const start = async (files: FileList | File[]) => {
    const selected = Array.from(files).slice(0, 10);
    for (const file of selected) {
      if (file.size > 10 * 1024 * 1024) {
        setItems((current) => [...current, { file, progress: 0, error: "Maximum file size is 10 MB." }]);
        continue;
      }
      setItems((current) => [...current, { file, progress: 10 }]);
      try {
        const result = await uploadFile("", file);
        await onUpload(result);
        setItems((current) => current.map((item) => item.file === file ? { ...item, progress: 100, result } : item));
      } catch (error) {
        setItems((current) => current.map((item) => item.file === file ? { ...item, error: error instanceof Error ? error.message : "Upload failed" } : item));
      }
    }
  };

  return <div onDragEnter={(event) => { event.preventDefault(); setDrag(true); }} onDragOver={(event) => event.preventDefault()} onDragLeave={() => setDrag(false)} onDrop={(event) => { event.preventDefault(); setDrag(false); void start(event.dataTransfer.files); }} onClick={() => input.current?.click()} className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition ${drag ? "border-emerald-400 bg-emerald-500/5" : "border-slate-800 bg-slate-950/50 hover:border-slate-700"}`}>
    <input ref={input} className="hidden" type="file" multiple onChange={(event) => { if (event.target.files) void start(event.target.files); }} />
    <UploadCloud className="mx-auto text-slate-500" size={34} />
    <p className="mt-3 font-semibold text-white">Drop files here or tap to browse</p>
    <p className="mt-1 text-xs text-slate-600">Images, video, and files up to 10MB each.</p>
    {items.length ? <div className="mx-auto mt-6 max-w-xl space-y-2 text-left">{items.map((item, index) => <div key={`${item.file.name}-${index}`} className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs"><div className="flex justify-between"><span className="truncate text-slate-300">{item.file.name}</span><span className={item.error ? "text-red-300" : "text-emerald-300"}>{item.error ?? `${item.progress}%`}</span></div><div className="mt-2 h-1 rounded-full bg-slate-800"><div className="h-full rounded-full bg-emerald-400 transition-all" style={{ width: `${item.progress}%` }} /></div></div>)}</div> : null}
  </div>;
}
