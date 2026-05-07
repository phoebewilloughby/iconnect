"use client";

import { useState, useRef } from "react";
import { useAppStore } from "@/lib/store";
import Button from "@/components/ui/Button";
import { MACROS } from "@/lib/data";
import { Send, Paperclip, Zap } from "lucide-react";

interface Props {
  conversationId: string;
}

export default function ComposeBox({ conversationId }: Props) {
  const { sendMessage, closeConversation, addToast } = useAppStore();
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [showMacros, setShowMacros] = useState(false);
  const [macroQuery, setMacroQuery] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const filteredMacros = MACROS.filter(
    (m) =>
      !macroQuery ||
      m.title.toLowerCase().includes(macroQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(macroQuery.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "/" && draft === "") {
      e.preventDefault();
      setShowMacros(true);
      setMacroQuery("");
      return;
    }
    if (showMacros) {
      if (e.key === "Escape") setShowMacros(false);
    }
  };

  const insertMacro = (body: string) => {
    if (draft && !window.confirm("Replace current draft with macro?")) return;
    setDraft(body);
    setShowMacros(false);
    addToast("Macro inserted");
    textareaRef.current?.focus();
  };

  const handleSend = () => {
    if (!draft.trim()) return;
    setStatus("sending");
    sendMessage(conversationId, draft.trim());
    setTimeout(() => {
      setDraft("");
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 1500);
    }, 600);
  };

  const handleSendAndClose = () => {
    if (draft.trim()) {
      sendMessage(conversationId, draft.trim());
    }
    setDraft("");
    closeConversation(conversationId);
    addToast("Conversation closed");
  };

  return (
    <div className="border-t border-ink-300 bg-white">
      {showMacros && (
        <div className="border-b border-ink-300 p-2">
          <input
            autoFocus
            className="w-full px-3 py-1.5 text-sm border border-ink-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-300"
            placeholder="Search macros..."
            value={macroQuery}
            onChange={(e) => setMacroQuery(e.target.value)}
          />
          <div className="mt-1.5 max-h-40 overflow-y-auto scrollbar-thin">
            {filteredMacros.map((m) => (
              <button
                key={m.id}
                onClick={() => insertMacro(m.body)}
                className="w-full text-left px-3 py-2 hover:bg-purple-50 rounded-lg"
              >
                <div className="text-xs font-medium text-ink-900">{m.title}</div>
                <div className="text-[10px] text-ink-500 truncate">{m.body.slice(0, 80)}...</div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="px-4 py-3">
        <textarea
          ref={textareaRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Reply... (type / for macros)"
          rows={3}
          className="w-full resize-none text-sm text-ink-900 placeholder:text-ink-500 focus:outline-none"
        />
        <div className="flex items-center justify-between pt-2 border-t border-ink-300">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowMacros((v) => !v)}
              className="p-1.5 rounded text-ink-500 hover:text-purple-700 hover:bg-purple-50 transition-colors"
              title="Macros (/)"
            >
              <Zap size={15} />
            </button>
            <button className="p-1.5 rounded text-ink-500 hover:text-ink-700 hover:bg-ink-100 transition-colors">
              <Paperclip size={15} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {status === "sent" && (
              <span className="text-xs text-success font-medium">Sent ✓</span>
            )}
            {status === "sending" && (
              <span className="text-xs text-ink-500">Sending…</span>
            )}
            <Button variant="secondary" size="sm" onClick={handleSendAndClose}>
              Send & Close
            </Button>
            <Button
              size="sm"
              onClick={handleSend}
              disabled={!draft.trim() || status === "sending"}
            >
              <Send size={13} />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
