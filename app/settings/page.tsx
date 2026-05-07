"use client";

import AppShell from "@/components/shell/AppShell";
import { CURRENT_USER } from "@/lib/data";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { Bell, Shield, Mail, Zap, Users } from "lucide-react";

function SettingRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-ink-300 last:border-0">
      <div>
        <p className="text-sm font-medium text-ink-900">{label}</p>
        {description && <p className="text-xs text-ink-500 mt-0.5">{description}</p>}
      </div>
      <div className="ml-4">{children}</div>
    </div>
  );
}

function Toggle({ defaultChecked }: { defaultChecked?: boolean }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
      <div className="w-9 h-5 bg-ink-300 rounded-full peer peer-checked:bg-purple-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
    </label>
  );
}

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="h-full overflow-y-auto scrollbar-thin">
        <div className="max-w-2xl mx-auto px-8 py-8">
          <h1 className="text-xl font-bold text-ink-900 mb-8">Settings</h1>

          {/* Profile */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Users size={15} className="text-purple-600" />
              <h2 className="text-sm font-semibold text-ink-700 uppercase tracking-wide">Profile</h2>
            </div>
            <div className="bg-white border border-ink-300 rounded-xl p-5">
              <div className="flex items-center gap-4 mb-6">
                <Avatar name={CURRENT_USER.name} size="lg" />
                <div>
                  <p className="font-semibold text-ink-900">{CURRENT_USER.name}</p>
                  <p className="text-sm text-ink-500">{CURRENT_USER.role}</p>
                  <p className="text-xs text-ink-400 mt-0.5">{CURRENT_USER.email}</p>
                </div>
              </div>
              <SettingRow label="Display name" description="Shown to clients">
                <input defaultValue={CURRENT_USER.name} className="text-sm border border-ink-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-purple-300" />
              </SettingRow>
              <SettingRow label="Away message">
                <input placeholder="I'll be back shortly..." className="text-sm border border-ink-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-purple-300" />
              </SettingRow>
            </div>
          </section>

          {/* Notifications */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Bell size={15} className="text-purple-600" />
              <h2 className="text-sm font-semibold text-ink-700 uppercase tracking-wide">Notifications</h2>
            </div>
            <div className="bg-white border border-ink-300 rounded-xl p-5">
              <SettingRow label="New conversation assigned to me" description="Desktop + email notification">
                <Toggle defaultChecked />
              </SettingRow>
              <SettingRow label="Mentions" description="When someone @mentions you">
                <Toggle defaultChecked />
              </SettingRow>
              <SettingRow label="Fin AI draft ready" description="When Fin generates a suggested reply">
                <Toggle defaultChecked />
              </SettingRow>
              <SettingRow label="Daily digest email" description="Summary of open conversations at 9am">
                <Toggle />
              </SettingRow>
            </div>
          </section>

          {/* Email */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Mail size={15} className="text-purple-600" />
              <h2 className="text-sm font-semibold text-ink-700 uppercase tracking-wide">Email</h2>
            </div>
            <div className="bg-white border border-ink-300 rounded-xl p-5">
              <SettingRow label="Signature">
                <Button variant="secondary" size="sm">Edit signature</Button>
              </SettingRow>
              <SettingRow label="Auto-BCC" description="BCC yourself on all outbound emails">
                <Toggle />
              </SettingRow>
              <SettingRow label="OOO auto-close rule" description="Automatically close OOO replies">
                <Toggle defaultChecked />
              </SettingRow>
            </div>
          </section>

          {/* Fin AI */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={15} className="text-purple-600" />
              <h2 className="text-sm font-semibold text-ink-700 uppercase tracking-wide">Fin AI</h2>
            </div>
            <div className="bg-white border border-ink-300 rounded-xl p-5">
              <SettingRow label="Auto-draft suggestions" description="Fin drafts replies in the background">
                <Toggle defaultChecked />
              </SettingRow>
              <SettingRow label="Fin handles chat solo" description="Fin responds before handing off">
                <Toggle defaultChecked />
              </SettingRow>
              <SettingRow label="Handoff after N messages" description="Trigger human handoff after 2 AI messages">
                <select className="text-sm border border-ink-300 rounded-lg px-2 py-1.5 focus:outline-none">
                  <option>2 messages</option>
                  <option>3 messages</option>
                  <option>Never</option>
                </select>
              </SettingRow>
            </div>
          </section>

          {/* Security */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Shield size={15} className="text-purple-600" />
              <h2 className="text-sm font-semibold text-ink-700 uppercase tracking-wide">Security</h2>
            </div>
            <div className="bg-white border border-ink-300 rounded-xl p-5">
              <SettingRow label="Two-factor authentication" description="Required for all accounts">
                <span className="text-xs text-success font-medium">Enabled</span>
              </SettingRow>
              <SettingRow label="Session timeout" description="Auto-logout after inactivity">
                <select className="text-sm border border-ink-300 rounded-lg px-2 py-1.5 focus:outline-none">
                  <option>8 hours</option>
                  <option>4 hours</option>
                  <option>1 hour</option>
                </select>
              </SettingRow>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
