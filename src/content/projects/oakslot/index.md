---
title: "oakslot"
description: "An academic scheduling platform for universities: a constraint-based solver, multi-step approvals, exam scheduling, SSO, and audit in one system."
date: "2026-02-02"
demoURL: "https://oakslot.com"
tags: ["TanStack Start", "Rust", "PostgreSQL", "Constraint Solver", "SaaS"]
---

University timetabling is one of those problems that looks like a spreadsheet and is really a constraint-satisfaction nightmare: hundreds of courses, rooms, and instructors, every one of them with a reason they cannot be in two places at once. [Oakslot](https://oakslot.com) exists to schedule the term, not the spreadsheet.

At its core is a **constraint-based solver** that automatically generates conflict-free schedules across courses, rooms, and instructors, honouring configurable hard and soft constraints and reporting a quality score for the result. The solver is written in **Rust** (an [Axum](https://github.com/tokio-rs/axum) service) using [Tabu Search](https://en.wikipedia.org/wiki/Tabu_search) and [Simulated Annealing](https://en.wikipedia.org/wiki/Simulated_annealing), the kind of metaheuristics that actually cope when the search space is too large to brute-force. Around it sits the work an academic affairs office really does day to day: multi-step approvals, exam scheduling, and a full audit log on every change.

The platform side is built for institutions rather than individuals. It is multi-tenant with organization-based data isolation, ships real-time updates over SSE so schedule changes land live, and supports enterprise SSO via SAML and OIDC. The frontend is [TanStack Start](https://tanstack.com/start) (React 19) with [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/), talking to a [PostgreSQL](https://www.postgresql.org/) database through [Drizzle ORM](https://orm.drizzle.team/), with [Better Auth](https://better-auth.com/) handling identity.

Live at [oakslot.com](https://oakslot.com).
