"use client";

import { useState } from "react";
import type { Conversation } from "@/lib/types";
import { useAppStore } from "@/lib/store";
import { TEAMMATES } from "@/lib/data";
import Avatar from "@/components/ui/Avatar";
import StatusDot from "@/components/ui/StatusDot";
import { ChevronDown, UserMinus, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { getTeammate } from "@/lib/data";

interface Props {
  conversation: Conversation;
}

export default function AssignmentControls({ conversation }: Props) {
  const { assignConversation, addToast } = useAppStore();
  const [showAssignee, setShowAssignee] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  const assignee = conversation.assigneeId ? getTeammate(conversation.assigneeId) : null;

  const handleAssign = (id: string | undefined, name: string) => {
    assignConversation(conversation.id, id);
    setShowAssignee(false);
    addToast(
      id
        ? `Moved to ${name}'s queue. Undo.`
        : "Unassigned."
    );
  };

  const inboxOptions = ["Monthly Returns", "Email", "Live Chat", "Out of Office", "Bounces"];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {conversation.isConfidential && (
        <span className="flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
          <Lock size={10} />
          Confidential
        </span>
      )}

      {/* Assignee */}
      <div className="relative">
        <button
          onClick={() => { setShowAssignee((v) => !v); setShowInbox(false); }}
          className="flex items-center gap-1.5 text-xs bg-white border border-ink-300 rounded-lg px-2.5 py-1.5 hover:bg-ink-100 transition-colors"
        >
          {assignee ? (
            <>
              <Avatar name={assignee.name} size="xs" />
              <span className="text-ink-700">{assignee.name.split(" ")[0]}</span>
            </>
          ) : (
            <span className="text-ink-500">Unassigned</span>
          )}
          <ChevronDown size={11} className="text-ink-400" />
        </button>
        {showAssignee && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-ink-300 rounded-xl shadow-md z-20 min-w-[180px] py-1 overflow-hidden">
            {TEAMMATES.map((t) => (
              <button
                key={t.id}
                onClick={() => handleAssign(t.id, t.name)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 hover:bg-purple-50 transition-colors",
                  conversation.assigneeId === t.id && "bg-purple-100"
                )}
              >
                <div className="relative">
                  <Avatar name={t.name} size="xs" />
                  <StatusDot status={t.status} className="absolute -bottom-0.5 -right-0.5 ring-1 ring-white" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-xs font-medium text-ink-900 truncate">{t.name}</p>
                  <p className="text-[10px] text-ink-400">{t.openCount} open</p>
                </div>
              </button>
            ))}
            <div className="border-t border-ink-300 mt-1 pt-1">
              <button
                onClick={() => handleAssign(undefined, "Unassigned")}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-ink-100 transition-colors text-xs text-ink-500"
              >
                <UserMinus size={12} />
                Unassign
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Move to inbox */}
      <div className="relative">
        <button
          onClick={() => { setShowInbox((v) => !v); setShowAssignee(false); }}
          className="flex items-center gap-1 text-xs bg-white border border-ink-300 rounded-lg px-2.5 py-1.5 hover:bg-ink-100 transition-colors text-ink-600"
        >
          Move to
          <ChevronDown size={11} className="text-ink-400" />
        </button>
        {showInbox && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-ink-300 rounded-xl shadow-md z-20 min-w-[160px] py-1 overflow-hidden">
            {inboxOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  setShowInbox(false);
                  addToast(`Moved to ${opt} inbox.`);
                }}
                className="w-full text-left px-3 py-2 hover:bg-purple-50 text-xs text-ink-700 transition-colors"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
