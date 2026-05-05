---
title: "parrot"
description: "A hassle-free, highly performant, host-it-yourself Discord music bot built with Serenity in Rust, powered by yt-dlp."
tags: ["Rust", "Discord", "Serenity", "yt-dlp"]
repoURL: "https://github.com/aquelemiguel/parrot"
date: "2022"
---

When Discord's biggest music bots started shutting down one after the other in 2021 over copyright pressure, the obvious move for most servers was to find a hosted replacement. We took the opposite path and built our own: [parrot](https://github.com/aquelemiguel/parrot), a small, fast, host-it-yourself Discord music bot designed to do one thing well - play audio from anywhere yt-dlp can reach, with as little ceremony as possible.

![parrot logo](logo.png)

Written in Rust on top of [Serenity](https://github.com/serenity-rs/serenity) and [Songbird](https://github.com/serenity-rs/songbird), parrot is built around the idea that a self-hosted bot should be a single binary with a `.env` file, not a service. A single `docker run` and you have a working bot. The codebase is small enough that new contributors can find their way around quickly, which is part of why it has kept growing.

It has been a long-running collaboration with [@aquelemiguel](https://github.com/aquelemiguel) and [@joao-conde](https://github.com/joao-conde), focused on keeping the surface area small while staying responsive to the kinds of edge cases real Discord servers run into - flaky network conditions, large queues, abusive inputs. Source on [GitHub](https://github.com/aquelemiguel/parrot).
