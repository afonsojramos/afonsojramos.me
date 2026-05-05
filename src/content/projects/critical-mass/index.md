---
title: "critical mass portugal"
description: "The official site for Critical Mass Portugal - a grassroots cycling movement reclaiming city streets and advocating for safer, more bike-friendly cities."
date: "2024-09-01"
demoURL: "https://criticalmass.pt"
repoURL: "https://github.com/afonsojramos/critical-mass"
tags: ["Astro", "TailwindCSS", "i18n", "Cloudflare", "Civic"]
---

[Critical Mass](<https://en.wikipedia.org/wiki/Critical_Mass_(cycling)>) is a worldwide movement, born in San Francisco in 1992, where cyclists meet on the last Friday of every month and ride together through city streets. Not a protest, a celebration - and an obvious-once-you-see-it argument that bicycles are real urban transportation, not toys. In Portugal it runs in Porto, Lisboa, Coimbra, and a growing list of smaller cities, organised entirely by volunteers, and until recently every chapter ran on its own scattered Instagram pages and WhatsApp groups.

![Cyclists at Critical Mass Portugal 2025](critical-mass-2025.jpg)

[criticalmass.pt](https://criticalmass.pt) is the home I built for the whole movement: a single bilingual (PT/EN) site that lists every city's monthly ride, surfaces upcoming events, hosts blog posts about cycling advocacy, and gives organisers a non-technical way to keep their content fresh. Built with Astro and TailwindCSS, internationalised via [Paraglide.js](https://inlang.com/m/gerre34r/library-inlang-paraglideJs) for type-safe translations. Content management started on [Sveltia CMS](https://github.com/sveltia/sveltia-cms) and recently migrated to [emdash](https://blog.cloudflare.com/emdash-wordpress/), Cloudflare's new WordPress-style publishing platform, so contributors can edit through a friendly UI without ever touching git directly. Deployed to Cloudflare for fast edge rendering anywhere in the country.

The repo is open at [github.com/afonsojramos/critical-mass](https://github.com/afonsojramos/critical-mass) - community pull requests for new cities and ride reports very welcome.
