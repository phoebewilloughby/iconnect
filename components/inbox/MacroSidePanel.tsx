"use client";

import { useState } from "react";
import { MACROS, KB_ARTICLES } from "@/lib/data";
import FinSparkle from "@/components/icons/FinSparkle";
import { ChevronRight, Search } from "lucide-react";

interface Props {
  onInsert: (body: string) => void;
}

export default function MacroSidePanel({ onInsert }: Props) {
  const [expanded, setExpanded] = useState(true);
  const [query, setQuery] = useState("");

  const aiSuggestions = MACROS.slice(0, 2).map((m) => ({
    ...m,
    article: KB_ARTICLES.find((a) => a.id === m.kbArticleId),
  }));

  const filtered = MACROS.filter(
    (m) =>
      !query ||
      m.title.toLowerCase().includes(query.toLowerCase()) ||
      m.category.toLowerCase().includes(query.toLowerCase())
  );

  const categoryOrder = ["returns", "account", "conferences", "platform", "ooo", "compliance", "general"];
  const grouped = categoryOrder
    .map((cat) => ({
      cat,
      items: filtered.filter((m) => m.category === cat),
    }))
    .filter((g) => g.items.length > 0);

  const catLabel: Record<string, string> = {
    returns: "Returns",
    account: "Account",
    conferences: "Conferences",
    platform: "Platform",
    ooo: "Out of Office",
    compliance: "Compliance",
    general: "General",
  };

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="w-6 h-full border-l border-ink-300 flex items-center justify-center hover:bg-ink-100 transition-colors flex-shrink-0"
        title="Suggested replies"
      >
        <ChevronRight size={14} className="text-purple-600" />
      </button>
    );
  }

  return (
    <div className="w-[220px] flex-shrink-0 border-l border-ink-300 h-full overflow-y-auto scrollbar-thin bg-white">
      <div className="px-3 py-3 border-b border-ink-300 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <FinSparkle size={14} />
          <span className="text-xs font-semibold text-ink-700">Suggested replies</span>
        </div>
        <button onClick={() => setExpanded(false)} className="text-ink-400 hover:text-ink-700">
          <ChevronRight size={13} />
        </button>
      </div>

      <div className="p-2 border-b border-ink-300">
        <p className="text-[10px] text-ink-500 uppercase tracking-wide font-semibold px-1 mb-2">AI suggestions</p>
        {aiSuggestions.map((s) => (
          <div key={s.id} className="p-2 mb-1.5 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-[11px] font-medium text-ink-900 mb-1">{s.title}</p>
            <p className="text-[10px] text-ink-500 line-clamp-2 mb-2">{s.body.slice(0, 80)}…</p>
            {s.article && (
              <p className="text-[9px] text-purple-600 mb-1.5">KB: {s.article.title}</p>
            )}
            <button
              onClick={() => onInsert(s.body)}
              className="text-[10px] font-semibold text-purple-700 hover:text-purple-900 transition-colors"
            >
              Insert →
            </button>
          </div>
        ))}
      </div>

      <div className="p-2">
        <div className="relative mb-2">
          <Search size={11} className="absolute left-2 top-1/2 -translate-y-1/2 text-ink-500" />
          <input
            className="w-full pl-6 pr-2 py-1.5 text-[11px] border border-ink-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-300"
            placeholder="Search macros..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {grouped.map(({ cat, items }) => (
          <div key={cat} className="mb-2">
            <p className="text-[9px] font-semibold text-ink-400 uppercase tracking-wider px-1 mb-1">
              {catLabel[cat]}
            </p>
            {items.map((m) => (
              <button
                key={m.id}
                onClick={() => onInsert(m.body)}
                className="w-full text-left p-2 rounded-lg hover:bg-purple-50 transition-colors group mb-0.5"
              >
                <p className="text-[11px] font-medium text-ink-800 group-hover:text-purple-800">{m.title}</p>
                <p className="text-[10px] text-ink-400 truncate">{m.body.slice(0, 55)}…</p>
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="px-3 py-2 border-t border-ink-300 bg-ink-100">
        <p className="text-[9px] text-ink-400 text-center">Powered by iConnections Knowledge Base</p>
      </div>
    </div>
  );
}
