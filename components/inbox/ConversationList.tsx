"use client";

import { useState, useMemo } from "react";
import { useAppStore } from "@/lib/store";
import { getConversationsForSection } from "@/lib/data";
import ConversationListItem from "./ConversationListItem";
import Input from "@/components/ui/Input";
import { Search, SlidersHorizontal } from "lucide-react";

export default function ConversationList() {
  const { selectedConversationId, selectConversation, activeSection, conversations, searchQuery, setSearchQuery } = useAppStore();
  const [sortNewest, setSortNewest] = useState(true);

  const filtered = useMemo(() => {
    let base = getConversationsForSection(activeSection)
      .map((c) => conversations.find((x) => x.id === c.id) ?? c);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      base = base.filter(
        (c) =>
          c.subject.toLowerCase().includes(q) ||
          c.preview.toLowerCase().includes(q)
      );
    }

    return [...base].sort((a, b) =>
      sortNewest
        ? b.updatedAt.getTime() - a.updatedAt.getTime()
        : a.updatedAt.getTime() - b.updatedAt.getTime()
    );
  }, [activeSection, conversations, searchQuery, sortNewest]);

  const sectionLabel: Record<string, string> = {
    all: "All Conversations",
    mine: "Mine",
    unassigned: "Unassigned",
    email: "Email",
    chat: "Live Chat",
    ai: "AI / Fin",
    "monthly-returns": "Monthly Returns",
    ooo: "Out of Office",
    bounces: "Bounces",
    open: "Open",
    closed: "Closed",
    snoozed: "Snoozed",
    spam: "Spam",
    mentions: "Mentions",
  };

  return (
    <div className="flex flex-col h-full border-r border-ink-300 w-[310px] flex-shrink-0">
      <div className="px-3 py-3 border-b border-ink-300 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-ink-900">
            {sectionLabel[activeSection] ?? activeSection}
          </span>
          <span className="text-xs text-ink-500">{filtered.length}</span>
        </div>
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 py-1.5 text-xs"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSortNewest((v) => !v)}
            className="flex items-center gap-1 text-xs text-ink-500 hover:text-ink-700 transition-colors"
          >
            <SlidersHorizontal size={11} />
            Sort: {sortNewest ? "Newest" : "Oldest"}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3 px-6">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-500 text-lg">✓</span>
            </div>
            <p className="text-sm font-medium text-ink-700 text-center">All caught up!</p>
            <p className="text-xs text-ink-500 text-center">
              No conversations in {sectionLabel[activeSection] ?? activeSection}.
            </p>
          </div>
        ) : (
          filtered.map((conv) => (
            <ConversationListItem
              key={conv.id}
              conversation={conv}
              selected={selectedConversationId === conv.id}
              onSelect={() => selectConversation(conv.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
