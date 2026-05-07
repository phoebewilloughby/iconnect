import { cn } from "@/lib/utils";
import type { TeammateStatus } from "@/lib/types";

const colors: Record<TeammateStatus, string> = {
  online: "bg-success",
  away: "bg-warning",
  offline: "bg-ink-300",
};

export default function StatusDot({ status, className }: { status: TeammateStatus; className?: string }) {
  return (
    <span
      className={cn("inline-block w-2 h-2 rounded-full flex-shrink-0", colors[status], className)}
      title={status}
    />
  );
}
