import type { Teammate, Company, Contact, Conversation, Macro, KBArticle } from "./types";

const now = new Date();
const d = (daysAgo: number, hours = 9, minutes = 0) => {
  const dt = new Date(now);
  dt.setDate(dt.getDate() - daysAgo);
  dt.setHours(hours, minutes, 0, 0);
  return dt;
};

// ─── TEAMMATES ────────────────────────────────────────────────────────────────

export const TEAMMATES: Teammate[] = [
  {
    id: "phoebe",
    name: "Phoebe Willoughby",
    role: "Senior Client Support Manager",
    status: "online",
    email: "phoebe.willoughby@iconnections.io",
    openCount: 8,
    avgResponseTime: "18m",
    emailCount: 5,
    chatCount: 3,
  },
  {
    id: "marcus",
    name: "Marcus Johnson",
    role: "Client Support Specialist",
    status: "online",
    email: "marcus.johnson@iconnections.io",
    openCount: 11,
    avgResponseTime: "22m",
    emailCount: 7,
    chatCount: 4,
  },
  {
    id: "priya",
    name: "Priya Patel",
    role: "Client Support Specialist",
    status: "away",
    email: "priya.patel@iconnections.io",
    openCount: 6,
    avgResponseTime: "35m",
    emailCount: 5,
    chatCount: 1,
  },
  {
    id: "alex",
    name: "Alex Rivera",
    role: "Client Support Lead",
    status: "online",
    email: "alex.rivera@iconnections.io",
    openCount: 14,
    avgResponseTime: "14m",
    emailCount: 10,
    chatCount: 4,
  },
  {
    id: "jordan",
    name: "Jordan Kim",
    role: "Client Support Specialist",
    status: "offline",
    email: "jordan.kim@iconnections.io",
    openCount: 3,
    avgResponseTime: "—",
    emailCount: 2,
    chatCount: 1,
  },
];

export const CURRENT_USER = TEAMMATES[0];

// ─── COMPANIES ────────────────────────────────────────────────────────────────

export const COMPANIES: Company[] = [
  { id: "ridgemont", name: "Ridgemont Family Office", type: "lp" },
  { id: "aurora", name: "Aurora Pension Trust", type: "lp" },
  { id: "cascade", name: "Cascade Endowment", type: "lp" },
  { id: "northwind", name: "Northwind Capital Partners", type: "gp" },
  { id: "helios", name: "Helios Macro Fund", type: "gp" },
  { id: "stratton", name: "Stratton Multi-Strategy", type: "gp" },
  { id: "kestrel", name: "Kestrel Wealth Advisors", type: "lp" },
  { id: "meridian", name: "Meridian Foundation", type: "lp" },
  { id: "ironwood", name: "Ironwood Pension Board", type: "lp" },
  { id: "palisade", name: "Palisade Sovereign Fund", type: "lp" },
  { id: "blackthorn", name: "Blackthorn Capital", type: "gp" },
  { id: "vanta", name: "Vanta Asset Management", type: "gp" },
];

// ─── CONTACTS ─────────────────────────────────────────────────────────────────

export const CONTACTS: Contact[] = [
  { id: "c1", name: "David Harrington", email: "david.harrington@ridgemont.com", title: "Chief Investment Officer", companyId: "ridgemont" },
  { id: "c2", name: "Sarah Chen", email: "sarah.chen@ridgemont.com", title: "Director of Manager Research", companyId: "ridgemont" },
  { id: "c3", name: "Robert Callahan", email: "robert.callahan@aurora-pension.com", title: "Head of Allocations", companyId: "aurora" },
  { id: "c4", name: "Linda Bauer", email: "linda.bauer@aurora-pension.com", title: "Compliance Officer", companyId: "aurora" },
  { id: "c5", name: "Thomas Wei", email: "thomas.wei@cascade-endowment.org", title: "Investment Manager", companyId: "cascade" },
  { id: "c6", name: "Margaret O'Sullivan", email: "margaret.osullivan@northwind.com", title: "Investor Relations", companyId: "northwind" },
  { id: "c7", name: "James Holloway", email: "james.holloway@northwind.com", title: "Managing Partner", companyId: "northwind" },
  { id: "c8", name: "Elena Vasquez", email: "elena.vasquez@heliosmacro.com", title: "Investor Relations Manager", companyId: "helios" },
  { id: "c9", name: "Christopher Park", email: "christopher.park@stratton.com", title: "Head of LP Relations", companyId: "stratton" },
  { id: "c10", name: "Natasha Brennan", email: "natasha.brennan@kestrel.com", title: "Senior Advisor", companyId: "kestrel" },
  { id: "c11", name: "William Okafor", email: "william.okafor@meridian.org", title: "Director of Investments", companyId: "meridian" },
  { id: "c12", name: "Patricia Lund", email: "patricia.lund@ironwood.org", title: "Portfolio Manager", companyId: "ironwood" },
  { id: "c13", name: "Ahmed Al-Rashid", email: "ahmed.alrashid@palisade.com", title: "Deputy CIO", companyId: "palisade" },
  { id: "c14", name: "Caroline Montague", email: "caroline.montague@blackthorn.com", title: "General Counsel", companyId: "blackthorn" },
  { id: "c15", name: "Raj Krishnamurthy", email: "raj.krishnamurthy@vanta.com", title: "COO", companyId: "vanta" },
  { id: "c16", name: "Fiona Blackwood", email: "fiona.blackwood@cascade-endowment.org", title: "CIO", companyId: "cascade" },
  { id: "c17", name: "Henry Strauss", email: "henry.strauss@heliosmacro.com", title: "COO", companyId: "helios" },
  { id: "c18", name: "Diana Frost", email: "diana.frost@aurora-pension.com", title: "Senior Analyst", companyId: "aurora" },
];

// ─── KNOWLEDGE BASE ARTICLES ──────────────────────────────────────────────────

export const KB_ARTICLES: KBArticle[] = [
  {
    id: "kb1",
    title: "How to access your monthly returns",
    category: "Returns",
    body: `Monthly performance reports are published in the iConnections Document Library under the "Monthly Reports" folder for each fund you are invested in. Reports are typically available by the 15th business day following month-end.

To access your reports, log in to the iConnections platform and navigate to Documents → Monthly Reports. Select the fund name and the reporting period you wish to view. PDFs are available for download or can be viewed directly in the browser.

If you are expecting a report and do not see it, first check that your account has been granted document access for that fund. You can verify your access level under Settings → Permissions. If access looks correct but the document is still missing, please contact us at support@iconnections.io and include the fund name and reporting period.

Performance attribution and detailed portfolio commentary are included as appendices in the full report. A summary tear sheet is also provided for quick reference.`,
    updatedAt: d(3),
    finUsageCount: 47,
  },
  {
    id: "kb2",
    title: "Conference registration FAQ",
    category: "Conferences",
    body: `The iConnections annual conference brings together leading GPs and LPs for structured meetings and networking. Registration opens approximately 8 weeks before each event.

To register, log in to the iConnections platform and navigate to Events. Select the conference you wish to attend and click Register. You will be prompted to select your preferred meeting slots during the scheduling phase, which opens 4 weeks before the event.

Cancellations made more than 30 days before the conference receive a full refund. Cancellations within 30 days are non-refundable but substitutions are permitted. Please email events@iconnections.io to arrange a substitution.

Accommodation blocks are held at partner hotels. Booking links are provided in your confirmation email. iConnections does not manage hotel reservations directly.`,
    updatedAt: d(7),
    finUsageCount: 31,
  },
  {
    id: "kb3",
    title: "Resetting your iConnections platform password",
    category: "Account",
    body: `If you have forgotten your password or are locked out of your account, you can initiate a self-service reset from the login page.

Click "Forgot password?" on the iConnections login screen. Enter the email address associated with your account. A reset link will be sent within 2 minutes. The link is valid for 60 minutes. If you do not receive the email, check your spam folder or contact support.

If your account has been locked due to multiple failed login attempts, the lockout lifts automatically after 15 minutes. For persistent access issues, email support@iconnections.io with your name and registered email address.

Two-factor authentication is required for all accounts. If you have lost access to your authenticator app, support can initiate a manual verification process — this typically takes 1 business day.`,
    updatedAt: d(14),
    finUsageCount: 28,
  },
  {
    id: "kb4",
    title: "Wire transfer & compliance procedures",
    category: "Compliance",
    body: `All wire transfer and banking detail changes must be processed through iConnections' verified compliance workflow. Do not email wire instructions directly to any individual at iConnections.

To update wire instructions for a fund: submit your request via the secure portal at iconnections.io/compliance. Your request will be reviewed by our compliance team within 2 business days. You will receive a callback on your registered phone number to verify the change before it takes effect.

Wire instructions received by email are never accepted — this policy exists to prevent fraud. If you receive an email purporting to be from iConnections with updated wire details, do not act on it and report it immediately to security@iconnections.io.

Questions about an existing wire instruction on file should be directed to your fund's GP investor relations contact.`,
    updatedAt: d(21),
    finUsageCount: 12,
  },
  {
    id: "kb5",
    title: "Updating your contact information",
    category: "Account",
    body: `You can update most contact information directly within the iConnections platform under Settings → Profile. Changes to your name, phone number, and secondary email take effect immediately.

Changes to your primary email address require verification. After submitting a new email, you will receive a confirmation link at both your old and new addresses. The change is effective once you confirm via the new address.

To update contact information on behalf of an organization (e.g., if an employee has left), an authorized administrator at your firm must submit the request via support@iconnections.io from a verified domain address.

Profile photos can be uploaded in PNG or JPG format, minimum 200×200 pixels. Photos are visible to counterparties on the platform.`,
    updatedAt: d(10),
    finUsageCount: 19,
  },
  {
    id: "kb6",
    title: "Document library overview",
    category: "Platform",
    body: `The iConnections Document Library is a secure repository for fund documents including PPMs, DDQs, audited financials, monthly reports, and conference materials.

Access is controlled at the fund level — you will only see documents for funds you are invested in or have been granted access to by the GP. If you believe you should have access to a document but cannot see it, contact the fund's IR team directly.

Documents are organized by fund, then by document type, then by date. You can use the search bar at the top of the library to find documents by keyword, fund name, or date range. Documents can be downloaded individually or as a batch ZIP.

All downloads are logged for compliance purposes. Document access logs are available to authorized compliance officers upon request.`,
    updatedAt: d(5),
    finUsageCount: 22,
  },
  {
    id: "kb7",
    title: "iConnect AI assistant (Fin) — what it can help with",
    category: "Platform",
    body: `Fin is iConnections' AI-powered support assistant. It is available 24/7 in the live chat widget and can handle the most common client inquiries without waiting for a human agent.

Fin can help with: finding and explaining documents in the library, answering questions about conference registration and scheduling, guiding you through password reset steps, explaining platform navigation and features, and providing general information about iConnections' services.

Fin cannot access fund performance data, make changes to your account, process wire transfers, or provide investment advice. For these requests, Fin will offer to connect you with a human specialist.

Conversations with Fin are logged and may be reviewed by the iConnections support team for quality assurance. You can request a transcript of any Fin conversation by contacting support@iconnections.io.`,
    updatedAt: d(2),
    finUsageCount: 8,
  },
  {
    id: "kb8",
    title: "Out of office best practices",
    category: "Account",
    body: `When you are out of office, we recommend setting an auto-reply in your email client to ensure iConnections support team is aware of your absence.

Include the following in your OOO message: your return date, an alternate contact at your firm who can handle time-sensitive requests, and a note that monthly return reports can be accessed on the iConnections platform directly.

iConnections' support system automatically detects OOO replies and categorizes them accordingly. Tickets from OOO replies are auto-closed to avoid cluttering your inbox, and reopened when you send a substantive follow-up.

If you are delegating iConnections platform access to a colleague while you are away, please contact support@iconnections.io to set up a temporary delegated access arrangement.`,
    updatedAt: d(8),
    finUsageCount: 6,
  },
];

// ─── MACROS ───────────────────────────────────────────────────────────────────

export const MACROS: Macro[] = [
  {
    id: "m1",
    title: "Monthly Returns — Awaiting Manager",
    category: "returns",
    body: "Thank you for reaching out. We have received your request for the monthly performance report. Our fund manager is currently finalizing the numbers for the period in question, and we expect the report to be available in the Document Library within the next 2–3 business days. We will send you a notification as soon as it is published. Please don't hesitate to reach out if you have any questions in the meantime.",
    timesUsed: 142,
    lastUsed: d(1),
    kbArticleId: "kb1",
  },
  {
    id: "m2",
    title: "Monthly Returns — Performance Inquiry Response",
    category: "returns",
    body: "Thank you for your inquiry regarding fund performance. The monthly report you are looking for is available in the iConnections Document Library under Documents → Monthly Reports. If you have specific questions about the performance attribution or portfolio commentary, I am happy to connect you with the fund's investor relations team directly. Please let me know how you would like to proceed.",
    timesUsed: 98,
    lastUsed: d(0),
    kbArticleId: "kb1",
  },
  {
    id: "m3",
    title: "Password Reset Instructions",
    category: "account",
    body: "To reset your iConnections platform password, please visit the login page and click 'Forgot password?' Enter your registered email address and you will receive a reset link within 2 minutes. The link is valid for 60 minutes. If you do not see the email in your inbox, please check your spam folder. If you continue to experience issues, reply to this message and I will initiate a manual reset on our end.",
    timesUsed: 76,
    lastUsed: d(1),
    kbArticleId: "kb3",
  },
  {
    id: "m4",
    title: "Conference Registration Confirmation",
    category: "conferences",
    body: "Your registration for the iConnections conference has been confirmed. You will receive a detailed confirmation email with meeting scheduling information, venue details, and hotel booking links within 24 hours. The meeting scheduling portal will open 4 weeks before the event — you will receive a calendar invitation with the link at that time. Please don't hesitate to reach out if you have any questions about the event.",
    timesUsed: 54,
    lastUsed: d(3),
    kbArticleId: "kb2",
  },
  {
    id: "m5",
    title: "Document Access Granted",
    category: "platform",
    body: "I have updated your document access permissions for the fund you requested. You should now be able to view all reports and materials in the Document Library under Documents → Monthly Reports. If you continue to experience any access issues after logging out and back in, please let me know and I will investigate further.",
    timesUsed: 43,
    lastUsed: d(2),
    kbArticleId: "kb6",
  },
  {
    id: "m6",
    title: "OOO Acknowledgment",
    category: "ooo",
    body: "Thank you for your message. I can see you are currently out of the office. I have logged your inquiry and will follow up with you directly upon your return. If this is time-sensitive, please have a colleague contact us at support@iconnections.io and reference this conversation. We hope you enjoy your time away.",
    timesUsed: 89,
    lastUsed: d(0),
    kbArticleId: "kb8",
  },
  {
    id: "m7",
    title: "Wire Instructions — Compliance Required",
    category: "compliance",
    body: "Thank you for reaching out regarding wire instructions. For the security of all parties, iConnections does not accept wire transfer detail changes via email. All wire instruction updates must be submitted through our secure compliance portal at iconnections.io/compliance. Once submitted, our compliance team will contact you within 2 business days via your registered phone number to verify the change. We appreciate your understanding of this important security measure.",
    timesUsed: 31,
    lastUsed: d(4),
    kbArticleId: "kb4",
  },
  {
    id: "m8",
    title: "General Holding Reply (Looking Into This)",
    category: "general",
    body: "Thank you for reaching out to iConnections Client Support. I am looking into your request now and will follow up with a full response shortly. If you need to reach us urgently in the meantime, please call our support line. We appreciate your patience.",
    timesUsed: 211,
    lastUsed: d(0),
  },
  {
    id: "m9",
    title: "Closing — Resolved",
    category: "general",
    body: "I am glad we were able to resolve this for you. I am closing out this ticket now, but please don't hesitate to reach out if anything else comes up — we are always happy to help. Thank you for being an iConnections client.",
    timesUsed: 178,
    lastUsed: d(0),
  },
  {
    id: "m10",
    title: "Escalation to Manager",
    category: "general",
    body: "Thank you for your patience. Given the nature of your request, I am escalating this conversation to a senior member of our support team who will be in touch with you shortly. You can expect to hear back within 2 business hours. We appreciate your understanding.",
    timesUsed: 29,
    lastUsed: d(5),
  },
  {
    id: "m11",
    title: "Fin Handoff — Connecting You to Specialist",
    category: "general",
    body: "I am connecting you with one of our human specialists who will be able to help you further. Please hold for just a moment — an agent will join this conversation shortly. Thank you for your patience.",
    timesUsed: 67,
    lastUsed: d(0),
  },
  {
    id: "m12",
    title: "Bounced Email — Updating Records",
    category: "general",
    body: "We noticed that our recent email to your address was undeliverable. I have updated our records to reflect the correct email address and you should begin receiving communications normally. If you have any other contact information changes, please let us know or update them directly in your iConnections profile under Settings → Contact Information.",
    timesUsed: 22,
    lastUsed: d(6),
  },
];

// ─── CONVERSATIONS ─────────────────────────────────────────────────────────────

export const CONVERSATIONS: Conversation[] = [
  // ── Monthly Returns ──────────────────────────────────────────────────────────
  {
    id: "conv1",
    contactId: "c8",
    companyId: "helios",
    subject: "Q1 net returns — April numbers still pending?",
    preview: "Hi, we have not yet received the April performance report for Helios Macro Fund...",
    channel: "email",
    status: "open",
    section: ["monthly-returns", "all", "unassigned"],
    assigneeId: undefined,
    isUnread: true,
    hasFinDraft: true,
    finDraftContent: "Thank you for reaching out. I have checked the Document Library and can confirm that the April performance report for Helios Macro Fund is currently being finalized. We expect it to be available by the 15th of this month. You will receive an automated notification as soon as it is published. In the meantime, please let me know if there is anything else I can assist with.",
    finDraftArticleId: "kb1",
    messages: [
      {
        id: "msg1-1",
        sender: "client",
        senderId: "c8",
        content: "Hi iConnections team,\n\nWe have not yet received the April performance report for Helios Macro Fund. Our investment committee typically reviews these on the 12th of each month and we are already past that date.\n\nCould you let us know when to expect the April numbers? Is there a delay from the manager's end?\n\nBest,\nElena Vasquez\nInvestor Relations Manager\nHelios Macro Fund",
        timestamp: d(1, 14, 23),
        subject: "Q1 net returns — April numbers still pending?",
        from: "elena.vasquez@heliosmacro.com",
        to: "support@iconnections.io",
      },
    ],
    createdAt: d(1, 14, 23),
    updatedAt: d(1, 14, 23),
  },
  {
    id: "conv2",
    contactId: "c5",
    companyId: "cascade",
    subject: "Returns missing for March — Cascade Endowment",
    preview: "We believe there may be an issue with our document access for the March reports...",
    channel: "email",
    status: "open",
    section: ["monthly-returns", "all", "mine"],
    assigneeId: "phoebe",
    isUnread: true,
    hasFinDraft: false,
    messages: [
      {
        id: "msg2-1",
        sender: "client",
        senderId: "c5",
        content: "Hello,\n\nWe have been expecting the March monthly performance report for our allocations to Northwind Capital and Stratton Multi-Strategy. As of today, neither report appears in our Document Library.\n\nWe have verified that our access permissions have not changed. Is there a technical issue on the platform?\n\nRegards,\nThomas Wei\nInvestment Manager\nCascade Endowment",
        timestamp: d(3, 10, 5),
        subject: "Returns missing for March — Cascade Endowment",
        from: "thomas.wei@cascade-endowment.org",
        to: "support@iconnections.io",
      },
      {
        id: "msg2-2",
        sender: "teammate",
        senderId: "phoebe",
        content: "Hi Thomas,\n\nThank you for reaching out. I have reviewed your account and your document access looks correct for both funds. I have flagged this with our platform team and they are investigating.\n\nI will follow up as soon as I have more information, but expect to hear back from me by end of business today.\n\nBest,\nPhoebe",
        timestamp: d(3, 11, 30),
      },
      {
        id: "msg2-3",
        sender: "client",
        senderId: "c5",
        content: "Thank you Phoebe. We will stand by.",
        timestamp: d(3, 11, 45),
      },
      {
        id: "msg2-4",
        sender: "teammate",
        senderId: "phoebe",
        content: "Update: our platform team has identified the issue — there was a permissions sync error that affected a small number of endowment accounts. This has been resolved and the March reports are now visible in your Document Library. Please let me know if you can access them.\n\nApologies for the inconvenience.",
        timestamp: d(2, 16, 10),
      },
    ],
    createdAt: d(3, 10, 5),
    updatedAt: d(2, 16, 10),
  },
  {
    id: "conv3",
    contactId: "c3",
    companyId: "aurora",
    subject: "Monthly tear sheet request — Aurora Pension",
    preview: "We would like to receive the monthly tear sheet for all of our fund allocations...",
    channel: "email",
    status: "open",
    section: ["monthly-returns", "all", "mine"],
    assigneeId: "phoebe",
    isUnread: false,
    hasFinDraft: false,
    messages: [
      {
        id: "msg3-1",
        sender: "client",
        senderId: "c3",
        content: "Hello,\n\nAurora Pension Trust would like to set up automatic delivery of monthly tear sheets for all of our fund allocations. Currently we access them through the portal but our board prefers to receive them via email.\n\nIs this something you can arrange?\n\nRobert Callahan\nHead of Allocations\nAurora Pension Trust",
        timestamp: d(5, 9, 15),
        subject: "Monthly tear sheet request — Aurora Pension",
        from: "robert.callahan@aurora-pension.com",
        to: "support@iconnections.io",
      },
      {
        id: "msg3-2",
        sender: "teammate",
        senderId: "phoebe",
        content: "Hi Robert,\n\nGreat question — we do have an email delivery option for monthly tear sheets. I can set this up for your account so that reports are automatically emailed to you and any colleagues you specify each month as soon as they are published.\n\nCould you send me the list of email addresses that should receive these reports? I will get it configured within 1 business day.",
        timestamp: d(5, 10, 20),
      },
    ],
    createdAt: d(5, 9, 15),
    updatedAt: d(5, 10, 20),
  },
  {
    id: "conv4",
    contactId: "c1",
    companyId: "ridgemont",
    subject: "Performance attribution clarification — March",
    preview: "We had a few questions after reviewing the March attribution report...",
    channel: "email",
    status: "open",
    section: ["monthly-returns", "all", "mine"],
    assigneeId: "alex",
    isUnread: false,
    hasFinDraft: true,
    finDraftContent: "Thank you for your questions on the March performance attribution. The gross-to-net reconciliation you are referring to reflects the management fee accrual for Q1 in addition to the standard monthly performance fee. I have flagged your specific questions to the fund's IR team and they will follow up directly with a detailed breakdown. In the meantime, the footnotes on page 4 of the full report provide additional context on the fee treatment.",
    finDraftArticleId: "kb1",
    messages: [
      {
        id: "msg4-1",
        sender: "client",
        senderId: "c1",
        content: "Phoebe,\n\nWe reviewed the March attribution report for Stratton Multi-Strategy and had a few questions:\n\n1. The gross return was +2.3% but net return shows +1.6% — is the 70bps gap just management + performance fees or is there something else?\n2. The equity long-short book shows negative attribution despite being flat month — can you clarify the methodology?\n\nHappy to jump on a call if easier.\n\nDavid Harrington\nCIO, Ridgemont Family Office",
        timestamp: d(2, 14, 0),
        subject: "Performance attribution clarification — March",
        from: "david.harrington@ridgemont.com",
        to: "support@iconnections.io",
      },
      {
        id: "msg4-2",
        sender: "teammate",
        senderId: "alex",
        content: "Hi David,\n\nThank you for the detailed questions. I have pulled up the March report and am reviewing the attribution methodology now. I will get back to you with a full response within 2 hours — if a call would be faster, we can schedule one for this afternoon.\n\nAlex Rivera\nClient Support Lead",
        timestamp: d(2, 14, 45),
      },
    ],
    createdAt: d(2, 14, 0),
    updatedAt: d(2, 14, 45),
  },
  {
    id: "conv5",
    contactId: "c9",
    companyId: "stratton",
    subject: "Re: April fund performance summary",
    preview: "Fin has resolved this inquiry. Performance data confirmed available in portal.",
    channel: "email",
    status: "closed",
    section: ["monthly-returns", "ai", "closed", "all"],
    assigneeId: undefined,
    isUnread: false,
    hasFinDraft: false,
    messages: [
      {
        id: "msg5-1",
        sender: "client",
        senderId: "c9",
        content: "Hi — quick check, is the April fund summary up yet for Stratton Multi-Strategy?\n\nChris Park",
        timestamp: d(4, 8, 30),
        subject: "Re: April fund performance summary",
        from: "christopher.park@stratton.com",
        to: "support@iconnections.io",
      },
      {
        id: "msg5-2",
        sender: "ai",
        content: "Hi Christopher,\n\nYes, the April performance summary for Stratton Multi-Strategy is now available in your iConnections Document Library. You can access it under Documents → Monthly Reports → April.\n\nIs there anything else I can help you with?\n\n— Fin, iConnections AI",
        timestamp: d(4, 8, 31),
      },
      {
        id: "msg5-3",
        sender: "client",
        senderId: "c9",
        content: "Great, found it. Thanks.",
        timestamp: d(4, 8, 45),
      },
    ],
    createdAt: d(4, 8, 30),
    updatedAt: d(4, 8, 45),
  },
  {
    id: "conv6",
    contactId: "c13",
    companyId: "palisade",
    subject: "Q4 annual summary — Palisade Sovereign Fund",
    preview: "Escalated to Alex — complex attribution request involving FX overlay...",
    channel: "email",
    status: "open",
    section: ["monthly-returns", "all", "mine"],
    assigneeId: "alex",
    isUnread: true,
    hasFinDraft: false,
    messages: [
      {
        id: "msg6-1",
        sender: "client",
        senderId: "c13",
        content: "Dear Support,\n\nPalisade Sovereign Fund is requesting the full Q4 annual performance summary inclusive of FX overlay attribution for our hedge fund portfolio. Our risk team needs this by COB Friday.\n\nPlease escalate if needed.\n\nAhmed Al-Rashid\nDeputy CIO",
        timestamp: d(0, 9, 0),
        subject: "Q4 annual summary — Palisade Sovereign Fund",
        from: "ahmed.alrashid@palisade.com",
        to: "support@iconnections.io",
      },
    ],
    createdAt: d(0, 9, 0),
    updatedAt: d(0, 9, 0),
  },

  // ── Email inbox ──────────────────────────────────────────────────────────────
  {
    id: "conv7",
    contactId: "c10",
    companyId: "kestrel",
    subject: "iConnections Summit — registration question",
    preview: "I wanted to confirm whether the 1:1 meeting slots are still available for the June event...",
    channel: "email",
    status: "open",
    section: ["email", "all", "unassigned"],
    assigneeId: undefined,
    isUnread: true,
    hasFinDraft: true,
    finDraftContent: "Hi Natasha, thank you for your interest in the iConnections Summit! 1:1 meeting slots are still available for the June event. The scheduling portal opens 4 weeks before the conference — you will receive a calendar invitation with the link as soon as it launches. In the meantime, your registration is confirmed. Please let me know if you have any other questions.",
    finDraftArticleId: "kb2",
    messages: [
      {
        id: "msg7-1",
        sender: "client",
        senderId: "c10",
        content: "Hi,\n\nI wanted to confirm whether the 1:1 meeting slots are still available for the June iConnections Summit. I registered last week but haven't received any information about scheduling yet.\n\nThanks,\nNatasha Brennan",
        timestamp: d(1, 11, 0),
        subject: "iConnections Summit — registration question",
        from: "natasha.brennan@kestrel.com",
        to: "support@iconnections.io",
      },
    ],
    createdAt: d(1, 11, 0),
    updatedAt: d(1, 11, 0),
  },
  {
    id: "conv8",
    contactId: "c11",
    companyId: "meridian",
    subject: "Cannot log in — Meridian Foundation account",
    preview: "I have been trying to access the platform since this morning. The page keeps redirecting to the login screen...",
    channel: "email",
    status: "open",
    section: ["email", "all", "mine"],
    assigneeId: "marcus",
    isUnread: false,
    hasFinDraft: false,
    messages: [
      {
        id: "msg8-1",
        sender: "client",
        senderId: "c11",
        content: "Hi,\n\nI have been trying to access the iConnections platform since this morning. Every time I log in, the page seems to accept my credentials but then redirects me back to the login screen without loading the dashboard.\n\nI have tried Chrome and Safari, cleared cookies, and restarted my computer — same result.\n\nWilliam Okafor\nDirector of Investments\nMeridian Foundation",
        timestamp: d(1, 8, 30),
        subject: "Cannot log in — Meridian Foundation account",
        from: "william.okafor@meridian.org",
        to: "support@iconnections.io",
      },
      {
        id: "msg8-2",
        sender: "teammate",
        senderId: "marcus",
        content: "Hi William,\n\nSorry to hear you're having trouble logging in. I can see your account in our system and it looks active. A redirect loop like this is sometimes caused by a stale session cookie that isn't clearing properly.\n\nCould you try opening an incognito/private window and logging in from there? That will bypass any cached session data. Let me know what happens.",
        timestamp: d(1, 9, 5),
      },
      {
        id: "msg8-3",
        sender: "client",
        senderId: "c11",
        content: "That worked! Incognito window logged me straight in. Thank you for the quick help.",
        timestamp: d(1, 9, 22),
      },
      {
        id: "msg8-4",
        sender: "teammate",
        senderId: "marcus",
        content: "Glad to hear it! The stale cookie should clear on its own within 24 hours so your regular browser should work normally after that. I'll close this ticket out — feel free to reopen if anything comes up.",
        timestamp: d(1, 9, 30),
      },
    ],
    createdAt: d(1, 8, 30),
    updatedAt: d(1, 9, 30),
  },
  {
    id: "conv9",
    contactId: "c14",
    companyId: "blackthorn",
    subject: "Wire instruction update — CONFIDENTIAL",
    preview: "Blackthorn Capital needs to update banking details for our subscription account...",
    channel: "email",
    status: "open",
    section: ["email", "all", "mine"],
    assigneeId: "alex",
    isUnread: true,
    hasFinDraft: false,
    isConfidential: true,
    messages: [
      {
        id: "msg9-1",
        sender: "client",
        senderId: "c14",
        content: "Dear iConnections Compliance,\n\nBlackthorn Capital needs to update the banking details associated with our subscription account. Our banking relationship has changed following a recent reorganization.\n\nPlease advise on the correct procedure.\n\nCaroline Montague\nGeneral Counsel\nBlackthorn Capital",
        timestamp: d(0, 10, 0),
        subject: "Wire instruction update — CONFIDENTIAL",
        from: "caroline.montague@blackthorn.com",
        to: "support@iconnections.io",
      },
    ],
    createdAt: d(0, 10, 0),
    updatedAt: d(0, 10, 0),
  },
  {
    id: "conv10",
    contactId: "c7",
    companyId: "northwind",
    subject: "Introduction request — Palisade Sovereign Fund",
    preview: "Following up on the intro we discussed at last month's conference...",
    channel: "email",
    status: "open",
    section: ["email", "all", "unassigned"],
    assigneeId: undefined,
    isUnread: false,
    hasFinDraft: false,
    messages: [
      {
        id: "msg10-1",
        sender: "client",
        senderId: "c7",
        content: "Hi Phoebe,\n\nFollowing up on the introduction we discussed at last month's iConnections conference. We would be very interested in connecting with Palisade Sovereign Fund's allocations team. Do you know if they have expressed interest in our strategy?\n\nJames Holloway\nManaging Partner\nNorthwind Capital",
        timestamp: d(6, 13, 0),
        subject: "Introduction request — Palisade Sovereign Fund",
        from: "james.holloway@northwind.com",
        to: "support@iconnections.io",
      },
      {
        id: "msg10-2",
        sender: "teammate",
        senderId: "phoebe",
        content: "Hi James,\n\nThank you for following up. I have checked the platform and Palisade Sovereign Fund has indicated interest in meeting with global macro strategies. I will reach out to their team to gauge interest in a formal introduction and follow up with you by end of week.\n\nBest,\nPhoebe",
        timestamp: d(6, 14, 30),
      },
    ],
    createdAt: d(6, 13, 0),
    updatedAt: d(6, 14, 30),
  },
  {
    id: "conv11",
    contactId: "c4",
    companyId: "aurora",
    subject: "Document access request — DDQ and audited financials",
    preview: "Aurora Pension Trust compliance team needs access to the full DDQ for Helios Macro Fund...",
    channel: "email",
    status: "open",
    section: ["email", "all", "mine"],
    assigneeId: "priya",
    isUnread: false,
    hasFinDraft: false,
    messages: [
      {
        id: "msg11-1",
        sender: "client",
        senderId: "c4",
        content: "Hello,\n\nAs part of our annual due diligence cycle, our compliance team needs access to the latest DDQ and audited financials for Helios Macro Fund. I have confirmed with our investment team that we are a current investor.\n\nPlease can you arrange access?\n\nLinda Bauer\nCompliance Officer\nAurora Pension Trust",
        timestamp: d(2, 15, 0),
        subject: "Document access request — DDQ and audited financials",
        from: "linda.bauer@aurora-pension.com",
        to: "support@iconnections.io",
        cc: "robert.callahan@aurora-pension.com",
      },
      {
        id: "msg11-2",
        sender: "teammate",
        senderId: "priya",
        content: "Hi Linda,\n\nThank you for reaching out. I have verified Aurora Pension Trust's investor status with Helios Macro Fund and have submitted a document access request to the fund's IR team. Access is typically granted within 1 business day.\n\nI will send you a confirmation once the documents are available in your library.\n\nBest,\nPriya",
        timestamp: d(2, 16, 0),
      },
    ],
    createdAt: d(2, 15, 0),
    updatedAt: d(2, 16, 0),
  },
  {
    id: "conv12",
    contactId: "c6",
    companyId: "northwind",
    subject: "Re: Q1 LP letter — formatting question",
    preview: "We noticed the PDF rendering looks different in the new portal. Is this a known issue?",
    channel: "email",
    status: "open",
    section: ["email", "all", "unassigned"],
    assigneeId: undefined,
    isUnread: true,
    hasFinDraft: false,
    messages: [
      {
        id: "msg12-1",
        sender: "client",
        senderId: "c6",
        content: "Hi team,\n\nWe noticed that the Q1 LP letter we uploaded to the Document Library has some formatting issues when viewed in the portal's built-in PDF viewer — specifically the charts on pages 3 and 4 are rendering incorrectly.\n\nThe PDF itself is fine when downloaded. Is this a known viewer issue?\n\nMargaret O'Sullivan\nInvestor Relations\nNorthwind Capital",
        timestamp: d(0, 11, 30),
        subject: "Re: Q1 LP letter — formatting question",
        from: "margaret.osullivan@northwind.com",
        to: "support@iconnections.io",
        cc: "james.holloway@northwind.com",
      },
    ],
    createdAt: d(0, 11, 30),
    updatedAt: d(0, 11, 30),
  },
  {
    id: "conv13",
    contactId: "c15",
    companyId: "vanta",
    subject: "Platform onboarding — new team member access",
    preview: "We have a new analyst joining next week and need to set up their iConnections access...",
    channel: "email",
    status: "closed",
    section: ["email", "closed", "all"],
    assigneeId: "marcus",
    isUnread: false,
    hasFinDraft: false,
    messages: [
      {
        id: "msg13-1",
        sender: "client",
        senderId: "c15",
        content: "Hi,\n\nWe have a new analyst joining next week — Ananya Mehta (ananya.mehta@vanta.com). She will need the same document access as our existing team. Could you set up her account?\n\nRaj Krishnamurthy\nCOO, Vanta Asset Management",
        timestamp: d(7, 9, 0),
        subject: "Platform onboarding — new team member access",
        from: "raj.krishnamurthy@vanta.com",
        to: "support@iconnections.io",
      },
      {
        id: "msg13-2",
        sender: "teammate",
        senderId: "marcus",
        content: "Hi Raj,\n\nAll done — Ananya's account has been created and she has been granted matching document access. An invitation email has been sent to ananya.mehta@vanta.com with setup instructions.\n\nWelcome aboard, Ananya!\n\nMarcus",
        timestamp: d(7, 10, 15),
      },
    ],
    createdAt: d(7, 9, 0),
    updatedAt: d(7, 10, 15),
  },

  // ── Live Chat ────────────────────────────────────────────────────────────────
  {
    id: "conv14",
    contactId: "c2",
    companyId: "ridgemont",
    subject: "Chat — Document library access help",
    preview: "I'm trying to find the December tearsheet but can't navigate to it...",
    channel: "chat",
    status: "open",
    section: ["chat", "all", "mine"],
    assigneeId: "marcus",
    isUnread: true,
    hasFinDraft: false,
    messages: [
      {
        id: "msg14-1",
        sender: "client",
        senderId: "c2",
        content: "Hi! I'm trying to find the December tearsheet for Stratton Multi-Strategy but I can't figure out how to navigate to it. I can see the Documents section but it's not showing December anywhere.",
        timestamp: d(0, 14, 10),
      },
      {
        id: "msg14-2",
        sender: "ai",
        content: "Hi Sarah! I can help with that. In the Document Library, make sure you are looking under Documents → Monthly Reports → Stratton Multi-Strategy. If December is not showing there, it may not have been published yet or your access may need to be refreshed. Could you try logging out and back in?",
        timestamp: d(0, 14, 11),
      },
      {
        id: "msg14-3",
        sender: "client",
        senderId: "c2",
        content: "I tried that — still nothing. It shows November and January but December is just missing.",
        timestamp: d(0, 14, 13),
      },
      {
        id: "msg14-4",
        sender: "system",
        content: "Marcus Johnson joined the conversation",
        timestamp: d(0, 14, 14),
      },
      {
        id: "msg14-5",
        sender: "teammate",
        senderId: "marcus",
        content: "Hi Sarah, Marcus here. Let me pull up your account and check what's happening with December. Give me just one moment.",
        timestamp: d(0, 14, 15),
      },
    ],
    createdAt: d(0, 14, 10),
    updatedAt: d(0, 14, 15),
  },
  {
    id: "conv15",
    contactId: "c16",
    companyId: "cascade",
    subject: "Chat — Conference registration help",
    preview: "Fin fully resolved this — conference registration confirmed.",
    channel: "chat",
    status: "closed",
    section: ["chat", "ai", "closed", "all"],
    assigneeId: undefined,
    isUnread: false,
    hasFinDraft: false,
    messages: [
      {
        id: "msg15-1",
        sender: "client",
        senderId: "c16",
        content: "Hello, I need to register for the iConnections annual summit in June. How do I do that?",
        timestamp: d(3, 10, 0),
      },
      {
        id: "msg15-2",
        sender: "ai",
        content: "Hi! Happy to help with conference registration. To register for the iConnections Summit, log in to the platform and go to Events → Upcoming Events → iConnections Annual Summit. Click Register and follow the prompts. You should receive a confirmation email within a few minutes. Is there anything else I can help with?",
        timestamp: d(3, 10, 1),
      },
      {
        id: "msg15-3",
        sender: "client",
        senderId: "c16",
        content: "Perfect, registered! Thank you.",
        timestamp: d(3, 10, 8),
      },
    ],
    createdAt: d(3, 10, 0),
    updatedAt: d(3, 10, 8),
  },
  {
    id: "conv16",
    contactId: "c17",
    companyId: "helios",
    subject: "Chat — Password reset assistance",
    preview: "User was locked out, Fin guided through reset, Marcus confirmed resolved...",
    channel: "chat",
    status: "closed",
    section: ["chat", "ai", "closed", "all"],
    assigneeId: "marcus",
    isUnread: false,
    hasFinDraft: false,
    messages: [
      {
        id: "msg16-1",
        sender: "client",
        senderId: "c17",
        content: "I'm locked out of my account and can't reset the password — the reset email isn't coming through.",
        timestamp: d(5, 16, 0),
      },
      {
        id: "msg16-2",
        sender: "ai",
        content: "I'm sorry to hear that. Reset emails can sometimes be caught by spam filters. Could you check your spam or junk folder? Also, make sure you are entering the email address associated with your iConnections account. If you still can't find it, I can connect you with a specialist.",
        timestamp: d(5, 16, 0),
      },
      {
        id: "msg16-3",
        sender: "client",
        senderId: "c17",
        content: "Found it in spam. Got the reset link. All good now.",
        timestamp: d(5, 16, 5),
      },
      {
        id: "msg16-4",
        sender: "system",
        content: "Marcus Johnson joined the conversation",
        timestamp: d(5, 16, 5),
      },
      {
        id: "msg16-5",
        sender: "teammate",
        senderId: "marcus",
        content: "Glad you got in Henry! I'll add your email to our safe sender list so future emails don't end up in spam. I'm going to close this ticket out now.",
        timestamp: d(5, 16, 7),
      },
    ],
    createdAt: d(5, 16, 0),
    updatedAt: d(5, 16, 7),
  },
  {
    id: "conv17",
    contactId: "c12",
    companyId: "ironwood",
    subject: "Chat — Platform navigation help",
    preview: "Looking for the manager search feature. Fin answered successfully.",
    channel: "chat",
    status: "closed",
    section: ["chat", "ai", "closed", "all"],
    assigneeId: undefined,
    isUnread: false,
    hasFinDraft: false,
    messages: [
      {
        id: "msg17-1",
        sender: "client",
        senderId: "c12",
        content: "Where can I find the manager search tool? I want to discover new GPs.",
        timestamp: d(8, 11, 0),
      },
      {
        id: "msg17-2",
        sender: "ai",
        content: "The manager search tool is under Discover → Managers in the top navigation. You can filter by strategy, AUM, geography, and other criteria. Once you find a manager you're interested in, you can request an introduction directly from their profile page. Let me know if you need help with anything else!",
        timestamp: d(8, 11, 0),
      },
      {
        id: "msg17-3",
        sender: "client",
        senderId: "c12",
        content: "Got it, thanks!",
        timestamp: d(8, 11, 2),
      },
    ],
    createdAt: d(8, 11, 0),
    updatedAt: d(8, 11, 2),
  },

  // ── Out of Office ────────────────────────────────────────────────────────────
  {
    id: "conv18",
    contactId: "c3",
    companyId: "aurora",
    subject: "Auto-reply: Out of Office — Robert Callahan",
    preview: "I am out of the office until May 20th. For urgent matters, please contact...",
    channel: "email",
    status: "closed",
    section: ["ooo", "closed", "all"],
    assigneeId: undefined,
    isUnread: false,
    hasFinDraft: false,
    messages: [
      {
        id: "msg18-1",
        sender: "client",
        senderId: "c3",
        content: "Thank you for your email. I am out of the office until May 20th attending our annual investment committee offsite.\n\nFor urgent matters, please contact my colleague Diana Frost at diana.frost@aurora-pension.com.\n\nFor matters related to iConnections, our account information can be accessed at any time via the platform.\n\nI will respond to all other messages upon my return.\n\nBest,\nRobert Callahan",
        timestamp: d(4, 9, 0),
        subject: "Auto-reply: Out of Office — Robert Callahan",
        from: "robert.callahan@aurora-pension.com",
        to: "support@iconnections.io",
      },
    ],
    createdAt: d(4, 9, 0),
    updatedAt: d(4, 9, 0),
  },
  {
    id: "conv19",
    contactId: "c1",
    companyId: "ridgemont",
    subject: "Automatic reply: David Harrington — on holiday",
    preview: "I am on holiday until May 15th. Please contact Sarah Chen for any urgent iConnections matters...",
    channel: "email",
    status: "closed",
    section: ["ooo", "closed", "all"],
    assigneeId: undefined,
    isUnread: false,
    hasFinDraft: false,
    messages: [
      {
        id: "msg19-1",
        sender: "client",
        senderId: "c1",
        content: "I am on holiday until May 15th and will have limited access to email.\n\nFor any urgent iConnections platform matters, please contact Sarah Chen at sarah.chen@ridgemont.com who can assist in my absence.\n\nDavid Harrington",
        timestamp: d(6, 15, 0),
        subject: "Automatic reply: David Harrington — on holiday",
        from: "david.harrington@ridgemont.com",
        to: "support@iconnections.io",
      },
    ],
    createdAt: d(6, 15, 0),
    updatedAt: d(6, 15, 0),
  },
  {
    id: "conv20",
    contactId: "c13",
    companyId: "palisade",
    subject: "OOO: Ahmed Al-Rashid — Dubai travel",
    preview: "I am traveling in Dubai for the week. All iConnections matters can wait until my return...",
    channel: "email",
    status: "closed",
    section: ["ooo", "closed", "all"],
    assigneeId: undefined,
    isUnread: false,
    hasFinDraft: false,
    messages: [
      {
        id: "msg20-1",
        sender: "client",
        senderId: "c13",
        content: "I am traveling in Dubai for the week and available only by phone for urgent matters.\n\nAll iConnections platform inquiries and non-urgent correspondence can wait until my return on May 12th.\n\nAhmed Al-Rashid\nDeputy CIO, Palisade Sovereign Fund",
        timestamp: d(5, 8, 0),
        subject: "OOO: Ahmed Al-Rashid — Dubai travel",
        from: "ahmed.alrashid@palisade.com",
        to: "support@iconnections.io",
      },
    ],
    createdAt: d(5, 8, 0),
    updatedAt: d(5, 8, 0),
  },

  // ── Bounces ──────────────────────────────────────────────────────────────────
  {
    id: "conv21",
    contactId: "c5",
    companyId: "cascade",
    subject: "MAILER-DAEMON: Delivery failed — t.weii@cascade-endowment.org",
    preview: "This message could not be delivered. The email address t.weii@cascade-endowment.org does not exist...",
    channel: "email",
    status: "open",
    section: ["bounces", "all"],
    assigneeId: undefined,
    isUnread: true,
    hasFinDraft: false,
    bounceEmail: "t.weii@cascade-endowment.org",
    messages: [
      {
        id: "msg21-1",
        sender: "system",
        content: "This is the mail system at iconnections.io.\n\nYour message to t.weii@cascade-endowment.org could not be delivered.\n\n550 5.1.1 The email account that you tried to reach does not exist. Please try the recipient's email address again, or contact your system administrator.\n\nOriginal message: Monthly Returns — March report now available",
        timestamp: d(3, 6, 0),
        subject: "MAILER-DAEMON: Delivery failed — t.weii@cascade-endowment.org",
      },
    ],
    createdAt: d(3, 6, 0),
    updatedAt: d(3, 6, 0),
  },
  {
    id: "conv22",
    contactId: "c3",
    companyId: "aurora",
    subject: "MAILER-DAEMON: Delivery failed — r.callahan@aurora-pensions.com",
    preview: "Undeliverable: the address r.callahan@aurora-pensions.com is invalid...",
    channel: "email",
    status: "open",
    section: ["bounces", "all"],
    assigneeId: undefined,
    isUnread: true,
    hasFinDraft: false,
    bounceEmail: "r.callahan@aurora-pensions.com",
    messages: [
      {
        id: "msg22-1",
        sender: "system",
        content: "Delivery Status Notification (Failure)\n\nYour message to r.callahan@aurora-pensions.com was undeliverable.\n\nNote: The correct domain is aurora-pension.com (no trailing 's'). Please update your address book.\n\n550 5.1.1 User unknown.",
        timestamp: d(2, 6, 15),
        subject: "MAILER-DAEMON: Delivery failed — r.callahan@aurora-pensions.com",
      },
    ],
    createdAt: d(2, 6, 15),
    updatedAt: d(2, 6, 15),
  },
  {
    id: "conv23",
    contactId: "c12",
    companyId: "ironwood",
    subject: "MAILER-DAEMON: Delivery failed — p.lund@ironwood-pension.org",
    preview: "Failed delivery to p.lund@ironwood-pension.org — no such user on this server...",
    channel: "email",
    status: "open",
    section: ["bounces", "all"],
    assigneeId: undefined,
    isUnread: false,
    hasFinDraft: false,
    bounceEmail: "p.lund@ironwood-pension.org",
    messages: [
      {
        id: "msg23-1",
        sender: "system",
        content: "DELIVERY FAILURE: The following message could not be delivered.\n\nRecipient: p.lund@ironwood-pension.org\nError: 550 No such user here\n\nThe correct address may be p.lund@ironwood.org — please verify with the recipient and update your distribution list.",
        timestamp: d(1, 6, 30),
        subject: "MAILER-DAEMON: Delivery failed — p.lund@ironwood-pension.org",
      },
    ],
    createdAt: d(1, 6, 30),
    updatedAt: d(1, 6, 30),
  },

  // ── Closed ───────────────────────────────────────────────────────────────────
  {
    id: "conv24",
    contactId: "c18",
    companyId: "aurora",
    subject: "Platform password changed successfully",
    preview: "Confirmed resolved — user successfully reset their password and logged in.",
    channel: "email",
    status: "closed",
    section: ["closed", "all"],
    assigneeId: "jordan",
    isUnread: false,
    hasFinDraft: false,
    messages: [
      {
        id: "msg24-1",
        sender: "client",
        senderId: "c18",
        content: "Hi, I need help resetting my password. It's not accepting my current one.",
        timestamp: d(10, 14, 0),
        subject: "Password reset help",
        from: "diana.frost@aurora-pension.com",
        to: "support@iconnections.io",
      },
      {
        id: "msg24-2",
        sender: "teammate",
        senderId: "jordan",
        content: "Hi Diana, I've initiated a manual password reset on your account. You should receive a reset email within 2 minutes. Let me know if it doesn't arrive.",
        timestamp: d(10, 14, 15),
      },
      {
        id: "msg24-3",
        sender: "client",
        senderId: "c18",
        content: "Got it, all sorted. Thank you!",
        timestamp: d(10, 14, 30),
      },
    ],
    createdAt: d(10, 14, 0),
    updatedAt: d(10, 14, 30),
  },
  {
    id: "conv25",
    contactId: "c15",
    companyId: "vanta",
    subject: "Re: Conference 1:1 scheduling — Vanta AM confirmed",
    preview: "1:1 meeting slots confirmed for the June summit. All good.",
    channel: "email",
    status: "closed",
    section: ["closed", "all"],
    assigneeId: "priya",
    isUnread: false,
    hasFinDraft: false,
    messages: [
      {
        id: "msg25-1",
        sender: "client",
        senderId: "c15",
        content: "Hi, can you confirm our 1:1 meeting slots for the June summit have been submitted correctly? I completed the scheduling flow but didn't get a confirmation email.",
        timestamp: d(12, 10, 0),
        subject: "Conference 1:1 scheduling confirmation",
        from: "raj.krishnamurthy@vanta.com",
        to: "support@iconnections.io",
      },
      {
        id: "msg25-2",
        sender: "teammate",
        senderId: "priya",
        content: "Hi Raj — confirmed! Your scheduling preferences have been received and you will receive a final confirmed schedule 2 weeks before the event. A confirmation email should arrive shortly; if not, check spam.",
        timestamp: d(12, 10, 45),
      },
      {
        id: "msg25-3",
        sender: "client",
        senderId: "c15",
        content: "Perfect. Thanks Priya.",
        timestamp: d(12, 11, 0),
      },
    ],
    createdAt: d(12, 10, 0),
    updatedAt: d(12, 11, 0),
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

export function getContact(id: string): Contact | undefined {
  return CONTACTS.find((c) => c.id === id);
}

export function getCompany(id: string): Company | undefined {
  return COMPANIES.find((c) => c.id === id);
}

export function getTeammate(id: string): Teammate | undefined {
  return TEAMMATES.find((t) => t.id === id);
}

export function getConversationsForSection(section: string): Conversation[] {
  if (section === "all") return CONVERSATIONS.filter((c) => c.status !== "spam");
  if (section === "open") return CONVERSATIONS.filter((c) => c.status === "open");
  if (section === "snoozed") return CONVERSATIONS.filter((c) => c.status === "snoozed");
  if (section === "closed") return CONVERSATIONS.filter((c) => c.status === "closed");
  if (section === "spam") return CONVERSATIONS.filter((c) => c.status === "spam");
  return CONVERSATIONS.filter((c) => c.section.includes(section as never));
}

export function getSectionCounts() {
  return {
    all: CONVERSATIONS.filter((c) => c.status !== "spam").length,
    mine: CONVERSATIONS.filter((c) => c.section.includes("mine")).length,
    unassigned: CONVERSATIONS.filter((c) => c.section.includes("unassigned")).length,
    mentions: 2,
    email: CONVERSATIONS.filter((c) => c.section.includes("email")).length,
    chat: CONVERSATIONS.filter((c) => c.section.includes("chat")).length,
    ai: CONVERSATIONS.filter((c) => c.section.includes("ai")).length,
    "monthly-returns": CONVERSATIONS.filter((c) => c.section.includes("monthly-returns")).length,
    ooo: CONVERSATIONS.filter((c) => c.section.includes("ooo")).length,
    bounces: CONVERSATIONS.filter((c) => c.section.includes("bounces")).length,
    open: CONVERSATIONS.filter((c) => c.status === "open").length,
    snoozed: 0,
    closed: CONVERSATIONS.filter((c) => c.status === "closed").length,
    spam: 0,
  };
}
