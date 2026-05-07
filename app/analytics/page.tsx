import AppShell from "@/components/shell/AppShell";
import { CONVERSATIONS, TEAMMATES } from "@/lib/data";

const total = CONVERSATIONS.length;
const open = CONVERSATIONS.filter((c) => c.status === "open").length;
const closed = CONVERSATIONS.filter((c) => c.status === "closed").length;
const email = CONVERSATIONS.filter((c) => c.channel === "email").length;
const chat = CONVERSATIONS.filter((c) => c.channel === "chat").length;
const returns = CONVERSATIONS.filter((c) => c.section.includes("monthly-returns")).length;
const bounces = CONVERSATIONS.filter((c) => c.section.includes("bounces")).length;
const aiHandled = CONVERSATIONS.filter((c) => c.section.includes("ai")).length;

function StatCard({ label, value, sub, color = "purple" }: { label: string; value: string | number; sub?: string; color?: string }) {
  return (
    <div className="bg-white border border-ink-300 rounded-xl p-5 shadow-card">
      <p className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-2">{label}</p>
      <p className={`text-3xl font-bold text-${color === "purple" ? "purple-700" : "ink-900"} mb-1`}>{value}</p>
      {sub && <p className="text-xs text-ink-400">{sub}</p>}
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <AppShell>
      <div className="h-full overflow-y-auto scrollbar-thin">
        <div className="max-w-5xl mx-auto px-8 py-8">
          <h1 className="text-xl font-bold text-ink-900 mb-2">Analytics</h1>
          <p className="text-sm text-ink-500 mb-8">Last 14 days · Demo data</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total conversations" value={total} />
            <StatCard label="Open" value={open} sub={`${Math.round((open/total)*100)}% of total`} />
            <StatCard label="Closed / resolved" value={closed} color="success" />
            <StatCard label="AI handled by Fin" value={aiHandled} color="purple" />
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-ink-300 rounded-xl p-5 shadow-card">
              <h3 className="text-sm font-semibold text-ink-700 mb-4">Volume by channel</h3>
              <div className="space-y-3">
                {[
                  { label: "Email", value: email, color: "bg-blue-400" },
                  { label: "Live Chat", value: chat, color: "bg-purple-400" },
                ].map(({ label, value, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs text-ink-600 mb-1">
                      <span>{label}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                    <div className="h-2 bg-ink-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${color} rounded-full`}
                        style={{ width: `${(value / total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-ink-300 rounded-xl p-5 shadow-card">
              <h3 className="text-sm font-semibold text-ink-700 mb-4">Volume by inbox</h3>
              <div className="space-y-3">
                {[
                  { label: "Monthly Returns", value: returns },
                  { label: "Email", value: email },
                  { label: "Live Chat", value: chat },
                  { label: "Bounces", value: bounces },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs text-ink-600 mb-1">
                      <span>{label}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                    <div className="h-2 bg-ink-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-400 rounded-full"
                        style={{ width: `${(value / total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white border border-ink-300 rounded-xl shadow-card overflow-hidden">
            <div className="px-5 py-4 border-b border-ink-300">
              <h3 className="text-sm font-semibold text-ink-700">Teammate performance</h3>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-ink-100">
                <tr>
                  {["Teammate", "Open", "Avg response", "Email", "Chat"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-ink-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TEAMMATES.map((t) => (
                  <tr key={t.id} className="border-t border-ink-300 hover:bg-purple-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-ink-900">{t.name}</td>
                    <td className="px-4 py-3 text-ink-700">{t.openCount}</td>
                    <td className="px-4 py-3 text-ink-700">{t.avgResponseTime}</td>
                    <td className="px-4 py-3 text-ink-700">{t.emailCount}</td>
                    <td className="px-4 py-3 text-ink-700">{t.chatCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
