---
title: "blockrate"
description: "Per-provider ad-blocker block-rate measurement: a 1.6 KB OSS client, a self-hostable ingestion server, and a hosted dashboard."
date: "2026-04-22"
repoURL: "https://github.com/afonsojramos/blockrate"
demoURL: "https://blockrate.app"
tags: ["TypeScript", "Bun", "Drizzle", "TanStack Start", "Observability"]
icon: "./logo.png"
---

Existing "ad block detectors" tell you whether _a_ blocker exists on the visitor's machine. They don't tell you _which third-party tools you actually rely on are blocked._ Optimizely and PostHog have very different block rates. So do GA4 and Segment. Knowing the per-provider number is the difference between "ignore it" and "we should reverse-proxy this one server-side."

`blockrate` measures it. Three tiers depending on how much infrastructure you want to run:

- **OSS library** (1.6 KB, zero deps) - drop into any web app, point at any reporter. First-party origin only, by design - third-party reporter URLs are themselves blockable, defeating the purpose. The core README explains why this is load-bearing.
- **Self-hosted server** - `bunx blockrate-server` and you have an ingestion server with SQLite by default (Postgres optional via Drizzle), a built-in dashboard, and an API key. One binary, one command.
- **Hosted version** ([blockrate.app](https://blockrate.app)) - sign in, get a key, see per-provider rates. For people who don't want to operate any of the above.

Built on Bun + Drizzle for the server, TanStack Start + Better Auth for the dashboard. Framework adapters for Next.js, TanStack Start, SvelteKit, Nuxt, SolidStart, and vanilla JS in the box. Source at [github.com/afonsojramos/blockrate](https://github.com/afonsojramos/blockrate).
