"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import { getSectionCounts } from "@/lib/data";
import type { InboxSection } from "@/lib/types";
import {
  Inbox,
  User,
  Users,
  AtSign,
  Mail,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Plane,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  AlertOctagon,
} from "lucide-react";

interface Section {
  key: InboxSection;
  label: string;
  icon: React.ElementType;
  group?: string;
}

const sections: Section[] = [
  { key: "all", label: "All conversations", icon: Inbox, group: "Mailboxes" },
  { key: "mine", label: "Mine", icon: User, group: "Mailboxes" },
  { key: "unassigned", label: "Unassigned", icon: Users, group: "Mailboxes" },
  { key: "mentions", label: "Mentions", icon: AtSign, group: "Mailboxes" },
  { key: "email", label: "Email", icon: Mail, group: "Channels" },
  { key: "chat", label: "Live Chat", icon: MessageCircle, group: "Channels" },
  { key: "ai", label: "AI / Fin", icon: Sparkles, group: "Channels" },
  { key: "monthly-returns", label: "Monthly Returns", icon: TrendingUp, group: "Topics" },
  { key: "ooo", label: "Out of Office", icon: Plane, group: "Topics" },
  { key: "bounces", label: "Bounces", icon: AlertTriangle, group: "Topics" },
  { key: "open", label: "Open", icon: CheckCircle, group: "Status" },
  { key: "snoozed", label: "Snoozed", icon: Clock, group: "Status" },
  { key: "closed", label: "Closed", icon: XCircle, group: "Status" },
  { key: "spam", label: "Spam", icon: AlertOctagon, group: "Status" },
];

const groups = ["Mailboxes", "Channels", "Topics", "Status"];

export default function InboxSidebar() {
  const { activeSection, setActiveSection } = useAppStore();
  const router = useRouter();
  const counts = getSectionCounts();

  const handleSelect = (key: InboxSection) => {
    setActiveSection(key);
    router.push(`/inbox/${key}`);
  };

  return (
    <div className="w-[210px] flex-shrink-0 h-full border-r border-ink-300 overflow-y-auto scrollbar-thin bg-white py-2">
      {groups.map((group) => {
        const groupSections = sections.filter((s) => s.group === group);
        return (
          <div key={group} className="mb-1">
            <div className="px-4 pt-3 pb-1">
              <span className="text-[10px] font-semibold tracking-wider uppercase text-ink-500">
                {group}
              </span>
            </div>
            {groupSections.map((s) => {
              const active = activeSection === s.key;
              const count = counts[s.key as keyof typeof counts] ?? 0;
              return (
                <button
                  key={s.key}
                  onClick={() => handleSelect(s.key)}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-4 py-2 text-sm transition-colors",
                    active
                      ? "bg-purple-200 text-purple-900 border-l-[3px] border-purple-700 pl-[13px] font-medium"
                      : "text-ink-700 hover:bg-purple-50 font-normal"
                  )}
                >
                  <s.icon size={14} className="flex-shrink-0" />
                  <span className="flex-1 text-left truncate">{s.label}</span>
                  {count > 0 && (
                    <span
                      className={cn(
                        "text-[11px] font-semibold px-1.5 py-0.5 rounded-full min-w-[20px] text-center",
                        active ? "bg-purple-700 text-white" : "bg-ink-100 text-ink-700"
                      )}
                    >
                      {count}
                    </span>
                  )}
                  {s.key === "ooo" && (
                    <span className="text-[9px] bg-ink-100 text-ink-500 px-1 rounded leading-tight">
                      auto
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
