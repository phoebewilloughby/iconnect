"use client";

import { useState } from "react";
import AppShell from "@/components/shell/AppShell";
import { MACROS } from "@/lib/data";
import type { Macro } from "@/lib/types";
import { formatTime } from "@/lib/utils";
import { Plus, Search, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const CATEGORIES = ["all", "returns", "account", "conferences", "platform", "ooo", "compliance", "general"];
const CAT_LABELS: Record<string, string> = {
  all: "All",
  returns: "Returns",
  account: "Account",
  conferences: "Conferences",
  platform: "Platform",
  ooo: "Out of Office",
  compliance: "Compliance",
  general: "General",
};

function MacroModal({ macro, onClose }: { macro: Macro; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full">
        <div className="flex items-start justify-between p-6 border-b border-ink-300">
          <div>
            <h2 className="text-base font-bold text-ink-900">{macro.title}</h2>
            <span className="text-[11px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full capitalize mt-1 inline-block">
              {CAT_LABELS[macro.category]}
            </span>
          </div>
          <button onClick={onClose} className="text-ink-400 hover:text-ink-700 p-1">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">
          <p className="text-sm text-ink-700 leading-relaxed">{macro.body}</p>
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-ink-300 text-xs text-ink-500">
            <span>Used {macro.timesUsed} times this month</span>
            <span>Last used {formatTime(macro.lastUsed)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreateMacroModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full">
        <div className="flex items-start justify-between p-6 border-b border-ink-300">
          <h2 className="text-base font-bold text-ink-900">New Macro</h2>
          <button onClick={onClose} className="text-ink-400 hover:text-ink-700 p-1">
            <X size={18} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-ink-700 block mb-1">Title</label>
            <input className="w-full px-3 py-2 text-sm border border-ink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" placeholder="Macro title..." />
          </div>
          <div>
            <label className="text-xs font-medium text-ink-700 block mb-1">Category</label>
            <select className="w-full px-3 py-2 text-sm border border-ink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300">
              {CATEGORIES.filter((c) => c !== "all").map((c) => (
                <option key={c} value={c}>{CAT_LABELS[c]}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-ink-700 block mb-1">Body</label>
            <textarea rows={5} className="w-full px-3 py-2 text-sm border border-ink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none" placeholder="Write your macro here..." />
          </div>
          <div>
            <label className="text-xs font-medium text-ink-700 block mb-1">KB Article link (optional)</label>
            <input className="w-full px-3 py-2 text-sm border border-ink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" placeholder="e.g. kb1" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button onClick={onClose}>Create Macro</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MacrosPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedMacro, setSelectedMacro] = useState<Macro | null>(null);
  const [creating, setCreating] = useState(false);

  const filtered = MACROS.filter((m) => {
    const matchCat = activeCategory === "all" || m.category === activeCategory;
    const matchQ = !query || m.title.toLowerCase().includes(query.toLowerCase()) || m.body.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <AppShell>
      <div className="h-full overflow-y-auto scrollbar-thin">
        <div className="max-w-5xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-ink-900">Macros</h1>
              <p className="text-sm text-ink-500 mt-1">
                Canned replies for common support scenarios
              </p>
            </div>
            <Button onClick={() => setCreating(true)}>
              <Plus size={14} />
              New macro
            </Button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex-1 max-w-xs">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
              <input
                className="w-full pl-8 pr-3 py-2 text-sm border border-ink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                placeholder="Search macros..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "text-xs px-3 py-1.5 rounded-full border transition-colors",
                    activeCategory === cat
                      ? "bg-purple-700 text-white border-purple-700"
                      : "border-ink-300 text-ink-600 hover:border-purple-400 hover:text-purple-700"
                  )}
                >
                  {CAT_LABELS[cat]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMacro(m)}
                className="bg-white border border-ink-300 rounded-xl p-4 text-left hover:border-purple-300 hover:shadow-card transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm font-semibold text-ink-900 flex-1">{m.title}</h3>
                  <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full capitalize flex-shrink-0">
                    {CAT_LABELS[m.category]}
                  </span>
                </div>
                <p className="text-xs text-ink-500 line-clamp-2 mb-3 leading-relaxed">{m.body}</p>
                <div className="flex items-center gap-3 text-[10px] text-ink-400">
                  <span>{m.timesUsed}× used</span>
                  <span>Last: {formatTime(m.lastUsed)}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-ink-300 text-center">
            <p className="text-xs text-ink-400">Powered by iConnections Knowledge Base</p>
          </div>
        </div>
      </div>

      {selectedMacro && (
        <MacroModal macro={selectedMacro} onClose={() => setSelectedMacro(null)} />
      )}
      {creating && <CreateMacroModal onClose={() => setCreating(false)} />}
    </AppShell>
  );
}
