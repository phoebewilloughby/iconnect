"use client";

import { cn, formatTime } from "@/lib/utils";
import type { Conversation } from "@/lib/types";
import { getContact, getCompany, getTeammate } from "@/lib/data";
import Avatar from "@/components/ui/Avatar";
import FinSparkle from "@/components/icons/FinSparkle";
import { Mail, MessageCircle, Sparkles, AlertTriangle, Lock } from "lucide-react";

const channelAccent: Record<string, string> = {
  email: "border-l-blue-400",
  chat: "border-l-emerald-400",
  ai: "border-l-purple-400",
};

const channelIcons = {
  email: <Mail size={10} className="text-blue-400" />,
  chat: <MessageCircle size={10} className="text-emerald-500" />,
  ai: <Sparkles size={10} className="text-purple-500" />,
};

interface Props {
  conversation: Conversation;
  selected: boolean;
  onSelect: () => void;
}

export default function ConversationListItem({ conversation, selected, onSelect }: Props) {
  const contact = getContact(conversation.contactId);
  const company = getCompany(conversation.companyId);
  const assignee = conversation.assigneeId ? getTeammate(conversation.assigneeId) : null;

  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full text-left px-4 py-3.5 border-b border-ink-300 border-l-[3px] transition-all flex gap-3 group",
        selected
          ? cn("bg-purple-50", channelAccent[conversation.channel])
          : cn("border-l-transparent hover:bg-purple-50/60 hover:border-l-purple-300"),
        conversation.isUnread && !selected && "bg-white"
      )}
    >
      <div className="relative flex-shrink-0 mt-0.5">
        <Avatar name={contact?.name ?? "?"} size="sm" />
        {conversation.isUnread && (
          <span className="absolute -top-0.5 -left-0.5 w-2 h-2 rounded-full bg-purple-600 ring-2 ring-white" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        {/* Name + time */}
        <div className="flex items-baseline gap-1 mb-0.5">
          <span className={cn(
            "text-sm truncate flex-1",
            conversation.isUnread ? "font-semibold text-ink-900" : "font-medium text-ink-700"
          )}>
            {contact?.name ?? "Unknown"}
          </span>
          <span className="text-[10px] text-ink-400 flex-shrink-0 tabular-nums">
            {formatTime(conversation.updatedAt)}
          </span>
        </div>

        {/* Company + badges */}
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[11px] text-ink-500 truncate flex-1">{company?.name}</span>
          <span className="flex items-center gap-1 flex-shrink-0">
            {channelIcons[conversation.channel]}
            {conversation.isConfidential && <Lock size={9} className="text-amber-500" />}
            {conversation.hasFinDraft && <FinSparkle size={11} />}
            {conversation.section.includes("bounces") && <AlertTriangle size={9} className="text-danger" />}
          </span>
        </div>

        {/* Subject */}
        <p className={cn(
          "text-xs truncate",
          conversation.isUnread ? "text-ink-700 font-medium" : "text-ink-400"
        )}>
          {conversation.subject}
        </p>

        {/* Assignee pill */}
        {assignee && (
          <div className="mt-1.5">
            <span className="inline-flex items-center gap-1 text-[10px] bg-ink-100 text-ink-500 px-1.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" />
              {assignee.name.split(" ")[0]}
            </span>
          </div>
        )}
      </div>
    </button>
  );
}
