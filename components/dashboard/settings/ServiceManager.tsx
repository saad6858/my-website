"use client";
import { useEffect, useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import type { Service } from "@/types";
import { getServices, createService, updateService, deleteService } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import { Input, Label, Panel, Textarea } from "@/components/dashboard/AdminPrimitives";

const blank = (): Omit<Service, "id"> & { sortOrder?: number } => ({ title: "", description: "", icon: "Bot", features: [], price: "Custom", cta: "Discuss", enabled: true, sortOrder: 99 });

export function ServiceManager() {
  const [items, setItems] = useState<Array<Service & { sortOrder?: number }>>([]);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const load = async () => setItems((await getServices()) as Array<Service & { sortOrder?: number }>);
  useEffect(() => { load().catch(() => undefined); }, []);
  const update = (index: number, patch: Partial<Service & { sortOrder?: number }>) => setItems((current) => current.map((item, i) => i === index ? { ...item, ...patch } : item));
  const save = async () => { setBusy(true); try { for (const item of items) { const { id, ...payload } = item; await updateService(id, payload); } setNotice("Service catalog saved"); setTimeout(() => setNotice(""), 1800); } finally { setBusy(false); } };
  const add = async () => { setBusy(true); try { const payload = blank(); const id = await createService(payload); setItems((current) => [...current, { id, ...payload }]); setNotice("Service added"); setTimeout(() => setNotice(""), 1800); } finally { setBusy(false); } };
  const remove = async (index: number) => { const item = items[index]; if (!item || !confirm(`Delete ${item.title || "this service"}?`)) return; setBusy(true); try { await deleteService(item.id); setItems((current) => current.filter((_, i) => i !== index)); } finally { setBusy(false); } };
  return <div className="space-y-4">
    <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end"><div><p className="text-xs uppercase tracking-[.2em] text-slate-600">SERVICE CATALOG</p><p className="mt-2 text-sm text-slate-400">Edit the cards visitors see without touching code.</p></div><div className="flex items-center gap-2"><span className="text-xs text-emerald-300">{notice}</span><Button variant="secondary" onClick={add} disabled={busy}><Plus size={16}/> Add Service</Button><Button onClick={save} loading={busy}><Save size={16}/> Save Services</Button></div></div>
    {!items.length ? <Panel className="p-6 text-sm text-slate-500">No database services yet. Add one, or run the seed step once.</Panel> : items.map((item, index) => <Panel key={item.id} className="space-y-4 p-6">
      <div className="grid gap-4 md:grid-cols-4"><div className="md:col-span-2"><Label>Title</Label><Input value={item.title} onChange={(e)=>update(index,{title:e.target.value})} className="mt-2" /></div><div><Label>Icon</Label><Input value={item.icon} onChange={(e)=>update(index,{icon:e.target.value})} className="mt-2" /></div><div><Label>Order</Label><Input type="number" value={item.sortOrder ?? 99} onChange={(e)=>update(index,{sortOrder:Number(e.target.value)})} className="mt-2" /></div></div>
      <div><Label>Description</Label><Textarea rows={3} value={item.description} onChange={(e)=>update(index,{description:e.target.value})} className="mt-2" /></div>
      <div className="grid gap-4 md:grid-cols-3"><div><Label>Price label</Label><Input value={item.price} onChange={(e)=>update(index,{price:e.target.value})} className="mt-2" /></div><div><Label>CTA</Label><Input value={item.cta} onChange={(e)=>update(index,{cta:e.target.value})} className="mt-2" /></div><label className="flex items-end gap-2 pb-2 text-sm text-slate-300"><input type="checkbox" checked={item.enabled} onChange={(e)=>update(index,{enabled:e.target.checked})} /> Visible on site</label></div>
      <div><Label>Features — one per line</Label><Textarea rows={5} value={item.features.join("\n")} onChange={(e)=>update(index,{features:e.target.value.split("\n").map(v=>v.trim()).filter(Boolean)})} className="mt-2" /></div>
      <div className="flex justify-end"><Button variant="danger" onClick={()=>remove(index)} disabled={busy}><Trash2 size={16}/> Delete</Button></div>
    </Panel>)}
  </div>;
}
