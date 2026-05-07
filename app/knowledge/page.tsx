"use client";

import { useState } from "react";
import AppShell from "@/components/shell/AppShell";
import { KB_ARTICLES } from "@/lib/data";
import { formatTime } from "@/lib/utils";
import { BookOpen, Search } from "lucide-react";
import FinSparkle from "@/components/icons/FinSparkle";
import { cn } from "@/lib/utils";

export default function KnowledgePage() {
  const [selected, setSelected] = useState(KB_ARTICLES[0]);
  const [query, setQuery] = useState("");

  const filtered = KB_ARTICLES.filter(
    (a) =>
      !query ||
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AppShell>
      <div className="flex h-full">
        {/* List */}
        <div className="w-[280px] flex-shrink-0 border-r border-ink-300 flex flex-col h-full">
          <div className="px-4 py-4 border-b border-ink-300">
            <h2 className="text-sm font-bold text-ink-900 mb-3">Knowledge Base</h2>
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
              <input
                className="w-full pl-8 pr-3 py-2 text-sm border border-ink-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-300"
                placeholder="Search articles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {filtered.map((a) => (
              <button
                key={a.id}
                onClick={() => setSelected(a)}
                className={cn(
                  "w-full text-left px-4 py-3.5 border-b border-ink-300 hover:bg-purple-50 transition-colors",
                  selected.id === a.id && "bg-purple-100"
                )}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[10px] bg-ink-200 text-ink-600 px-1.5 py-0.5 rounded-full">
                    {a.category}
                  </span>
                </div>
                <p className="text-sm font-medium text-ink-900 leading-snug">{a.title}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <FinSparkle size={11} />
                  <span className="text-[10px] text-ink-500">Used by Fin {a.finUsageCount}×</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail */}
        <div className="flex-1 overflow-y-auto scrollbar-thin h-full">
          <div className="max-w-2xl mx-auto px-8 py-8">
            <div className="flex items-start gap-3 mb-2">
              <BookOpen size={18} className="text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                  {selected.category}
                </span>
              </div>
            </div>
            <h1 className="text-xl font-bold text-ink-900 mb-2">{selected.title}</h1>
            <div className="flex items-center gap-4 text-xs text-ink-500 mb-6 pb-6 border-b border-ink-300">
              <span>Updated {formatTime(selected.updatedAt)}</span>
              <div className="flex items-center gap-1">
                <FinSparkle size={12} />
                <span>Used by Fin in {selected.finUsageCount} replies this month</span>
              </div>
            </div>
            <div className="prose prose-sm max-w-none">
              {selected.body.split("\n\n").map((para, i) => (
                <p key={i} className="text-sm text-ink-700 leading-relaxed mb-4">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
