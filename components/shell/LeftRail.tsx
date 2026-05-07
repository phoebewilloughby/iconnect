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
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import Avatar from "@/components/ui/Avatar";
import StatusDot from "@/components/ui/StatusDot";
import { CURRENT_USER } from "@/lib/data";

const navItems = [
  { href: "/inbox/all", icon: Inbox, label: "Inbox" },
  { href: "/teammates", icon: Users, label: "Teammates" },
  { href: "/macros", icon: Zap, label: "Macros" },
  { href: "/knowledge", icon: BookOpen, label: "Knowledge" },
  { href: "/widget-demo", icon: MessageSquare, label: "Widget Demo" },
  { href: "/analytics", icon: BarChart2, label: "Analytics" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export default function LeftRail() {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] flex-shrink-0 h-screen bg-white border-r border-ink-300 flex flex-col">
      <div className="px-5 py-4 border-b border-ink-300">
        <Logo />
      </div>

      <nav className="flex-1 py-3 overflow-y-auto">
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
                "flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-purple-200 text-purple-900 border-l-[3px] border-purple-700 pl-[13px]"
                  : "text-ink-700 hover:bg-ink-100"
              )}
            >
              <Icon size={17} className="flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-ink-300">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Avatar name={CURRENT_USER.name} size="sm" />
            <StatusDot
              status={CURRENT_USER.status}
              className="absolute -bottom-0.5 -right-0.5 ring-2 ring-white"
            />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-ink-900 truncate">{CURRENT_USER.name}</p>
            <p className="text-[10px] text-ink-500 truncate">{CURRENT_USER.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
