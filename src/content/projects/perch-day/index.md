---
title: "perch.day"
description: "A B2B app to coordinate who's in the office and plan the day around it: live attendance, catering by headcount and dietary need, guests, and capacity."
date: "2026-06-26"
demoURL: "https://perch.day"
tags: ["TanStack Start", "Cloudflare Workers", "D1", "React 19", "SaaS"]
---

Hybrid work broke the simplest question an office has: who is actually coming in this week? The Slack poll goes stale by Tuesday, the shared sheet nobody updates is worse, and by the time you are ordering lunch you are guessing. [perch.day](https://perch.day) turns that guess into a live weekly grid everyone updates in one tap.

It is a multi-tenant B2B web app. Members toggle themselves in or out per day and pick a lunch option; each office shows live headcounts and who is coming in. From that one signal the app does the planning nobody enjoys: catering numbers broken down by dietary preference, guest visits, and capacity, all in one lightweight weekly view. Members can save private peer groups to follow just their own people, and admins manage offices, teams, members, and invitations.

Under the hood it is built to be boringly reliable. [TanStack Start](https://tanstack.com/start) (React 19) on the [Cloudflare Workers](https://developers.cloudflare.com/workers/) runtime, with [D1](https://developers.cloudflare.com/d1/) and [Drizzle ORM](https://orm.drizzle.team/) for data. Multi-tenancy is shared-schema with an `orgId` on every row, resolved server-side on every request so client-supplied org ids are never trusted. Auth and billing run on [better-auth](https://www.better-auth.com/): email/password, magic links, organizations, enterprise SSO over OIDC and SAML 2.0, and per-seat [Stripe](https://stripe.com) subscriptions with a free tier for small teams. The UI is optimistic throughout, so toggles and edits apply instantly and roll back on error.

Live at [perch.day](https://perch.day), free for up to five people.
