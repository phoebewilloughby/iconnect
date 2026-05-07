"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatHome from "./ChatHome";
import ChatMessages from "./ChatMessages";
import ChatHelp from "./ChatHelp";
import Tabs from "@/components/ui/Tabs";
import { cn } from "@/lib/utils";

type Tab = "home" | "messages" | "help";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("home");
  const [unread, setUnread] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tabs = [
    { key: "home", label: "Home" },
    { key: "messages", label: "Messages" },
    { key: "help", label: "Help" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Widget panel */}
      {open && (
        <div className="w-[380px] h-[600px] bg-white rounded-2xl shadow-2xl border border-ink-300 flex flex-col overflow-hidden">
          {/* Header */}
          <div
            className="px-5 py-4 flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #6A2B7E 0%, #4F2061 100%)",
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-white font-semibold text-base">iConnections Support</h2>
                <p className="text-purple-200 text-xs mt-0.5">
                  Fin, Phoebe, Marcus typically reply in under 5 minutes
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-purple-200 hover:text-white transition-colors p-1 -mr-1 -mt-1"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex -space-x-1.5">
              {["F", "PW", "MJ"].map((initials, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-purple-700",
                    i === 0 ? "bg-purple-500 text-white" : i === 1 ? "bg-blue-200 text-blue-800" : "bg-emerald-200 text-emerald-800"
                  )}
                >
                  {initials}
                </div>
              ))}
              <div className="w-7 h-7 rounded-full bg-purple-800 border-2 border-purple-700 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-success" />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs
            tabs={tabs}
            active={tab}
            onChange={(k) => { setTab(k as Tab); setUnread(false); }}
            className="border-b border-ink-300 flex-shrink-0"
          />

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {tab === "home" && <ChatHome onStartChat={() => { setTab("messages"); setUnread(false); }} />}
            {tab === "messages" && <ChatMessages />}
            {tab === "help" && <ChatHelp />}
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button
        onClick={() => { setOpen((v) => !v); setUnread(false); }}
        className={cn(
          "w-14 h-14 rounded-full bg-purple-700 hover:bg-purple-800 text-white flex items-center justify-center shadow-lg transition-all",
          !open && mounted && "pulse-ring"
        )}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {unread && !open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-danger rounded-full border-2 border-white" />
        )}
      </button>
    </div>
  );
}
