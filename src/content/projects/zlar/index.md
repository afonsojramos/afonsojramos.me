---
title: "zlar"
description: "A condominium management platform for Portugal, giving building managers and residents a single place to handle the day-to-day running of a building."
date: "2026-01-16"
demoURL: "https://zlar.app"
tags: ["TanStack Start", "Cloudflare Workers", "PostgreSQL", "React 19", "SaaS"]
---

Running a condominium in Portugal still mostly happens over email threads, paper notices, and a management company's spreadsheet nobody outside the office ever sees. [Zlar](https://zlar.app) is a management platform built to pull that whole process into one place, for the people managing buildings and the residents living in them.

It is a bilingual product (pt-PT and en), aimed squarely at the Portuguese market, covering the day-to-day running of a building: the condominium side, rental (arrendamento), services, and quote requests, with a dedicated resident area so owners are not left refreshing their inbox for updates.

The stack is the modern edge-first setup I keep reaching for: [TanStack Start](https://tanstack.com/start) (React 19) on [Cloudflare Workers](https://developers.cloudflare.com/workers/), a [Neon](https://neon.tech/) PostgreSQL database reached through [Cloudflare Hyperdrive](https://developers.cloudflare.com/hyperdrive/) with [Drizzle ORM](https://orm.drizzle.team/), self-hosted [Better Auth](https://www.better-auth.com/) for identity, [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/), and [Lingui](https://lingui.dev/) for type-safe translations.

Live at [zlar.app](https://zlar.app).
