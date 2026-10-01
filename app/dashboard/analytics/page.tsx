"use client";

import { useEffect, useMemo, useState } from "react";
import { Activity, ArrowDownUp, Percent, Wallet } from "lucide-react";
import { getLeads, getTransactions } from "@/lib/actions";
import type { Lead, Transaction } from "@/types";
import { toDate, formatCurrency } from "@/lib/utils";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartMessages } from "@/components/dashboard/analytics/ChartMessages";
import { ChartSources } from "@/components/dashboard/analytics/ChartSources";
import { ChartFunnel } from "@/components/dashboard/analytics/ChartFunnel";
import { ChartRevenue } from "@/components/dashboard/analytics/ChartRevenue";
import { Panel, Select } from "@/components/dashboard/AdminPrimitives";

type Range = "7" | "30" | "90" | "all";
type DailyMessage = { date: string; messages: number; replies: number };

const funnelOrder: Lead["status"][] = ["contacted", "replied", "sample_sent", "negotiating", "converted"];

function startOfDay(value: Date) { return new Date(value.getFullYear(), value.getMonth(), value.getDate()); }
function dayKey(value: Date) { return value.toISOString().slice(0, 10); }

export default function AnalyticsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [range, setRange] = useState<Range>("30");

  useEffect(() => {
    Promise.all([getLeads(), getTransactions()]).then(([nextLeads, nextTransactions]) => {
      setLeads(nextLeads);
      setTransactions(nextTransactions);
    }).catch(() => undefined);
  }, []);

  const cutoff = useMemo(() => {
    if (range === "all") return new Date(0);
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - Number(range) + 1);
    return d;
  }, [range]);

  const filteredLeads = useMemo(() => leads.filter((lead) => {
    const relevant = [lead.dateContacted, lead.createdAt, ...lead.messages.map((message) => message.date)];
    return relevant.some((date) => toDate(date).getTime() >= cutoff.getTime());
  }), [leads, cutoff]);

  const totals = useMemo(() => {
    let messages = 0;
    let replies = 0;
    for (const lead of filteredLeads) {
      for (const message of lead.messages) {
        const date = toDate(message.date);
        if (date.getTime() < cutoff.getTime()) continue;
        if (message.direction === "outbound") messages += 1;
        else replies += 1;
      }
    }
    const converted = filteredLeads.filter((lead) => lead.status === "converted").length;
    return { messages, replies, replyRate: messages ? Math.round((replies / messages) * 100) : 0, converted, conversionRate: filteredLeads.length ? Math.round((converted / filteredLeads.length) * 100) : 0 };
  }, [filteredLeads, cutoff]);

  const daily = useMemo(() => {
    const days = range === "all" ? 30 : Number(range);
    const rows = new Map<string, DailyMessage>();
    const end = startOfDay(new Date());
    for (let i = days - 1; i >= 0; i -= 1) {
      const d = new Date(end);
      d.setDate(end.getDate() - i);
      rows.set(dayKey(d), { date: `${d.getMonth() + 1}/${d.getDate()}`, messages: 0, replies: 0 });
    }
    for (const lead of filteredLeads) {
      for (const message of lead.messages) {
        const d = toDate(message.date);
        if (d.getTime() < cutoff.getTime()) continue;
        const row = rows.get(dayKey(d));
        if (!row) continue;
        row[message.direction === "outbound" ? "messages" : "replies"] += 1;
      }
    }
    return [...rows.values()];
  }, [filteredLeads, cutoff, range]);

  const sources = useMemo(() => {
    const counts = new Map<string, number>();
    for (const lead of filteredLeads) counts.set(lead.source, (counts.get(lead.source) ?? 0) + 1);
    return [...counts.entries()].map(([source, count]) => ({ source, count }));
  }, [filteredLeads]);

  const funnel = useMemo(() => funnelOrder.map((stage, index) => {
    const count = filteredLeads.filter((lead) => funnelOrder.indexOf(lead.status) >= index).length;
    const previousCount = index === 0 ? filteredLeads.length : funnelOrder.slice(index - 1, index).reduce((sum, previous) => sum + filteredLeads.filter((lead) => funnelOrder.indexOf(lead.status) >= funnelOrder.indexOf(previous)).length, 0);
    return { stage: stage.replace("_", " "), count, rate: previousCount ? Math.round((count / previousCount) * 100) : 0 };
  }), [filteredLeads]);

  const revenue = useMemo(() => {
    const months = new Map<string, { month: string; revenue: number; sortKey: number }>();
    for (let i = 11; i >= 0; i -= 1) {
      const d = new Date();
      d.setDate(1);
      d.setMonth(d.getMonth() - i);
      const sortKey = d.getFullYear() * 12 + d.getMonth();
      months.set(`${d.getFullYear()}-${d.getMonth()}`, { month: d.toLocaleDateString("en-US", { month: "short" }), revenue: 0, sortKey });
    }
    for (const tx of transactions) {
      if (tx.type !== "income") continue;
      const d = toDate(tx.date);
      const row = months.get(`${d.getFullYear()}-${d.getMonth()}`);
      if (row) row.revenue += tx.amount;
    }
    return [...months.values()].sort((a, b) => a.sortKey - b.sortKey).map(({ month, revenue: amount }) => ({ month, revenue: amount }));
  }, [transactions]);

  const totalRevenue = useMemo(() => transactions.filter((tx) => tx.type === "income" && toDate(tx.date).getTime() >= cutoff.getTime()).reduce((sum, tx) => sum + tx.amount, 0), [transactions, cutoff]);

  const topLeads = useMemo(() => filteredLeads.map((lead) => {
    const outbound = lead.messages.filter((message) => message.direction === "outbound" && toDate(message.date).getTime() >= cutoff.getTime()).length;
    const replies = lead.messages.filter((message) => message.direction === "inbound" && toDate(message.date).getTime() >= cutoff.getTime()).length;
    const revenueForLead = transactions.filter((tx) => tx.type === "income" && tx.clientName && tx.clientName.toLowerCase() === lead.name.toLowerCase() && toDate(tx.date).getTime() >= cutoff.getTime()).reduce((sum, tx) => sum + tx.amount, 0);
    return { lead, outbound, replies, conversionRate: outbound ? Math.round((replies / outbound) * 100) : 0, revenue: revenueForLead };
  }).sort((a, b) => b.revenue - a.revenue || b.replies - a.replies).slice(0, 8), [filteredLeads, transactions, cutoff]);

  return <div>
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[.25em] text-indigo-300">MEASUREMENT</p><h2 className="mt-2 text-3xl font-bold">Analytics</h2><p className="mt-2 text-sm text-slate-500">CRM activity, response behavior, conversion, and revenue.</p></div><Select value={range} onChange={(event) => setRange(event.target.value as Range)} className="w-full md:w-44"><option value="7">Last 7 days</option><option value="30">Last 30 days</option><option value="90">Last 90 days</option><option value="all">All time</option></Select></div>
    <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4"><StatCard title="Messages sent" value={totals.messages} icon={Activity}/><StatCard title="Reply rate" value={`${totals.replyRate}%`} icon={Percent}/><StatCard title="Conversion rate" value={`${totals.conversionRate}%`} icon={ArrowDownUp}/><StatCard title="Revenue" value={formatCurrency(totalRevenue)} icon={Wallet}/></div>
    <div className="mt-7 grid gap-6 xl:grid-cols-2"><Panel className="p-6"><h3 className="font-semibold">Messages vs Replies</h3><div className="mt-5"><ChartMessages data={daily}/></div></Panel><Panel className="p-6"><h3 className="font-semibold">Lead Sources</h3><div className="mt-5"><ChartSources data={sources.length ? sources : [{ source: "No data", count: 1 }]}/></div></Panel><Panel className="p-6"><h3 className="font-semibold">Conversion Funnel</h3><div className="mt-5"><ChartFunnel data={funnel}/></div></Panel><Panel className="p-6"><h3 className="font-semibold">Revenue Trend</h3><div className="mt-5"><ChartRevenue data={revenue}/></div></Panel></div>
    <Panel className="mt-7 overflow-x-auto p-6"><div className="flex items-end justify-between gap-4"><div><h3 className="font-semibold">Top lead activity</h3><p className="mt-1 text-xs text-slate-600">Based on activity inside the selected period.</p></div><span className="text-xs text-slate-600">{totals.replies} replies</span></div><table className="mt-5 min-w-full text-sm"><thead className="text-left text-xs uppercase tracking-wider text-slate-600"><tr><th className="pb-3 pr-4">Name</th><th className="pb-3 pr-4">Company</th><th className="pb-3 pr-4">Messages</th><th className="pb-3 pr-4">Replies</th><th className="pb-3 pr-4">Reply rate</th><th className="pb-3">Revenue</th></tr></thead><tbody>{topLeads.map(({lead,outbound,replies,conversionRate,revenue: leadRevenue})=><tr key={lead.id} className="border-t border-white/5"><td className="py-3 pr-4 font-medium text-white">{lead.name}</td><td className="py-3 pr-4 text-slate-500">{lead.agency || "—"}</td><td className="py-3 pr-4 text-slate-300">{outbound}</td><td className="py-3 pr-4 text-slate-300">{replies}</td><td className="py-3 pr-4 text-slate-300">{conversionRate}%</td><td className="py-3 text-emerald-300">{formatCurrency(leadRevenue)}</td></tr>)}{!topLeads.length?<tr><td colSpan={6} className="py-8 text-center text-sm text-slate-600">No activity in this period.</td></tr>:null}</tbody></table></Panel>
  </div>;
}
