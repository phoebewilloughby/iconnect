"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Inbox,
  Users,
  Zap,
  BookOpen,
  MessageSquare,
  BarChart2,
  Settings,
} from "lucide-react";
import { cn, initials } from "@/lib/utils";
import StatusDot from "@/components/ui/StatusDot";
import { CURRENT_USER } from "@/lib/data";

const navItems = [
  { href: "/inbox/all", icon: Inbox, label: "Inbox" },
  { href: "/teammates", icon: Users, label: "Teammates" },
  { href: "/macros", icon: Zap, label: "Macros" },
  { href: "/knowledge", icon: BookOpen, label: "Knowledge" },
  { href: "/widget-demo", icon: MessageSquare, label: "Widget" },
  { href: "/analytics", icon: BarChart2, label: "Analytics" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export default function LeftRail() {
  const pathname = usePathname();

  return (
    <aside className="w-[200px] flex-shrink-0 h-screen flex flex-col" style={{ background: "#1E0A2E" }}>
      {/* Logo */}
      <div className="px-5 py-5">
        <LogoDark />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 pb-2 overflow-y-auto">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active =
            href === "/inbox/all"
              ? pathname.startsWith("/inbox")
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all mb-0.5",
                active
                  ? "bg-white/15 text-white font-medium"
                  : "text-purple-200/70 hover:bg-white/8 hover:text-purple-100 font-normal"
              )}
            >
              <Icon
                size={16}
                className={cn("flex-shrink-0", active ? "text-purple-300" : "text-purple-400/60")}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-white/10">
        <div className="flex items-center gap-2.5 px-1">
          <div className="relative flex-shrink-0">
            <div className="w-7 h-7 rounded-full bg-purple-500/40 flex items-center justify-center text-[10px] font-bold text-white">
              {initials(CURRENT_USER.name)}
            </div>
            <StatusDot
              status={CURRENT_USER.status}
              className="absolute -bottom-0.5 -right-0.5 ring-2 ring-[#1E0A2E]"
            />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-white/90 truncate">{CURRENT_USER.name.split(" ")[0]}</p>
            <p className="text-[10px] text-purple-300/60 truncate">Client Support</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function LogoDark() {
  return (
    <div className="flex items-center gap-2 select-none">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="11" fill="#9B5BAE" />
        <circle cx="11" cy="10" r="5" fill="white" fillOpacity="0.9" />
        <circle cx="11" cy="10" r="1.5" fill="#6A2B7E" />
        <path d="M8 17 Q11 14 14 17" stroke="#9B5BAE" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
      <span className="text-[16px] font-semibold tracking-tight text-white">
        i<span className="text-purple-300">Connect</span>
      </span>
    </div>
  );
}
