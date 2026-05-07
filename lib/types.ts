export type TeammateStatus = "online" | "away" | "offline";
export type Channel = "email" | "chat" | "ai";
export type ConversationStatus = "open" | "snoozed" | "closed" | "spam";
export type InboxSection =
  | "all"
  | "mine"
  | "unassigned"
  | "mentions"
  | "email"
  | "chat"
  | "ai"
  | "monthly-returns"
  | "ooo"
  | "bounces"
  | "open"
  | "snoozed"
  | "closed"
  | "spam";

export interface Teammate {
  id: string;
  name: string;
  role: string;
  status: TeammateStatus;
  email: string;
  avatar?: string;
  openCount: number;
  avgResponseTime: string;
  emailCount: number;
  chatCount: number;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  title: string;
  companyId: string;
}

export interface Company {
  id: string;
  name: string;
  type: "lp" | "gp";
}

export type MessageSender = "client" | "teammate" | "ai" | "system";

export interface Message {
  id: string;
  sender: MessageSender;
  senderId?: string;
  content: string;
  timestamp: Date;
  subject?: string;
  from?: string;
  to?: string;
  cc?: string;
}

export interface Conversation {
  id: string;
  contactId: string;
  companyId: string;
  subject: string;
  preview: string;
  channel: Channel;
  status: ConversationStatus;
  section: InboxSection[];
  assigneeId?: string;
  isUnread: boolean;
  hasFinDraft: boolean;
  finDraftContent?: string;
  finDraftArticleId?: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  isConfidential?: boolean;
  bounceEmail?: string;
}

export interface Macro {
  id: string;
  title: string;
  category: "returns" | "account" | "conferences" | "platform" | "ooo" | "compliance" | "general";
  body: string;
  timesUsed: number;
  lastUsed: Date;
  kbArticleId?: string;
}

export interface KBArticle {
  id: string;
  title: string;
  category: string;
  body: string;
  updatedAt: Date;
  finUsageCount: number;
}

export interface SectionCount {
  section: InboxSection;
  count: number;
}
