"use client";

import { use } from "react";
import AppShell from "@/components/shell/AppShell";
import { TEAMMATES, CONVERSATIONS, getContact, getCompany } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import Avatar from "@/components/ui/Avatar";
import StatusDot from "@/components/ui/StatusDot";
import { formatTime } from "@/lib/utils";
import { ArrowLeft, Mail, MessageCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { TEAMMATES as tm } from "@/lib/data";

export default function TeammateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToast } = useAppStore();
  const teammate = TEAMMATES.find((t) => t.id === id);
  const [reassigning, setReassigning] = useState<string | null>(null);

  if (!teammate) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-full">
          <p className="text-ink-500">Teammate not found.</p>
        </div>
      </AppShell>
    );
  }

  const queue = CONVERSATIONS.filter(
    (c) => c.assigneeId === id && c.status === "open"
  );

  const handleReassign = (convId: string, toId: string, toName: string) => {
    setReassigning(null);
    addToast(`Moved 1 conversation to ${toName}'s queue. Undo.`);
  };

  return (
    <AppShell>
      <div className="h-full overflow-y-auto scrollbar-thin">
        <div className="max-w-4xl mx-auto px-8 py-8">
          <Link
            href="/teammates"
            className="flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-700 mb-6 transition-colors"
          >
            <ArrowLeft size={14} />
            All teammates
          </Link>

          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <Avatar name={teammate.name} size="lg" />
              <StatusDot
                status={teammate.status}
                className="absolute -bottom-0.5 -right-0.5 w-3 h-3 ring-2 ring-white"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-ink-900">{teammate.name}</h1>
              <p className="text-sm text-ink-500">{teammate.role}</p>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span className="text-ink-700">
                  <strong>{teammate.openCount}</strong> open
                </span>
                <span className="text-ink-500">Avg response: {teammate.avgResponseTime}</span>
              </div>
            </div>
          </div>

          <h2 className="text-sm font-semibold text-ink-700 uppercase tracking-wider mb-4">
            Queue ({queue.length})
          </h2>

          {queue.length === 0 ? (
            <div className="bg-ink-100 rounded-xl p-8 text-center">
              <p className="text-sm text-ink-500">No open conversations.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {queue.map((conv) => {
                const contact = getContact(conv.contactId);
                const company = getCompany(conv.companyId);
                return (
                  <div
                    key={conv.id}
                    className="bg-white border border-ink-300 rounded-xl px-5 py-4 flex items-center gap-4 hover:border-purple-300 transition-colors"
                  >
                    <Avatar name={contact?.name ?? "?"} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-ink-900 truncate">{conv.subject}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-ink-500">{contact?.name}</span>
                        <span className="text-ink-300">·</span>
                        <span className="text-[11px] text-ink-500">{company?.name}</span>
                        <span className="text-ink-300">·</span>
                        {conv.channel === "chat" ? (
                          <MessageCircle size={10} className="text-blue-400" />
                        ) : (
                          <Mail size={10} className="text-ink-400" />
                        )}
                        <span className="text-[11px] text-ink-500">{formatTime(conv.updatedAt)}</span>
                      </div>
                    </div>

                    <div className="relative">
                      <button
                        onClick={() => setReassigning(reassigning === conv.id ? null : conv.id)}
                        className="flex items-center gap-1.5 text-xs border border-ink-300 rounded-lg px-2.5 py-1.5 hover:bg-ink-100 transition-colors text-ink-600"
                      >
                        <RefreshCw size={11} />
                        Reassign
                      </button>
                      {reassigning === conv.id && (
                        <div className="absolute top-full right-0 mt-1 bg-white border border-ink-300 rounded-xl shadow-md z-20 min-w-[160px] py-1">
                          {tm.filter((t) => t.id !== id).map((t) => (
                            <button
                              key={t.id}
                              onClick={() => handleReassign(conv.id, t.id, t.name)}
                              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-purple-50 text-xs text-ink-700"
                            >
                              <Avatar name={t.name} size="xs" />
                              {t.name.split(" ")[0]} ({t.openCount} open)
                            </button>
                          ))}
                          <div className="border-t border-ink-300 mt-1 pt-1">
                            <button
                              onClick={() => { setReassigning(null); addToast("Unassigned"); }}
                              className="w-full text-left px-3 py-2 hover:bg-ink-100 text-xs text-ink-500"
                            >
                              Unassign
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
