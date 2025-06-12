---
title: "Elysia vs Hono: API Handlers in Astro with Cloudflare"
description: Exploring the nuances of API frameworks in Astro when deployed to Cloudflare Pages and the challenges of accessing environment variables
slug: elysia-vs-hono-astro-cloudflare
date: 11 March 2025
---

When building a modern web application with Astro, one of the first decisions you'll face is how to handle API routes. If you're like me and enjoy the benefits of type safety and developer experience, you've probably considered using either Elysia or Hono - two popular Bun-first API frameworks that have gained significant traction in the TypeScript ecosystem.

I recently went through the process of migrating (on the same day 😅) from [Elysia](https://elysiajs.com/) to [Hono](https://hono.dev/) for my personal website, and I wanted to share my experience, particularly when deploying to Cloudflare Pages and dealing with environment variables.

## The Initial Setup: Elysia

Let me be honest upfront - I didn't strictly *need* a framework for my simple API routes. Astro's built-in API functionality would have been perfectly adequate for my use case. But as developers, we often choose technologies not just for practical reasons, but also for the sake of experimentation and learning. I wanted to try something new and see what these Bun-optimized frameworks had to offer.

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

## The Cloudflare Challenge

Cloudflare Pages uses a runtime environment that differs from your local development setup. One key difference is how environment variables are accessed. In Cloudflare, environment variables are not directly available through `process.env` but are instead passed through the request context, which means that it is not globally available like in your local development environment.

With Elysia, I couldn't find a clean way to access the Cloudflare runtime context and pass it to my API handlers. My Last.fm API key was stored as a Cloudflare secret, which then is available as an environment variable, but my handlers couldn't access it because Elysia's `handle` method only accepts the request object, not the full Astro context.

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

Is my codebase heavily tied to Cloudflare Pages? A bit, but I'm okay with that. Moving from it, if I wore to move away from the amazing Cloudflare experience that I've been enjoying, would still be easier than the migration from NextJS (with CSS Modules) to Astro.

## Performance Considerations

Both Elysia and Hono are incredibly fast frameworks, optimized for Bun and modern JavaScript runtimes. In my testing, I couldn't notice any significant performance difference between them for my use case.

Elysia claims to be faster in benchmarks, but Hono's flexibility with context handling made it the better choice for my Cloudflare deployment. As with most performance comparisons, your mileage may vary depending on your specific requirements.

Additionally, it's worth noting that [Cloudflare Workers uses the V8 JavaScript engine](https://developers.cloudflare.com/workers/runtime-apis/web-standards/) (not even Node.js), which means we're running in a different environment than what these Bun-optimized frameworks were primarily designed for. Currently, if I wanted a true Bun runtime in production, I'd need to deploy a Docker container on a platform like [fly.io](https://fly.io/), which adds complexity I'd rather avoid, or [Render](https://render.com/), a platform that I don't really like. Cloudflare's simplicity and performance make it worth adapting my framework choice.

## Conclusion

The migration from Elysia to Hono was relatively painless and solved my specific issue with accessing environment variables in Cloudflare Pages. While both frameworks seem to be excellent choices for building API routes in Astro, Hono's approach to context handling makes it particularly well-suited for Cloudflare deployments.

If you're building an Astro site with API routes and planning to deploy to Cloudflare Pages, I recommend not using a framework at all, but if you want to use one, I recommend starting with Hono to avoid the limitations I encountered. The ability to pass the full runtime context to your handlers will save you time and frustration down the road.

Sometimes the best technical decisions come from experimentation rather than strict necessity. And I do like to experiment with new technologies, so I'm glad I went through this experience.

As a closing note, I'm extremely bullish on [Bun](https://bun.sh/) as a JavaScript runtime. Its built-in HTTP server capabilities are becoming increasingly powerful with each release, potentially making it a compelling alternative to dedicated frameworks like Elysia or Hono (or even Vite for that matter) for certain use cases. As Bun continues to mature, we might find ourselves reaching for these frameworks less often, especially for simpler API routes. That said, the ecosystem around Bun is thriving precisely because of innovative frameworks like these, and I'm excited to see how they all evolve together.
