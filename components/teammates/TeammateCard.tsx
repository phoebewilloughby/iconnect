import type { Teammate } from "@/lib/types";
import Avatar from "@/components/ui/Avatar";
import StatusDot from "@/components/ui/StatusDot";
import Link from "next/link";
import { Mail, MessageCircle, ArrowRight } from "lucide-react";

export default function TeammateCard({ teammate }: { teammate: Teammate }) {
  const emailPct = teammate.openCount > 0
    ? Math.round((teammate.emailCount / teammate.openCount) * 100)
    : 0;
  const chatPct = 100 - emailPct;

  return (
    <div className="bg-white border border-ink-300 rounded-xl p-5 shadow-card hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 mb-4">
        <div className="relative">
          <Avatar name={teammate.name} size="lg" />
          <StatusDot
            status={teammate.status}
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 ring-2 ring-white"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-ink-900">{teammate.name}</h3>
          <p className="text-xs text-ink-500">{teammate.role}</p>
          <div className="flex items-center gap-1 mt-1">
            <StatusDot status={teammate.status} />
            <span className="text-[11px] text-ink-500 capitalize">{teammate.status}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-ink-100 rounded-lg p-2.5 text-center">
          <p className="text-lg font-bold text-ink-900">{teammate.openCount}</p>
          <p className="text-[10px] text-ink-500">Open</p>
        </div>
        <div className="bg-ink-100 rounded-lg p-2.5 text-center">
          <p className="text-lg font-bold text-ink-900">{teammate.avgResponseTime}</p>
          <p className="text-[10px] text-ink-500">Avg response</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-[10px] text-ink-500 mb-1.5">Channel distribution</p>
        <div className="flex rounded-full overflow-hidden h-2 bg-ink-200">
          <div
            className="bg-blue-400 transition-all"
            style={{ width: `${emailPct}%` }}
          />
          <div
            className="bg-purple-400 transition-all"
            style={{ width: `${chatPct}%` }}
          />
        </div>
        <div className="flex gap-3 mt-1">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="text-[10px] text-ink-500"><Mail size={9} className="inline" /> Email ({teammate.emailCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span className="text-[10px] text-ink-500"><MessageCircle size={9} className="inline" /> Chat ({teammate.chatCount})</span>
          </div>
        </div>
      </div>

      <Link
        href={`/teammates/${teammate.id}`}
        className="flex items-center justify-between text-xs font-medium text-purple-700 hover:text-purple-900 transition-colors"
      >
        View queue
        <ArrowRight size={13} />
      </Link>
    </div>
  );
}
