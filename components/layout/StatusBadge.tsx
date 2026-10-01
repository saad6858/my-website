const colors: Record<string, string> = {
  new: "bg-slate-400/10 text-slate-300", contacted: "bg-blue-400/10 text-blue-300", replied: "bg-amber-400/10 text-amber-300", sample_sent: "bg-purple-400/10 text-purple-300", negotiating: "bg-orange-400/10 text-orange-300", converted: "bg-emerald-400/10 text-emerald-300", lost: "bg-red-400/10 text-red-300", follow_up: "bg-pink-400/10 text-pink-300",
  pending: "bg-slate-400/10 text-slate-300", in_progress: "bg-blue-400/10 text-blue-300", review: "bg-amber-400/10 text-amber-300", delivered: "bg-emerald-400/10 text-emerald-300", paid: "bg-green-400/10 text-green-300", cancelled: "bg-red-400/10 text-red-300",
  draft: "bg-amber-400/10 text-amber-300", published: "bg-emerald-400/10 text-emerald-300", scheduled: "bg-blue-400/10 text-blue-300", income: "bg-emerald-400/10 text-emerald-300", expense: "bg-red-400/10 text-red-300",
};
export function StatusBadge({ status, variant: _variant }: { status: string; variant?: "lead" | "project" | "post" | "transaction" | "general" }) {
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${colors[status] || "bg-slate-400/10 text-slate-300"}`}>{status.replaceAll("_", " ")}</span>;
}
