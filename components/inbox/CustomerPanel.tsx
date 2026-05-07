"use client";

import { useState } from "react";
import type { Conversation } from "@/lib/types";
import { getContact, getCompany, CONVERSATIONS } from "@/lib/data";
import Avatar from "@/components/ui/Avatar";
import { formatTime } from "@/lib/utils";
import { ChevronDown, ChevronRight, Mail, MessageCircle, Building2, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  conversation: Conversation;
}

export default function CustomerPanel({ conversation }: Props) {
  const [expanded, setExpanded] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const contact = getContact(conversation.contactId);
  const company = getCompany(conversation.companyId);
  const history = CONVERSATIONS.filter(
    (c) => c.contactId === conversation.contactId && c.id !== conversation.id
  );

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="w-6 h-full border-l border-ink-300 flex items-center justify-center hover:bg-ink-100 transition-colors flex-shrink-0"
      >
        <ChevronRight size={14} className="text-ink-500" />
      </button>
    );
  }

  return (
    <div className="w-[240px] flex-shrink-0 border-l border-ink-300 h-full overflow-y-auto scrollbar-thin bg-white">
      <div className="px-4 py-3 border-b border-ink-300 flex items-center justify-between">
        <span className="text-xs font-semibold text-ink-700 uppercase tracking-wide">Contact</span>
        <button onClick={() => setExpanded(false)} className="text-ink-400 hover:text-ink-700">
          <ChevronRight size={14} />
        </button>
      </div>

      {contact && (
        <div className="p-4 border-b border-ink-300">
          <div className="flex items-center gap-2.5 mb-3">
            <Avatar name={contact.name} size="md" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink-900 truncate">{contact.name}</p>
              <p className="text-xs text-ink-500 truncate">{contact.title}</p>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs text-ink-500">
              <Mail size={11} />
              <span className="truncate">{contact.email}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-500">
              <Building2 size={11} />
              <span className="truncate">{company?.name}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-500">
              <Tag size={11} />
              <span className="capitalize">{company?.type === "lp" ? "LP / Allocator" : "GP / Manager"}</span>
            </div>
          </div>
        </div>
      )}

      <div className="p-4">
        <button
          onClick={() => setShowHistory((v) => !v)}
          className="flex items-center gap-1 text-xs font-semibold text-ink-700 uppercase tracking-wide mb-2"
        >
          {showHistory ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
          Past conversations ({history.length})
        </button>
        {showHistory && (
          <div className="space-y-2">
            {history.length === 0 ? (
              <p className="text-xs text-ink-500">No prior conversations.</p>
            ) : (
              history.map((c) => (
                <div key={c.id} className="p-2.5 bg-ink-100 rounded-lg">
                  <p className="text-[11px] font-medium text-ink-700 truncate">{c.subject}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    {c.channel === "chat" ? (
                      <MessageCircle size={10} className="text-ink-400" />
                    ) : (
                      <Mail size={10} className="text-ink-400" />
                    )}
                    <span className="text-[10px] text-ink-400">{formatTime(c.createdAt)}</span>
                    <span
                      className={cn(
                        "text-[10px] px-1 rounded",
                        c.status === "closed"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
                      )}
                    >
                      {c.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="px-4 pb-4">
        <p className="text-[10px] font-semibold text-ink-500 uppercase tracking-wide mb-2">Notes</p>
        <textarea
          className="w-full text-xs text-ink-700 bg-ink-100 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-purple-300 placeholder:text-ink-400"
          rows={3}
          placeholder="Add a private note..."
        />
      </div>
    </div>
  );
}
