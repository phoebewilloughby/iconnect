"use client";

import { useRef, useEffect } from "react";
import type { Message } from "@/lib/types";
import { getContact, getTeammate } from "@/lib/data";
import Avatar from "@/components/ui/Avatar";
import FinSparkle from "@/components/icons/FinSparkle";
import { formatTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

function SystemMessage({ message }: { message: Message }) {
  return (
    <div className="flex items-center gap-3 py-3 px-4">
      <div className="flex-1 h-px bg-ink-300" />
      <span className="text-[11px] text-ink-500 flex-shrink-0">{message.content}</span>
      <div className="flex-1 h-px bg-ink-300" />
    </div>
  );
}

function EmailMeta({ message }: { message: Message }) {
  if (!message.subject && !message.from) return null;
  return (
    <div className="mb-2 pb-2 border-b border-ink-300 text-[11px] text-ink-500 space-y-0.5">
      {message.subject && (
        <div>
          <span className="font-medium text-ink-700">Subject:</span> {message.subject}
        </div>
      )}
      {message.from && (
        <div>
          <span className="font-medium text-ink-700">From:</span> {message.from}
        </div>
      )}
      {message.to && (
        <div>
          <span className="font-medium text-ink-700">To:</span> {message.to}
        </div>
      )}
      {message.cc && (
        <div>
          <span className="font-medium text-ink-700">CC:</span> {message.cc}
        </div>
      )}
    </div>
  );
}

function MessageBubble({ message, channel }: { message: Message; channel: "email" | "chat" | "ai" }) {
  const isAI = message.sender === "ai";
  const isMate = message.sender === "teammate";

  const getSenderName = () => {
    if (isAI) return "Fin AI";
    if (isMate) {
      const mate = message.senderId ? getTeammate(message.senderId) : null;
      return mate?.name ?? "Agent";
    }
    const contact = message.senderId ? getContact(message.senderId) : null;
    return contact?.name ?? "Client";
  };

  const senderName = getSenderName();

  if (channel === "chat") {
    const isRight = isMate;
    return (
      <div className={cn("flex gap-2 mb-3", isRight ? "flex-row-reverse" : "flex-row")}>
        {isAI ? (
          <div className="flex-shrink-0 mt-1">
            <FinSparkle size={26} />
          </div>
        ) : (
          <Avatar name={senderName} size="xs" className="flex-shrink-0 mt-1" />
        )}
        <div className={cn("max-w-[75%]", isRight && "items-end flex flex-col")}>
          <div className={cn("text-[10px] text-ink-500 mb-1", isRight && "text-right")}>
            {isAI ? "Fin" : senderName.split(" ")[0]} · {formatTime(message.timestamp)}
          </div>
          <div
            className={cn(
              "px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed",
              isRight
                ? "bg-purple-700 text-white rounded-tr-sm"
                : isAI
                ? "bg-purple-50 text-ink-900 border border-purple-200 rounded-tl-sm"
                : "bg-ink-100 text-ink-900 rounded-tl-sm"
            )}
          >
            {message.content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        {isAI ? (
          <FinSparkle size={22} />
        ) : (
          <Avatar name={senderName} size="xs" />
        )}
        <span className="text-xs font-semibold text-ink-900">
          {isAI ? "Fin AI" : senderName}
        </span>
        <span className="text-[10px] text-ink-400">{formatTime(message.timestamp)}</span>
        {isAI && (
          <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 rounded">AI</span>
        )}
      </div>
      <div className="ml-7 bg-white border border-ink-300 rounded-xl px-4 py-3">
        <EmailMeta message={message} />
        <p className="text-sm text-ink-900 whitespace-pre-line leading-relaxed">
          {message.content}
        </p>
      </div>
    </div>
  );
}

interface Props {
  messages: Message[];
  channel: "email" | "chat" | "ai";
}

export default function MessageThread({ messages, channel }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin px-5 py-5">
      {messages.map((msg) =>
        msg.sender === "system" ? (
          <SystemMessage key={msg.id} message={msg} />
        ) : (
          <MessageBubble key={msg.id} message={msg} channel={channel} />
        )
      )}
      <div ref={bottomRef} />
    </div>
  );
}
