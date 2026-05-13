"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/");
    } else {
      setError("Incorrect password. Try again.");
      setPassword("");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#1E0A2E" }}>
      <div className="w-full max-w-sm px-6">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-10 select-none">
          <svg width="28" height="28" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="11" fill="#9B5BAE" />
            <circle cx="11" cy="10" r="5" fill="white" fillOpacity="0.9" />
            <circle cx="11" cy="10" r="1.5" fill="#6A2B7E" />
            <path d="M8 17 Q11 14 14 17" stroke="#9B5BAE" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
          <span className="text-[22px] font-semibold tracking-tight text-white">
            i<span className="text-purple-300">Connect</span>
          </span>
        </div>

        {/* Card */}
        <div className="bg-white/8 border border-white/10 rounded-2xl p-8">
          <h1 className="text-lg font-semibold text-white mb-1">Welcome back</h1>
          <p className="text-sm text-purple-300/70 mb-6">Enter your password to continue</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoFocus
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent transition"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={!password || loading}
              className="w-full py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
            >
              {loading ? "Checking…" : "Enter"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-white/20 mt-6">iConnections Client Support · Internal use only</p>
      </div>
    </div>
  );
}
