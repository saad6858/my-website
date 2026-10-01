"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Eye, FileText, PenLine, Plus, Trash2 } from "lucide-react";
import type { Post } from "@/types";
import { deletePost, getAllPosts } from "@/lib/actions";
import { AdminPageHeader, Panel } from "@/components/dashboard/AdminPrimitives";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/layout/StatusBadge";

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const load = async () => setPosts(await getAllPosts());
  useEffect(() => { void load(); }, []);
  const filtered = useMemo(() => posts.filter((p) =>
    (!q || `${p.title} ${p.content}`.toLowerCase().includes(q.toLowerCase())) && (!status || p.status === status)
  ), [posts, q, status]);
  return <div>
    <AdminPageHeader eyebrow="CMS" title="Blog Posts" description="Write, preview, publish, and manage your articles." actions={<Link href="/dashboard/blog/new"><Button><Plus size={16}/> New Post</Button></Link>} />
    <div className="mt-7 grid gap-3 sm:grid-cols-4">
      {[['Total',posts.length,''],['Published',posts.filter((p)=>p.status==='published').length,'text-emerald-300'],['Drafts',posts.filter((p)=>p.status==='draft').length,'text-amber-300'],['Views',posts.reduce((s,p)=>s+p.views,0).toLocaleString(),'']].map(([label,value,tone])=><Panel key={String(label)} className="p-4"><p className="text-xs text-slate-600">{label}</p><p className={`mt-2 text-2xl font-bold ${tone}`}>{value}</p></Panel>)}
    </div>
    <div className="mt-6 flex flex-wrap gap-2"><input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search title/content…" className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none"/>{['','draft','published','scheduled'].map((s)=><button key={s||'all'} onClick={()=>setStatus(s)} className={`rounded-full border px-3 py-2 text-xs ${status===s?'border-indigo-500/50 bg-indigo-500/10 text-indigo-300':'border-slate-800 text-slate-500'}`}>{s||'all'}</button>)}</div>
    <Panel className="mt-6 overflow-hidden"><div className="overflow-x-auto"><table className="min-w-[800px] w-full text-left text-sm"><thead className="bg-slate-950/60 text-xs uppercase tracking-wider text-slate-600"><tr><th className="px-4 py-3">Title</th><th>Category</th><th>Status</th><th>Views</th><th>Actions</th></tr></thead><tbody>{filtered.map((p)=><tr key={p.id} className="border-t border-slate-800"><td className="px-4 py-4"><Link className="font-medium text-white hover:text-emerald-300" href={`/dashboard/blog/edit/${p.id}`}>{p.title}</Link><p className="mt-1 text-xs text-slate-600">{p.slug}</p></td><td className="text-slate-400">{p.category}</td><td><StatusBadge status={p.status} variant="post"/></td><td className="text-slate-400">{p.views}</td><td><div className="flex gap-1"><Link href={`/blog/${p.slug}`} target="_blank" className="rounded-lg p-2 text-slate-500 hover:text-white"><Eye size={15}/></Link><Link href={`/dashboard/blog/edit/${p.id}`} className="rounded-lg p-2 text-slate-500 hover:text-white"><PenLine size={15}/></Link><button onClick={async()=>{if(confirm('Delete this post?')){await deletePost(p.id);await load();}}} className="rounded-lg p-2 text-slate-500 hover:text-red-300"><Trash2 size={15}/></button></div></td></tr>)}</tbody></table></div>{!filtered.length&&<div className="p-10 text-center text-sm text-slate-600"><FileText className="mx-auto mb-2"/>No posts found.</div>}</Panel>
  </div>;
}
