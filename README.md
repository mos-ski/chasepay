# ChasePay — Automated Debt Recovery Dashboard

A full-featured Next.js 14 frontend for ChasePay, an automated debt recovery SaaS for Nigerian small businesses.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS with Stripe-inspired design tokens
- **Components:** shadcn/ui
- **Language:** TypeScript

## Screens

- **Login** — Stripe-style auth card
- **Onboarding** — 3-step business setup wizard
- **Dashboard** — Stats, urgent debtors, activity feed
- **Debtors** — Searchable/filterable table with pagination
- **Add Debtor** — 4-step wizard (debtor info → debt details → chase settings → review)
- **Debtor Detail** — Chase timeline, message log, contact info
- **Templates** — Message templates by escalation level (L1–L5) with edit/create drawer
- **Settings** — Profile, Channels, Number Pool, Billing tabs

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the app loads at the login page.

## Notes

This is a frontend-only prototype with static mock data. All Nigerian business data (debtors, messages, templates) is in `lib/mock-data.ts`. Backend integration (Africa's Talking, Paystack, WhatsApp API) is the next phase.
