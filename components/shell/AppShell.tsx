"use client";

import LeftRail from "./LeftRail";
import ToastContainer from "@/components/ui/Toast";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F7F5FA]">
      <LeftRail />
      <main className="flex-1 min-w-0 overflow-hidden">{children}</main>
      <ToastContainer />
    </div>
  );
}
