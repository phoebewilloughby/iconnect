"use client";

import { useAppStore } from "@/lib/store";
import { getContact, getCompany, KB_ARTICLES, MACROS } from "@/lib/data";
import MessageThread from "./MessageThread";
import CustomerPanel from "./CustomerPanel";
import MacroSidePanel from "./MacroSidePanel";
import AssignmentControls from "./AssignmentControls";
import Button from "@/components/ui/Button";
import FinSparkle from "@/components/icons/FinSparkle";
import { Mail, MessageCircle, Check, AlertTriangle, Plane, Send, Paperclip, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

function ComposeBox({
  conversationId,
  externalDraft,
  onExternalDraftUsed,
}: {
  conversationId: string;
  externalDraft: string;
  onExternalDraftUsed: () => void;
}) {
  const [draft, setDraft] = useState("");
  const [prevExternal, setPrevExternal] = useState("");
  const { sendMessage, closeConversation, addToast } = useAppStore();
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [showMacros, setShowMacros] = useState(false);
  const [macroQuery, setMacroQuery] = useState("");

  if (externalDraft && externalDraft !== prevExternal) {
    setPrevExternal(externalDraft);
    setDraft(externalDraft);
    onExternalDraftUsed();
  }

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
    }
    if (showMacros && e.key === "Escape") setShowMacros(false);
  };

  const insertMacro = (body: string) => {
    if (draft && !window.confirm("Replace current draft with macro?")) return;
    setDraft(body);
    setShowMacros(false);
    addToast("Macro inserted");
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
    if (draft.trim()) sendMessage(conversationId, draft.trim());
    setDraft("");
    closeConversation(conversationId);
    addToast("Conversation closed");
  };

  return (
    <div className="border-t border-ink-300 bg-white flex-shrink-0">
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
            {status === "sent" && <span className="text-xs text-success font-medium">Sent ✓</span>}
            {status === "sending" && <span className="text-xs text-ink-500">Sending…</span>}
            <Button variant="secondary" size="sm" onClick={handleSendAndClose}>
              Send & Close
            </Button>
            <Button size="sm" onClick={handleSend} disabled={!draft.trim() || status === "sending"}>
              <Send size={13} />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConversationDetail() {
  const { conversations, selectedConversationId, dismissFinDraft, consumeFinDraft, removeFromDistro, closeConversation, addToast } = useAppStore();
  const [composeDraft, setComposeDraft] = useState("");

  const conversation = conversations.find((c) => c.id === selectedConversationId);

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
            <Mail size={24} className="text-purple-400" />
          </div>
          <p className="text-sm font-medium text-ink-700">Select a conversation</p>
          <p className="text-xs text-ink-400 mt-1">Choose from the list to view details</p>
        </div>
      </div>
    );
  }

  const contact = getContact(conversation.contactId);
  const company = getCompany(conversation.companyId);
  const kbArticle = conversation.finDraftArticleId
    ? KB_ARTICLES.find((a) => a.id === conversation.finDraftArticleId)
    : null;

  const isOOO = conversation.section.includes("ooo");
  const isBounce = conversation.section.includes("bounces");

  const handleUseDraft = () => {
    const draft = consumeFinDraft(conversation.id);
    if (draft) setComposeDraft(draft);
  };

  return (
    <div className="flex-1 flex min-w-0 h-full overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Header */}
        <div className="px-5 py-3 border-b border-ink-300 bg-white flex-shrink-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-ink-900 truncate">{conversation.subject}</h2>
              <p className="text-xs text-ink-500 mt-0.5">
                {contact?.name} · {company?.name}
                {conversation.channel === "chat" && (
                  <span className="ml-1.5 text-blue-500"><MessageCircle size={11} className="inline" /> Live Chat</span>
                )}
                {conversation.channel === "email" && (
                  <span className="ml-1.5 text-ink-400"><Mail size={11} className="inline" /> Email</span>
                )}
              </p>
            </div>
            <button
              onClick={() => {
                closeConversation(conversation.id);
                addToast("Conversation closed");
              }}
              className={cn(
                "flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border transition-colors flex-shrink-0",
                conversation.status === "closed"
                  ? "border-success text-success bg-emerald-50"
                  : "border-ink-300 text-ink-600 hover:bg-ink-100"
              )}
            >
              <Check size={12} />
              {conversation.status === "closed" ? "Closed" : "Close"}
            </button>
          </div>
          <AssignmentControls conversation={conversation} />
        </div>

        {/* OOO Banner */}
        {isOOO && (
          <div className="flex items-center gap-2 px-5 py-2.5 bg-amber-50 border-b border-amber-200 flex-shrink-0">
            <Plane size={13} className="text-amber-600 flex-shrink-0" />
            <p className="text-xs text-amber-700 font-medium">
              Auto-closed by rule: OOO detected. This conversation was automatically handled.
            </p>
          </div>
        )}

        {/* Bounce Banner */}
        {isBounce && (
          <div className="flex items-center justify-between gap-2 px-5 py-2.5 bg-red-50 border-b border-red-200 flex-shrink-0">
            <div className="flex items-center gap-2">
              <AlertTriangle size={13} className="text-danger flex-shrink-0" />
              <p className="text-xs text-red-700 font-medium">
                Delivery failed to <strong>{conversation.bounceEmail}</strong>. Remove from distro list?
              </p>
            </div>
            <button
              onClick={() => removeFromDistro(conversation.id, conversation.bounceEmail ?? "")}
              className="text-xs font-semibold text-danger border border-danger/30 px-2.5 py-1 rounded-lg hover:bg-red-50 flex-shrink-0"
            >
              Remove from distro list
            </button>
          </div>
        )}

        {/* Fin Draft Banner */}
        {conversation.hasFinDraft && (
          <div className="flex items-center gap-3 px-5 py-2.5 bg-purple-50 border-b border-purple-200 flex-shrink-0">
            <FinSparkle size={14} />
            <p className="text-xs text-purple-800 flex-1">
              Fin drafted a reply
              {kbArticle && <> based on Knowledge Base article: <strong>{kbArticle.title}</strong></>}
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleUseDraft}
                className="text-xs font-semibold text-purple-700 hover:text-purple-900 underline"
              >
                Use draft
              </button>
              <span className="text-ink-300">·</span>
              <button
                onClick={() => dismissFinDraft(conversation.id)}
                className="text-xs text-ink-500 hover:text-ink-700"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Thread */}
        <MessageThread
          messages={conversation.messages}
          channel={conversation.channel}
        />

        {/* Compose */}
        {conversation.status !== "closed" && (
          <ComposeBox
            conversationId={conversation.id}
            externalDraft={composeDraft}
            onExternalDraftUsed={() => setComposeDraft("")}
          />
        )}

        {conversation.status === "closed" && (
          <div className="px-5 py-3 border-t border-ink-300 bg-ink-100 text-center text-xs text-ink-500">
            This conversation is closed.
          </div>
        )}
      </div>

      {/* Right panels */}
      <MacroSidePanel
        onInsert={(body) => setComposeDraft(body)}
      />
      <CustomerPanel conversation={conversation} />
    </div>
  );
}
