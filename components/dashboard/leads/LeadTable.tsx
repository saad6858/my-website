"use client";

import { ChevronDown, Eye, Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import type { Lead } from "@/types";
import { formatDate, formatRelativeTime } from "@/lib/utils";
import { StatusBadge } from "@/components/layout/StatusBadge";

export function LeadTable({
  leads,
  onEdit,
  onDelete,
  onView,
  onStatusChange,
}: {
  leads: Lead[];
  onEdit: (l: Lead) => void;
  onDelete: (l: Lead) => void;
  onView?: (l: Lead) => void;
  onStatusChange: (l: Lead, status: Lead["status"]) => void;
}) {
  const [sort, setSort] = useState<keyof Lead>("updatedAt");
  const [asc, setAsc] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  const shown = useMemo(
    () =>
      [...leads].sort((a, b) => {
        const av = String(a[sort] ?? "");
        const bv = String(b[sort] ?? "");
        return av.localeCompare(bv) * (asc ? 1 : -1);
      }),
    [leads, sort, asc]
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full text-sm">
          <thead className="bg-white/[.03] text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              {[
                ["name", "Name"],
                ["agency", "Agency"],
                ["source", "Source"],
                ["status", "Status"],
                ["dateContacted", "Last Contacted"],
                ["dateFollowUp", "Follow-up"],
              ].map(([k, l]) => (
                <th
                  key={k}
                  onClick={() => {
                    setSort(k as keyof Lead);
                    setAsc((x) => !x);
                  }}
                  className="cursor-pointer px-4 py-3"
                >
                  {l}
                </th>
              ))}
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {shown.map((l) => (
              <tr
                key={l.id}
                className="border-t border-white/5 bg-slate-950/30 hover:bg-white/[.02]"
              >
                <td className="px-4 py-4 font-semibold text-white">
                  {l.name}
                </td>

                <td className="px-4 py-4 text-slate-400">
                  {l.agency || "—"}
                </td>

                <td className="px-4 py-4 capitalize text-slate-400">
                  {l.source}
                </td>

                <td className="px-4 py-4">
                  <button onClick={() => onStatusChange(l, l.status)}>
                    <StatusBadge status={l.status} />
                  </button>
                </td>

                <td className="px-4 py-4 text-slate-500">
                  {formatRelativeTime(l.dateContacted)}
                </td>

                <td className="px-4 py-4 text-slate-500">
                  {formatDate(l.dateFollowUp)}
                </td>

                <td className="px-4 py-4">
                  <div className="flex gap-1">
                    {onView && (
                      <button
                        onClick={() => onView(l)}
                        className="rounded-lg p-2 text-slate-500 hover:text-white"
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                    )}

                    <button
                      onClick={() =>
                        setOpen(open === l.id ? null : l.id)
                      }
                      className="rounded-lg p-2 text-slate-500 hover:text-white"
                    >
                      <ChevronDown size={16} />
                    </button>

                    <button
                      onClick={() => onEdit(l)}
                      className="rounded-lg p-2 text-slate-500 hover:text-white"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => onDelete(l)}
                      className="rounded-lg p-2 text-slate-500 hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {shown.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-12 text-center text-slate-600"
                >
                  No leads match these filters.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="md:hidden">
        {shown.map((l) => (
          <div
            key={l.id}
            className="border-b border-white/5 p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold text-white">
                  {l.name}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  {l.agency || "Independent"}
                </div>
              </div>

              <StatusBadge status={l.status} />
            </div>

            <div className="mt-3 text-sm text-slate-400">
              {l.phone}
            </div>

            <div className="mt-3 flex gap-2">
              {onView && (
                <button
                  onClick={() => onView(l)}
                  className="rounded-lg border border-white/10 px-3 py-2 text-xs"
                >
                  View
                </button>
              )}

              <button
                onClick={() => onEdit(l)}
                className="rounded-lg border border-white/10 px-3 py-2 text-xs"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(l)}
                className="rounded-lg border border-red-500/20 px-3 py-2 text-xs text-red-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}