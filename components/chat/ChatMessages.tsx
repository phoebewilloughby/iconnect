"use client";

import { useState, useRef, useEffect } from "react";
import { Send, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "user" | "fin" | "system" | "marcus";
  content: string;
  typing?: boolean;
}

const FIN_RESPONSES = [
  "I can help with that! Could you provide a bit more detail so I can give you the most accurate answer?",
  "Great question. Based on our knowledge base, I can tell you that monthly performance reports are published by the 15th business day following month-end, and are available in your Document Library.",
  "I understand. This is something our team handles with care. Let me pull up the relevant information for you.",
  "For account-related requests, you can update most settings directly in the platform under Settings → Profile. Would you like me to walk you through it?",
  "I see — that sounds like it might need a human specialist. Let me connect you with someone from the team right now.",
];

const HANDOFF_TRIGGER_COUNT = 2;

export default function ChatMessages() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "fin-greeting",
      role: "fin",
      content: "Hi! I'm Fin, iConnections' AI assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [userMsgCount, setUserMsgCount] = useState(0);
  const [handedOff, setHandedOff] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
    };
    const newCount = userMsgCount + 1;
    setUserMsgCount(newCount);
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const finReply: ChatMessage = {
        id: `fin-${Date.now()}`,
        role: "fin",
        content: FIN_RESPONSES[Math.min(newCount - 1, FIN_RESPONSES.length - 1)],
      };
      setMessages((prev) => [...prev, finReply]);

      if (newCount >= HANDOFF_TRIGGER_COUNT && !handedOff) {
        setTimeout(() => {
          setHandedOff(true);
          const systemMsg: ChatMessage = {
            id: `system-${Date.now()}`,
            role: "system",
            content: "Marcus Johnson joined the conversation",
          };
          const marcusMsg: ChatMessage = {
            id: `marcus-${Date.now()}`,
            role: "marcus",
            content: "Hi there, Marcus here. I can take it from here — happy to help with anything you need.",
          };
          setMessages((prev) => [...prev, systemMsg, marcusMsg]);
        }, 800);
      }
    }, 1200);
  };

  const handleTalkToHuman = () => {
    if (handedOff) return;
    setHandedOff(true);
    const sysMsg: ChatMessage = {
      id: `system-${Date.now()}`,
      role: "system",
      content: "Marcus Johnson joined the conversation",
    };
    const marcusMsg: ChatMessage = {
      id: `marcus-${Date.now()}`,
      role: "marcus",
      content: "Hi! Marcus here from the iConnections support team. How can I help?",
    };
    setMessages((prev) => [...prev, sysMsg, marcusMsg]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg) => {
          if (msg.role === "system") {
            return (
              <div key={msg.id} className="flex items-center gap-2">
                <div className="flex-1 h-px bg-ink-300" />
                <span className="text-[10px] text-ink-400 flex-shrink-0 flex items-center gap-1">
                  <UserCheck size={10} />
                  {msg.content}
                </span>
                <div className="flex-1 h-px bg-ink-300" />
              </div>
            );
          }

          const isUser = msg.role === "user";
          const isFin = msg.role === "fin";
          const isMarcus = msg.role === "marcus";

          return (
            <div key={msg.id} className={cn("flex gap-2", isUser && "flex-row-reverse")}>
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-auto",
                  isFin && "bg-purple-700 text-white",
                  isMarcus && "bg-emerald-200 text-emerald-800",
                  isUser && "bg-blue-200 text-blue-800"
                )}
              >
                {isFin ? "F" : isMarcus ? "MJ" : "You"}
              </div>
              <div
                className={cn(
                  "max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed",
                  isUser
                    ? "bg-purple-700 text-white rounded-tr-sm"
                    : isFin
                    ? "bg-purple-50 border border-purple-200 text-ink-900 rounded-tl-sm"
                    : "bg-ink-100 text-ink-900 rounded-tl-sm"
                )}
              >
                {msg.content}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex gap-2 items-end">
            <div className="w-6 h-6 rounded-full bg-purple-700 flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0">
              F
            </div>
            <div className="bg-purple-50 border border-purple-200 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
              <span className="typing-dot w-1.5 h-1.5 rounded-full bg-purple-400 inline-block" />
              <span className="typing-dot w-1.5 h-1.5 rounded-full bg-purple-400 inline-block" />
              <span className="typing-dot w-1.5 h-1.5 rounded-full bg-purple-400 inline-block" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {!handedOff && (
        <div className="px-4 pb-2 flex justify-center">
          <button
            onClick={handleTalkToHuman}
            className="text-xs text-purple-700 font-medium hover:text-purple-900 flex items-center gap-1 transition-colors"
          >
            <UserCheck size={12} />
            Talk to a human
          </button>
        </div>
      )}

      <div className="px-4 pb-4 pt-2 border-t border-ink-300 flex gap-2">
        <input
          className="flex-1 px-3 py-2 text-sm border border-ink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className="w-9 h-9 rounded-xl bg-purple-700 text-white flex items-center justify-center disabled:opacity-40 hover:bg-purple-800 transition-colors"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}
