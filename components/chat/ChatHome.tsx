"use client";

import { MessageCircle, BookOpen, TrendingUp, ArrowRight } from "lucide-react";

interface Props {
  onStartChat: () => void;
}

export default function ChatHome({ onStartChat }: Props) {
  return (
    <div className="p-5 overflow-y-auto h-full">
      <h3 className="text-base font-semibold text-ink-900 mb-1">How can we help?</h3>
      <p className="text-sm text-ink-500 mb-5">Start a conversation or browse help articles.</p>

      <div className="space-y-2.5 mb-6">
        <button
          onClick={onStartChat}
          className="w-full flex items-center gap-3 bg-white border border-ink-300 rounded-xl px-4 py-3.5 hover:border-purple-400 hover:bg-purple-50 transition-colors text-left"
        >
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
            <MessageCircle size={15} className="text-purple-700" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-ink-900">Ask a question</p>
            <p className="text-xs text-ink-500">Chat with Fin AI or our team</p>
          </div>
          <ArrowRight size={14} className="text-ink-400 flex-shrink-0" />
        </button>

        <button className="w-full flex items-center gap-3 bg-white border border-ink-300 rounded-xl px-4 py-3.5 hover:border-purple-400 hover:bg-purple-50 transition-colors text-left">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <BookOpen size={15} className="text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-ink-900">Browse help articles</p>
            <p className="text-xs text-ink-500">Self-serve answers in our knowledge base</p>
          </div>
          <ArrowRight size={14} className="text-ink-400 flex-shrink-0" />
        </button>

        <button className="w-full flex items-center gap-3 bg-white border border-ink-300 rounded-xl px-4 py-3.5 hover:border-purple-400 hover:bg-purple-50 transition-colors text-left">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <TrendingUp size={15} className="text-emerald-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-ink-900">See latest fund returns</p>
            <p className="text-xs text-ink-500">Access your monthly performance reports</p>
          </div>
          <ArrowRight size={14} className="text-ink-400 flex-shrink-0" />
        </button>
      </div>

      {/* Recent conversation preview */}
      <div className="bg-ink-100 rounded-xl p-4">
        <p className="text-[10px] font-semibold text-ink-500 uppercase tracking-wider mb-3">Recent conversation</p>
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 rounded-full bg-purple-700 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-[8px] font-bold">F</span>
          </div>
          <div className="bg-white rounded-xl px-3 py-2 text-xs text-ink-700 shadow-sm">
            Your April performance report is now available in the Document Library under Documents → Monthly Reports.
          </div>
        </div>
        <button
          onClick={onStartChat}
          className="mt-3 text-xs font-medium text-purple-700 hover:text-purple-900 transition-colors"
        >
          Continue conversation →
        </button>
      </div>
    </div>
  );
}
