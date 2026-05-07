"use client";

import { use, useEffect } from "react";
import AppShell from "@/components/shell/AppShell";
import InboxSidebar from "@/components/inbox/InboxSidebar";
import ConversationList from "@/components/inbox/ConversationList";
import ConversationDetail from "@/components/inbox/ConversationDetail";
import { useAppStore } from "@/lib/store";
import type { InboxSection } from "@/lib/types";

export default function InboxPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = use(params);
  const { setActiveSection } = useAppStore();

  useEffect(() => {
    setActiveSection(section as InboxSection);
  }, [section, setActiveSection]);

  return (
    <AppShell>
      <div className="flex h-full">
        <InboxSidebar />
        <ConversationList />
        <ConversationDetail />
      </div>
    </AppShell>
  );
}
