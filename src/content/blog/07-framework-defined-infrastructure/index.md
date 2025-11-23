---
title: "The Abstraction Imperative: Why Framework-Defined Infrastructure is the Next Step in Software Evolution"
description: "Every major leap in software development has followed the same pattern: we abstract away complexity that no longer needs manual attention. Framework-defined infrastructure isn't just another deployment strategy, it's the continuation of a decades-long trajectory toward letting developers focus on what actually matters."
slug: framework-defined-infrastructure
date: 22 November 2025
---

Every major leap in software development has followed the same pattern: we abstract away complexity that no longer needs manual attention. [Framework-defined infrastructure](https://vercel.com/blog/framework-defined-infrastructure) is not merely another deployment strategy; it is the logical continuation of a decades-long trajectory allowing developers to focus on the problem, not the plumbing. At no point in this blog post will I argue that we don't need plumbers. Instead, I will argue that we should worry less about plumbing by trusting well-tested abstractions that others have carefully refined over time.

## The History of Software is the History of Abstraction

In the 1950s, programmers wrote in machine code, toggling switches to represent binary instructions. Assembly language abstracted machine code. High-level languages like C abstracted assembly. Garbage collection abstracted memory management. Virtual machines abstracted operating systems. Cloud computing abstracted physical hardware.

Each abstraction faced resistance. *"Real programmers"* supposedly needed direct memory access. Garbage collection was *"too slow"* for serious applications. Virtual machines added *"unnecessary overhead."* Cloud computing meant *"losing control."*

In each case, the abstraction became dominant, though not universal. Not because it was perfect, but because it let most developers solve most problems at a higher level. Assembly still exists for embedded systems, manual memory management remains critical for certain performance-sensitive applications, and some organizations still run their own data centers. The question was never whether to abstract completely, but when the abstraction became **good enough** to trust **for the majority of use cases**.

## Where We Are Now: The Infrastructure Abstraction Gap

Modern application development has reached an inflection point. We've abstracted nearly everything about software except how we deploy it.

The move to web applications itself represents a massive abstraction, instead of writing platform-specific native code for Windows, macOS, Linux, iOS, and Android, developers write once for the browser and let the browser handle platform differences. APIs and microservices abstracted monolithic architectures. Containerization abstracted runtime environments. The pattern is consistent: each generation removes another layer of manual platform-specific work.

Yet deployment remains stubbornly manual. We've moved beyond FTPing files to servers, yes, but consider a typical web application today. Developers write code using framework conventions, routes, components, server functions, middleware. But when deployment time comes, they must translate these high-level concepts into low-level infrastructure primitives: Lambda functions, API Gateways, load balancers, CDN configurations, caching layers.

This translation layer is where things break down. As the evolution of Platform as a Service (PaaS) has shown, [the progression from bare metal to virtualized infrastructure represents "the evolutionary nature" of modern software](https://dzone.com/articles/platform-as-a-service-paas-origins-and-architectur). Yet even with traditional PaaS offerings, developers still face somewhat of a gap between application code and infra configuration.

With traditional Infrastructure as Code (IaC) approaches, you write a server-side rendering function in your framework, then spend hours configuring the serverless function, its memory limits, timeout settings, IAM roles, and API Gateway integration. The gap between framework concept and infrastructure primitive remains stubbornly manual. Terraform fatigue is real. 

## Framework-Defined Infrastructure Closes the Gap

Framework-defined infrastructure eliminates this translation layer by making the framework itself the interface for infrastructure decisions. As [Vercel describes it](https://vercel.com/blog/framework-defined-infrastructure), *"the deployment environment automatically provisions infrastructure derived from the framework and the applications written in it."* The platform reads your framework code and provisions infrastructure automatically based on what it understands your code needs.

This isn't an entirely new concept. In fact, the roots trace back to 2006 when Zimki introduced what Simon Wardley called ["framework-as-a-service"](https://en.wikipedia.org/wiki/Platform_as_a_service), a fascinating early attempt that could have made [Canon one of the first major cloud providers](https://www.porter.run/blog/history-of-paas-how-canon-almost-became-a-major-cloud-provider) before the industry settled on the term Platform as a Service. Though Zimki ultimately closed, [Heroku launched in 2007](https://www.heroku.com/about/) and successfully commercialized this vision with their mantra that developers should "focus on what they do best: building great apps" while the platform handles infrastructure. Heroku's architecture was designed to [remove obstacles so developers can focus on building](https://www.heroku.com/about/) rather than managing servers.

Similarly, Netlify popularized the JAMstack architecture, a term [coined by CEO Mathias Biilmann](https://www.netlify.com/jamstack/), which emphasizes prerendering content and deploying directly to the edge. As Netlify explains, their approach is fundamentally about ["abstraction and simplicity"](https://www.netlify.com/jamstack/), where build automation understands framework patterns and automatically optimizes deployments.

The framework conventions themselves become infrastructure declarations:

- When you export `getServerSideProps` in Next.js, you're declaring that route needs server-side compute
- When you set `output: 'server'` in Astro, you're declaring the entire site needs SSR capabilities
- When you create a `+page.server.ts` in SvelteKit, you're declaring that route requires server-side data loading
- When you use `export const prerender = false` in SolidStart, you're opting that route into dynamic rendering

**The framework has already made the infrastructure decision, it just needs a platform that understands it.** This isn't magic. It's pattern recognition applied to infrastructure. Frameworks impose structure and conventions specifically to make code predictable and understandable. Framework-defined infrastructure leverages that predictability to automate infrastructure provisioning the same way frameworks automate application structure.

## Why This Matters Beyond Any Single Platform

**The power of framework-defined infrastructure isn't tied to any particular deployment platform.** Multiple platforms, Vercel, Netlify, Cloudflare Pages, AWS Amplify, Azure Static Web Apps, have independently converged on the same insight: let the framework define infrastructure needs. Though implementations vary in how much configurability they expose, the core principle remains consistent.

This convergence validates the abstraction. Just as multiple operating systems implement virtual memory and multiple languages implement garbage collection, multiple platforms implementing framework-defined infrastructure proves the concept has staying power.

As Vercel notes in their piece on [avoiding vendor lock-in](https://vercel.com/blog/vercel-the-anti-vendor-lock-in-cloud), "Framework conventions like the Next.js App Router, Remix loaders, SvelteKit endpoints, and Nitro storage adapters work differently. You build against the framework, not the platform. Multiple platforms can run the same framework code, keeping your application portable across any infrastructure that supports it."

The competitive advantage shifts from proprietary primitives to better implementations of the same abstraction. Platforms compete on performance, developer experience, observability, and pricing, not on lock-in. In fact, approximately 70% of Next.js applications run outside of Vercel, with companies like Walmart, Nike, and Claude.ai self-hosting at massive scale.

There are legitimate concerns about vendor lock-in when platforms handle multiple aspects of your stack. As one developer [notes](https://gomakethings.com/the-challenge-with-netlify-vercel-cloudflare-and-so-on/), "when one provider handles your hosting, manages automated deployment, runs a few dozen micro-services and serverless APIs, provides your database through their proprietary API, and more, migrating away to somewhere else becomes very expensive." But framework-defined infrastructure actually addresses this concern by keeping the abstraction layer in the open-source framework, not in proprietary platform APIs.

## The Developer Experience Transformation

The real benefit surfaces in daily development work. With framework-defined infrastructure, your local development environment matches production behavior because both run the same framework code. There's no simulation layer, no mocked services, no "works on my machine" debugging.

As Vercel explains, platforms built on vendor primitives need complex simulators for local development, Cloudflare provides Wrangler to simulate Workers locally, AWS developers use LocalStack or SAM CLI to mock Lambda and other services. These tools approximate production behavior but never match it exactly.

This echoes Heroku's original insight: by [abstracting away the underlying infrastructure](https://www.porter.run/blog/what-is-heroku), developers "don't have to worry about anything except for application logic." With framework-defined infrastructure, you test your application by running `next dev` or `remix dev`, the standard framework tooling. What you see locally is what runs in production because the framework, not the platform, defines the behavior.

This eliminates an entire class of problems. You don't need to maintain separate local development simulators like LocalStack or Wrangler. You don't need to keep IaC configurations in sync with application changes. You don't need platform-specific tooling that only half-works on your operating system.

Tools like [SST](https://sst.dev/) represent an interesting middle ground—they use framework conventions to *generate* IaC (CloudFormation/Terraform) rather than bypassing it entirely. This hybrid approach still requires maintaining infrastructure code, but reduces the manual translation burden by inferring infrastructure needs from your application code.

## Abstraction Enables Specialization

Critics worry that abstraction means losing control. But abstraction doesn't eliminate control, it enables specialization.

When you write a Next.js application, you're not locked out of infrastructure. You can still deploy to EC2 and manage every detail if needed. Companies like Walmart and Nike do exactly this at massive scale. The difference is that you can also choose not to, letting platforms that specialize in infrastructure handle those concerns while you specialize in your product.

This is how every successful abstraction works. You can still write assembly if you need to, but most developers rightfully choose to write in higher-level languages and let the compiler handle optimization. You can still manage memory manually, but most developers let garbage collection handle it. You can still provision servers, but most developers let cloud platforms handle it.

As the evolution of cloud computing shows, [PaaS sits between IaaS and SaaS](https://cloud.google.com/learn/paas-vs-iaas-vs-saas) specifically to "abstract infrastructure complexities, allowing developers to focus on building and innovating." Framework-defined infrastructure extends this progression. You can still configure infrastructure manually if you need to, but most developers can let the framework and platform handle it automatically.

## The Economics of Abstraction

Abstractions succeed when the economic value of simplification exceeds the cost of flexibility lost. Framework-defined infrastructure passes this test decisively.

Consider the engineering cost of a typical deployment:

- Writing and maintaining IaC configurations
- Keeping infrastructure in sync with application changes
- Managing environment differences between development and production
- Training new team members on platform-specific tooling
- Debugging issues caused by misconfiguration

Now consider the alternative: writing framework code that automatically deploys correctly. As Vercel found when studying [high-impact web teams](https://vercel.com/blog/accelerating-developer-velocity-and-creating-high-impact-web-teams), "when developers control their entire workflow, teams previously balancing both hardware and software can focus solely on the strategic aspects of product delivery. Conversations shift from 'how' and 'if' to 'what' and 'when,' as infrastructure is no longer an obstacle to launching products."

The reduction in cognitive load, time spent, and error rate represents genuine economic value. A Forrester Total Economic Impact report found that teams using framework-defined infrastructure saw higher customer conversion rates generating $2.6 million in incremental profits and higher website traffic generating $7.7 million in incremental profits.

Netlify's experience with the JAMstack architecture demonstrates similar benefits. By [automating the build and deploy process](https://www.netlify.com/blog/2020/04/01/automate-your-web-workflows-with-the-jamstack/), platforms ensure "code can be shipped with little to no opportunity for error," while the architecture itself is "designed to scale only when needed" rather than requiring premature optimization.

Some applications have special requirements that framework-defined infrastructure doesn't handle well. That's fine. Those applications can opt out and configure infrastructure manually. But for the majority of web applications, the standard patterns that frameworks encode work perfectly, and automating their infrastructure deployment makes obvious economic sense.

## What This Means for the Industry

Framework-defined infrastructure represents a maturation of the platform-as-a-service model. Early PaaS offerings like Heroku abstracted infrastructure but required you to build against their specific deployment model. Modern framework-defined infrastructure abstracts infrastructure while letting you build against open source frameworks.

This distinction matters. When the abstraction layer is proprietary, adoption requires trust in a single vendor. When the abstraction layer is an open source framework, adoption requires trust in the broader ecosystem. The latter scales better.

This is reflected in what Vercel calls their [Open SDK strategy](https://vercel.com/blog/open-sdk-strategy): "We want what we build to work extremely well on Vercel, but not at the cost of lock-in... We will build first on Vercel, where we can iterate fastest to ensure the best end-to-end developer and user experience. And as we become confident projects are mature, we'll invest in ensuring our SDKs and tools are deployable to any platform."

Similarly, Netlify and Cloudflare have [come together to support open frameworks](https://www.netlify.com/blog/supporting-an-open-web-with-netlify-cloudflare/) like TanStack and Astro, recognizing that "a rising tide lifts all boats." As they note, "the strongest projects emerge when multiple organizations align behind shared goals, giving developers the broadest opportunities for success."

We should expect framework-defined infrastructure to become the default deployment model for framework-based applications, just as cloud computing became the default infrastructure model for most applications. Some organizations will continue self-hosting and managing infrastructure directly, just as some organizations still run their own data centers. But the center of gravity will shift.

## The Evolution Continues

The pattern is already extending beyond basic deployment. Vercel's recent introduction of their [Workflow Development Kit](https://vercel.com/blog/introducing-workflow) shows how framework-defined infrastructure concepts apply to durability and long-running processes: "Functions can pause for minutes or months, survive deployments and crashes, and resume exactly where they stopped." Rather than manually configuring message queues and retry logic, developers write standard async functions with durability directives, and [the platform handles persistence automatically](https://vercel.com/blog/introducing-workflow).

Similarly, their [self-driving infrastructure](https://vercel.com/blog/self-driving-infrastructure) initiative explores how production data can inform infrastructure optimization: "Code defines infrastructure, production informs code, and infrastructure adapts automatically." This closes the loop between application behavior and resource allocation without requiring manual intervention.

Vercel's approach to [application-aware routing](https://vercel.com/blog/life-of-a-request-application-aware-routing) demonstrates how deeply framework understanding can integrate with infrastructure: "Vercel uses your framework code to define infrastructure and how requests are handled at runtime. This tight integration gives the platform full visibility into your app's structure: routes, layouts, rewrites, middleware, functions, static assets, and routing logic."

## Conclusion: Abstraction is Inevitable

Software development has always moved toward better abstractions. We abstract when the benefits of simplicity outweigh the costs of lost control, when patterns emerge that are stable enough to codify, when the manual work no longer creates competitive advantage.

Framework-defined infrastructure meets all these criteria. The patterns are stable, server-side rendering, static generation, API routes, and edge middleware aren't going anywhere. The manual work, translating framework concepts to infrastructure primitives, creates no competitive advantage. The simplification, automatic infrastructure from framework code, delivers real value.

As [Heroku's evolution demonstrates](https://blog.heroku.com/modern-web-app-architecture), "ever-increasing complexity means developers need to build and operate more adaptable systems." Framework-defined infrastructure represents exactly this kind of adaptability: composing infrastructure from framework patterns rather than manual configuration.

The question isn't whether framework-defined infrastructure will become standard practice, but how quickly it will happen. Given that multiple platforms have independently adopted similar approaches, given that major companies successfully deploy framework-based applications across different infrastructure models, and given the clear economic benefits, the trajectory seems clear.

Abstractions that work become invisible. In a few years, explaining that you used to manually configure infrastructure for every framework route will sound as strange as explaining that you used to manually manage memory allocation. We'll wonder why we ever did it differently.
