"use client";

import { Bar, BarChart, CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCurrency } from "@/lib/utils";

export interface FinanceChartRow { month: string; income: number; expenses: number; net: number; }

export function FinanceChart({ data }: { data: FinanceChartRow[] }) {
  return <ResponsiveContainer width="100%" height={280}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
      <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
      <YAxis stroke="#64748b" fontSize={11} />
      <Tooltip formatter={(value) => formatCurrency(Number(value))} contentStyle={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 12, color: "#fff" }} />
      <Legend />
      <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} />
      <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
      <Line dataKey="net" type="monotone" stroke="#818cf8" strokeWidth={2} dot={false} />
    </BarChart>
  </ResponsiveContainer>;
}
