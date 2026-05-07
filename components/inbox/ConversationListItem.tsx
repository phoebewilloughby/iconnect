"use client";

import { cn, formatTime } from "@/lib/utils";
import type { Conversation } from "@/lib/types";
import { getContact, getCompany, getTeammate } from "@/lib/data";
import Avatar from "@/components/ui/Avatar";
import FinSparkle from "@/components/icons/FinSparkle";
import { Mail, MessageCircle, Sparkles, AlertTriangle, Lock } from "lucide-react";

const channelIcons = {
  email: <Mail size={11} className="text-ink-500" />,
  chat: <MessageCircle size={11} className="text-blue-500" />,
  ai: <Sparkles size={11} className="text-purple-500" />,
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
        "w-full text-left px-4 py-3 border-b border-ink-300 hover:bg-purple-50 transition-colors flex gap-3",
        selected && "bg-purple-100 hover:bg-purple-100",
        conversation.isUnread && !selected && "bg-white"
      )}
    >
      <div className="relative flex-shrink-0 mt-0.5">
        <Avatar name={contact?.name ?? "?"} size="sm" />
        {conversation.isUnread && (
          <span className="absolute -top-0.5 -left-0.5 w-2 h-2 rounded-full bg-purple-700 ring-2 ring-white" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1 mb-0.5">
          <span
            className={cn(
              "text-sm truncate flex-1",
              conversation.isUnread ? "font-semibold text-ink-900" : "font-medium text-ink-700"
            )}
          >
            {contact?.name ?? "Unknown"}
          </span>
          <span className="text-[10px] text-ink-500 flex-shrink-0 ml-1">
            {formatTime(conversation.updatedAt)}
          </span>
        </div>

        <div className="flex items-center gap-1 mb-0.5">
          <span className="text-[11px] text-ink-500 truncate flex-1">
            {company?.name}
          </span>
          {conversation.isConfidential && (
            <Lock size={10} className="text-amber-600 flex-shrink-0" />
          )}
          {conversation.hasFinDraft && (
            <FinSparkle size={12} className="flex-shrink-0" />
          )}
          {channelIcons[conversation.channel]}
        </div>

        <div className="flex items-center gap-1">
          {conversation.section.includes("bounces") && (
            <AlertTriangle size={10} className="text-danger flex-shrink-0" />
          )}
          <span
            className={cn(
              "text-xs truncate flex-1",
              conversation.isUnread ? "text-ink-700 font-medium" : "text-ink-500"
            )}
          >
            {conversation.subject}
          </span>
        </div>

        <p className="text-[11px] text-ink-500 truncate mt-0.5">{conversation.preview}</p>

        {assignee && (
          <div className="mt-1.5">
            <span className="text-[10px] bg-ink-100 text-ink-600 px-1.5 py-0.5 rounded-full">
              {assignee.name.split(" ")[0]}
            </span>
          </div>
        )}
      </div>
    </button>
  );
}
