import ChatWidget from "@/components/chat/ChatWidget";
import AppShell from "@/components/shell/AppShell";
import { TrendingUp, Users, Calendar, BarChart2, FileText } from "lucide-react";

function FakePlatformNav() {
  return (
    <nav className="bg-[#1a0d23] h-14 px-6 flex items-center gap-8">
      <span className="text-white font-semibold text-sm tracking-tight">iConnections</span>
      {["Discover", "Documents", "Events", "Messages", "Portfolio"].map((item) => (
        <a key={item} href="#" className="text-purple-200 hover:text-white text-sm transition-colors">
          {item}
        </a>
      ))}
      <div className="ml-auto">
        <div className="w-7 h-7 rounded-full bg-purple-700 text-white text-xs flex items-center justify-center font-semibold">
          DH
        </div>
      </div>
    </nav>
  );
}

function StatCard({ icon: Icon, label, value, change }: { icon: React.ElementType; label: string; value: string; change: string }) {
  return (
    <div className="bg-white rounded-xl border border-ink-300 p-5 shadow-card">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
          <Icon size={15} className="text-purple-700" />
        </div>
        <span className="text-xs font-medium text-ink-500">{label}</span>
      </div>
      <p className="text-2xl font-bold text-ink-900 mb-0.5">{value}</p>
      <p className="text-xs text-success">{change}</p>
    </div>
  );
}

export default function WidgetDemoPage() {
  return (
    <AppShell>
      <div className="h-full overflow-y-auto scrollbar-thin flex flex-col relative">
        <FakePlatformNav />

        <div className="flex-1 bg-gray-50 p-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <p className="text-sm text-ink-500 mb-1">Welcome back,</p>
              <h1 className="text-2xl font-bold text-ink-900">David Harrington</h1>
              <p className="text-sm text-ink-500">Ridgemont Family Office · Director CIO</p>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
              <StatCard icon={TrendingUp} label="Portfolio YTD" value="+8.4%" change="↑ 1.2% vs. benchmark" />
              <StatCard icon={Users} label="Manager relationships" value="12" change="2 new this quarter" />
              <StatCard icon={Calendar} label="Upcoming meetings" value="3" change="Next: May 14" />
              <StatCard icon={BarChart2} label="Documents pending" value="4" change="2 require signature" />
            </div>

            <div className="grid grid-cols-3 gap-5">
              <div className="col-span-2 bg-white rounded-xl border border-ink-300 p-5 shadow-card">
                <h3 className="text-sm font-semibold text-ink-700 mb-4">Fund Performance — April 2025</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-ink-300">
                      {["Fund", "MTD", "YTD", "Since Inception"].map((h) => (
                        <th key={h} className="text-left pb-2 text-xs font-medium text-ink-500">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Helios Macro Fund", "+1.8%", "+6.2%", "+34.1%"],
                      ["Stratton Multi-Strategy", "+0.9%", "+4.7%", "+19.8%"],
                      ["Northwind Capital", "+2.3%", "+9.1%", "+52.4%"],
                      ["Blackthorn Capital", "+1.1%", "+3.8%", "+28.3%"],
                    ].map(([fund, mtd, ytd, si]) => (
                      <tr key={fund} className="border-b border-ink-300 last:border-0 hover:bg-purple-50 transition-colors">
                        <td className="py-3 font-medium text-ink-900">{fund}</td>
                        <td className={`py-3 font-semibold ${mtd.startsWith("+") ? "text-success" : "text-danger"}`}>{mtd}</td>
                        <td className={`py-3 font-semibold ${ytd.startsWith("+") ? "text-success" : "text-danger"}`}>{ytd}</td>
                        <td className={`py-3 font-semibold ${si.startsWith("+") ? "text-success" : "text-danger"}`}>{si}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-white rounded-xl border border-ink-300 p-5 shadow-card">
                <h3 className="text-sm font-semibold text-ink-700 mb-4">Recent documents</h3>
                <div className="space-y-3">
                  {[
                    { name: "Helios Macro — Apr tear sheet", date: "May 6" },
                    { name: "Stratton — Q1 investor letter", date: "Apr 30" },
                    { name: "Northwind — DDQ 2025", date: "Apr 15" },
                    { name: "iConnections Conference agenda", date: "Apr 10" },
                  ].map(({ name, date }) => (
                    <div key={name} className="flex items-start gap-2">
                      <FileText size={13} className="text-ink-400 flex-shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-ink-900 truncate">{name}</p>
                        <p className="text-[10px] text-ink-400">{date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-ink-400 mt-8">
              ↙ Click the chat button to talk to Fin AI or our support team
            </p>
          </div>
        </div>

        <ChatWidget />
      </div>
    </AppShell>
  );
}
