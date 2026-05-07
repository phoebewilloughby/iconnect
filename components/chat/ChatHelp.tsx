"use client";

import { useState } from "react";
import { KB_ARTICLES } from "@/lib/data";
import { Search, ChevronRight } from "lucide-react";

export default function ChatHelp() {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = KB_ARTICLES.filter(
    (a) =>
      !query ||
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  const grouped = filtered.reduce<Record<string, typeof filtered>>((acc, a) => {
    if (!acc[a.category]) acc[a.category] = [];
    acc[a.category].push(a);
    return acc;
  }, {});

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-2">
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
          <input
            className="w-full pl-8 pr-3 py-2 text-sm border border-ink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white"
            placeholder="Search help articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {Object.entries(grouped).map(([category, articles]) => (
          <div key={category} className="mb-4">
            <p className="text-[10px] font-semibold text-ink-500 uppercase tracking-wider mb-2">
              {category}
            </p>
            {articles.map((a) => (
              <div key={a.id}>
                <button
                  onClick={() => setExpanded(expanded === a.id ? null : a.id)}
                  className="w-full flex items-center justify-between py-2.5 text-sm text-ink-900 hover:text-purple-700 transition-colors text-left border-b border-ink-200"
                >
                  <span className="font-medium">{a.title}</span>
                  <ChevronRight
                    size={13}
                    className={`flex-shrink-0 text-ink-400 transition-transform ${expanded === a.id ? "rotate-90" : ""}`}
                  />
                </button>
                {expanded === a.id && (
                  <div className="py-3 text-xs text-ink-600 leading-relaxed border-b border-ink-200 bg-ink-100 px-3 rounded-b-lg">
                    {a.body.split("\n\n")[0]}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
