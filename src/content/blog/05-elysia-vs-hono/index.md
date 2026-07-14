---
title: "Hono vs Elysia for Astro on Cloudflare: What I Chose"
description: "A practical Hono vs Elysia comparison for Astro API routes on Cloudflare, including the new Elysia Cloudflare adapter and why I chose Hono."
slug: elysia-vs-hono-astro-cloudflare
date: 11 March 2025
---

When building an Astro application, one of the first decisions you'll face is how to handle API routes. If you value type safety and developer experience, you may have considered Elysia or Hono, two popular TypeScript web frameworks.

I recently went through the process of migrating (on the same day 😅) from [Elysia](https://elysiajs.com/) to [Hono](https://hono.dev/) for my personal website, and I wanted to share my experience, particularly when deploying to Cloudflare Pages and dealing with environment variables.

## Hono vs Elysia: The Short Answer

For Astro API routes deployed to Cloudflare, **I chose Hono**. Both frameworks handled my routes well in development, but Hono let me pass Cloudflare environment bindings from Astro's runtime context directly into the app. At the time of this migration, I could not find an equally clean way to do that with Elysia's request handler.

> **July 2026 update:** Elysia now has an [experimental Cloudflare Worker adapter](https://elysiajs.com/integrations/cloudflare-worker). Its documentation shows support for Cloudflare bindings through `cloudflare:workers`, requires a compatibility date of at least `2025-06-01`, and lists several current limitations. That option was not available when I wrote this article in March 2025. If I were choosing today, I would test the adapter against my Astro integration before deciding.

|                         | Elysia                                                                | Hono                         |
| ----------------------- | --------------------------------------------------------------------- | ---------------------------- |
| Astro endpoint handler  | `app.handle(request)`                                                 | `app.fetch(request, env)`    |
| Cloudflare bindings     | Available through the experimental Worker adapter                     | Available through `c.env`    |
| July 2026 dry-run build | 155.03 KiB gzip                                                       | 15.39 KiB gzip               |
| My existing Astro setup | Would require retesting the adapter or changing how bindings are read | Already deployed and working |

This is not a universal benchmark or a claim that Hono is always better. It is a comparison of the integration problem I encountered: getting Cloudflare bindings into API handlers while keeping the Astro deployment simple.

## The Initial Setup: Elysia

Let me be honest upfront - I didn't strictly _need_ a framework for my simple API routes. Astro's built-in API functionality would have been perfectly adequate for my use case. But as developers, we often choose technologies not just for practical reasons, but also for the sake of experimentation and learning. I wanted to try something new and see what these Bun-optimized frameworks had to offer.

My journey began with Elysia, a framework that promises "sub-millisecond" performance and a delightful developer experience. Setting up API routes in Astro with Elysia is straightforward:

```typescript
import { getTopTracks } from "~/api/lastfm";
import type { APIRoute } from "astro";
import { Elysia } from "elysia";

const app = new Elysia({ prefix: "/api", aot: false });

app.get("/top-tracks", getTopTracks);

const handle: APIRoute = ({ request }) => app.handle(request);

export const GET = handle;
export const POST = handle;
```

This worked perfectly in development. The API routes were fast, type-safe, and the developer experience was excellent. However, when I deployed to Cloudflare Pages, I encountered a significant limitation.

## The Cloudflare Challenge in 2025

Cloudflare Pages uses a runtime environment that differs from your local development setup. One key difference is how environment variables are accessed. In Cloudflare, environment variables are not directly available through `process.env` but are instead passed through the request context, which means that it is not globally available like in your local development environment.

With Elysia, I couldn't find a clean way to access the Cloudflare runtime context and pass it to my API handlers. My Last.fm API key was stored as a Cloudflare secret, which then is available as an environment variable, but my handlers couldn't access it because Elysia's `handle` method only accepted the request object, not the full Astro context. This describes the integration I tested in March 2025, not Elysia's current Cloudflare support.

```typescript
const handle: APIRoute = ({ request, locals }) => {
  // No way to pass locals.runtime.env to Elysia handlers 😭
  return app.handle(request);
};
```

## Enter Hono: The Solution

So, if Elysia was out of the question, I needed to find a new framework that could handle the Cloudflare runtime context. And who's the second most popular framework after Elysia? Hono! And to be honest, Hono is becoming a way more exciting framework with a ton of built-in features.

Now, being aware of the problem at hand, I was quick to discover that Hono does offer a more flexible approach to handling contexts.

```typescript
// [...slugs].ts
import { getNowPlaying, getTopTracks } from "~/api/lastfm";
import type { APIRoute } from "astro";
import { Hono, type Context as HonoContext } from "hono";
import type { BlankInput } from "hono/types";

type Bindings = {
  LASTFM_API_KEY: string;
};

export interface Context extends HonoContext<{ Bindings: Bindings }, string, BlankInput> {}

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

app
  .get("/now-playing", async (c) => getNowPlaying(c))
  .get("/top-tracks", async (c) => getTopTracks(c));

const handle: APIRoute = async ({ request, locals }) =>
  // To get the locals.runtime object correctly typed, we need to first follow the guide: https://docs.astro.build/en/guides/integrations-guide/cloudflare/#typing
  // Then we can pass the environment variables to the Hono app
  app.fetch(request, { ...locals.runtime.env });

export const GET = handle;
export const POST = handle;
```

The key difference is that Hono's `fetch` method accepts a second parameter where you can pass environment variables and other context. This allowed me to pass `locals.runtime.env` from Astro's context directly to my Hono app, making those environment variables available to my API handlers.

## Refactoring the API Handlers

With this change, I also needed to update my API handlers to accept the Hono context:

```typescript
// Before with Elysia
export const getTopTracks = async () => {
  const API_KEY = process.env.LASTFM_API_KEY;
  // Rest of the handler
};

// After with Hono
export const getTopTracks = async (c: Context) => {
  const API_KEY = c.env.LASTFM_API_KEY;
  // Rest of the handler
};
```

This approach has several advantages:

1. Improved type safety for environment variables
2. Access to Cloudflare-specific features
3. Cleaner separation of concerns
4. Better testability since dependencies are injected (not that I'm going to write tests for my personal website 🫣, but still)

Is my codebase heavily tied to Cloudflare Pages? A bit, but I'm okay with that. Moving from it, if I were to move away from the amazing Cloudflare experience that I've been enjoying, would still be easier than the migration from NextJS (with CSS Modules) to Astro.

## Updated Hono vs Elysia Results (July 2026)

I retested with Elysia 1.4.29, Hono 4.12.30, Node 24.18.0, Bun 1.3.14, and Wrangler 4.110.0 on an Apple Silicon Mac. Both Cloudflare Worker implementations exposed the same dynamic text route and read the same environment binding.

First, the result that matters most for this article: **both frameworks now compile successfully for Cloudflare Workers with environment bindings**. The Elysia build used its experimental `CloudflareAdapter` and `cloudflare:workers`; the Hono build used its documented [`c.env` binding API](https://hono.dev/docs/getting-started/cloudflare-workers#bindings). Wrangler's dry-run output produced these bundle sizes:

| Framework | Gzip bundle |
| --------- | ----------: |
| Elysia    |  155.03 KiB |
| Hono      |   15.39 KiB |

I also ran a small handler-dispatch benchmark: 25,000 warm-up requests followed by seven runs of 250,000 requests to a dynamic `hello/:name` route. These are the median results:

| Runtime | Elysia requests/second | Hono requests/second |
| ------- | ---------------------: | -------------------: |
| Node    |                653,565 |              686,000 |
| Bun     |              5,047,077 |            1,205,095 |

Treat those numbers as a framework dispatch microbenchmark, not as production throughput. It excludes Astro, the network, Cloudflare's runtime, cold starts, and application work. The useful conclusion is that both are fast enough for my tiny API, Elysia benefits enormously from Bun, and Hono produced a much smaller Cloudflare bundle in this test.

## Conclusion

The migration from Elysia to Hono was relatively painless and solved my specific issue with accessing environment variables in Cloudflare Pages. Today, both frameworks have documented Astro and Cloudflare paths, so the limitation that triggered my migration is no longer a fair summary of Elysia as a whole.

If you're building an Astro site with a handful of API routes, start by asking whether Astro's built-in endpoints are enough. If you do want a framework, Hono remains my default for Astro on Cloudflare because its binding model is direct, its Worker integration is mature, and it produced the smaller bundle here. Elysia is now a credible option too, especially when Bun performance and its end-to-end type system matter more to you, but its Cloudflare adapter is still documented as experimental.

Sometimes the best technical decisions come from experimentation rather than strict necessity. And I do like to experiment with new technologies, so I'm glad I went through this experience.

As a closing note, I'm extremely bullish on [Bun](https://bun.sh/) as a JavaScript runtime. Its built-in HTTP server capabilities are becoming increasingly powerful with each release, potentially making it a compelling alternative to dedicated frameworks like Elysia or Hono (or even Vite for that matter) for certain use cases. As Bun continues to mature, we might find ourselves reaching for these frameworks less often, especially for simpler API routes. That said, the ecosystem around Bun is thriving precisely because of innovative frameworks like these, and I'm excited to see how they all evolve together.
