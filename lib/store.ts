"use client";

import { create } from "zustand";
import type { Conversation, InboxSection } from "./types";
import { CONVERSATIONS } from "./data";

interface Toast {
  id: string;
  message: string;
  type?: "default" | "success" | "error";
}

interface AppState {
  conversations: Conversation[];
  selectedConversationId: string | null;
  activeSection: InboxSection;
  toasts: Toast[];
  searchQuery: string;

  selectConversation: (id: string | null) => void;
  setActiveSection: (section: InboxSection) => void;
  sendMessage: (conversationId: string, content: string) => void;
  assignConversation: (conversationId: string, assigneeId: string | undefined) => void;
  closeConversation: (conversationId: string) => void;
  markAsSpam: (conversationId: string) => void;
  removeFromDistro: (conversationId: string, email: string) => void;
  dismissFinDraft: (conversationId: string) => void;
  consumeFinDraft: (conversationId: string) => string | undefined;
  addToast: (message: string, type?: Toast["type"]) => void;
  removeToast: (id: string) => void;
  setSearchQuery: (q: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  conversations: CONVERSATIONS,
  selectedConversationId: null,
  activeSection: "all",
  toasts: [],
  searchQuery: "",

  selectConversation: (id) => {
    set((state) => ({
      selectedConversationId: id,
      conversations: id
        ? state.conversations.map((c) =>
            c.id === id ? { ...c, isUnread: false } : c
          )
        : state.conversations,
    }));
  },

  setActiveSection: (section) => {
    set({ activeSection: section, selectedConversationId: null });
  },

  sendMessage: (conversationId, content) => {
    const now = new Date();
    set((state) => ({
      conversations: state.conversations.map((c) => {
        if (c.id !== conversationId) return c;
        return {
          ...c,
          messages: [
            ...c.messages,
            {
              id: `msg-${Date.now()}`,
              sender: "teammate" as const,
              senderId: "phoebe",
              content,
              timestamp: now,
            },
          ],
          updatedAt: now,
          preview: content.slice(0, 80),
        };
      }),
    }));
  },

  assignConversation: (conversationId, assigneeId) => {
    set((state) => ({
      conversations: state.conversations.map((c) => {
        if (c.id !== conversationId) return c;
        const filtered = c.section.filter((s) => s !== "unassigned" && s !== "mine");
        const newSection: InboxSection[] = assigneeId === "phoebe"
          ? [...filtered, "mine"]
          : filtered;
        const finalSection: InboxSection[] = assigneeId ? newSection : [...newSection, "unassigned"];
        return { ...c, assigneeId, section: finalSection };
      }),
    }));
  },

  closeConversation: (conversationId) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId ? { ...c, status: "closed" } : c
      ),
    }));
    get().addToast("Conversation closed");
  },

  markAsSpam: (conversationId) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId ? { ...c, status: "spam" } : c
      ),
    }));
    get().addToast("Marked as spam");
  },

  removeFromDistro: (conversationId, email) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId ? { ...c, status: "closed" } : c
      ),
    }));
    get().addToast(`Removed ${email} from Monthly Returns distro list.`);
  },

  dismissFinDraft: (conversationId) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId ? { ...c, hasFinDraft: false } : c
      ),
    }));
  },

  consumeFinDraft: (conversationId) => {
    const conv = get().conversations.find((c) => c.id === conversationId);
    if (!conv?.finDraftContent) return undefined;
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId ? { ...c, hasFinDraft: false } : c
      ),
    }));
    return conv.finDraftContent;
  },

  addToast: (message, type = "default") => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      get().removeToast(id);
    }, 4000);
  },

  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },

  setSearchQuery: (q) => set({ searchQuery: q }),
}));
