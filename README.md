# iConnect

In-house client communication tool for the iConnections Client Support team — a polished demo replacing Intercom + Zendesk with full control over routing, AI assistance, and brand.

## Features

- **Inbox** — 3-column layout with section sidebar, conversation list, and detail pane
  - Monthly Returns, Email, Live Chat, Out of Office, Bounces, and status-based sections
  - Fin AI draft suggestions surfaced from the Knowledge Base
  - Macro picker (type `/` in the compose box or click the lightning icon)
  - Bounce → Remove from distro list one-click action
  - OOO auto-close banner on relevant conversations
- **Live Chat Widget** — floating chat bubble on `/widget-demo` with Fin AI, typing simulation, and Marcus handoff
- **Teammates** — workload overview, per-teammate queue drill-down, and conversation reassignment
- **Macros** — categorized canned replies with search, preview modal, and create form
- **Knowledge Base** — articles referenced by Fin AI, grouped by category with usage stats
- **Analytics** — volume by channel/inbox and teammate performance table
- **Settings** — notifications, email, Fin AI, and security settings

## Tech stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS with custom iConnections brand palette
- Zustand for client-side state
- lucide-react for icons
- All data in `lib/data.ts` — no database, no external API calls

## Deploy

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Click Deploy. No env vars required.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/inbox/all`.
