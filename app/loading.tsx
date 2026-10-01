import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
export default function Loading() { return <div className="fixed inset-0 z-[100] grid place-items-center bg-bg-primary"><div className="flex flex-col items-center gap-4"><LoadingSpinner size="lg"/><span className="font-mono text-xs uppercase tracking-[.3em] text-slate-500">Loading</span></div></div>; }
