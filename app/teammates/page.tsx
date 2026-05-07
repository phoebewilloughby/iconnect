import AppShell from "@/components/shell/AppShell";
import TeammateCard from "@/components/teammates/TeammateCard";
import { TEAMMATES } from "@/lib/data";

export default function TeammatesPage() {
  return (
    <AppShell>
      <div className="h-full overflow-y-auto scrollbar-thin">
        <div className="max-w-5xl mx-auto px-8 py-8">
          <div className="mb-8">
            <h1 className="text-xl font-bold text-ink-900">Teammates</h1>
            <p className="text-sm text-ink-500 mt-1">
              {TEAMMATES.filter((t) => t.status === "online").length} online · {TEAMMATES.length} total
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAMMATES.map((t) => (
              <TeammateCard key={t.id} teammate={t} />
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
