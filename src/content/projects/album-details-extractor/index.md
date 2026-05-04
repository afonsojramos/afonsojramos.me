---
title: "album details extractor"
description: "Five-interface tool that extracts album metadata from Spotify, Apple Music, Tidal, Deezer, Qobuz, and Bandcamp into a compact JSON object on your clipboard — extension, bookmarklet, CLI, and Spicetify."
date: "2021-11-21"
repoURL: "https://github.com/afonsojramos/album-details-extractor"
tags: ["TypeScript", "Browser Extension", "Spicetify", "MV3"]
icon: "./logo.png"
---

Right-click any album, get clean JSON in your clipboard. That's the whole product:

```json
{
  "title": "Currents",
  "artist": "Tame Impala",
  "image": "https://image-cdn-ak.spotifycdn.com/image/...",
  "url": "https://open.spotify.com/album/79dL7FLiJFOO0EoehUHQBv"
}
```

My [/music](/music) page is the running list of albums I have listened to and loved — partly automated, partly hand-curated. The friction of capturing the title, artist, cover, and canonical URL each time I wanted to add one was exactly the kind of annoyance that a small tool can fix. The output is the same shape no matter which store you started from, so the destination — a music page, a blog post, a `music.json` file — does not care.

There are five ways to trigger it, all wrapping the same extractor core:

- **Browser extension** (Chrome and Firefox, MV3) — right-click any album link anywhere on the web, or use the toolbar button when on an album page
- **Bookmarklet** — single-line `javascript:` URL, zero install, works on any browser
- **Standalone CLI** — single-file binary, no runtime, prints JSON to stdout
- **[Spicetify](/projects/spicetify) extension** — adds the menu entry inside Spotify desktop's native right-click

Supported sources: **Spotify**, **Apple Music**, **Tidal**, **Deezer**, **Qobuz**, and **Bandcamp**. Adding a new one is one file in `src/shared/sources/` plus a registration line — every interface picks it up automatically.

Source at [github.com/afonsojramos/album-details-extractor](https://github.com/afonsojramos/album-details-extractor). The browser extension is on [Mozilla Add-ons](https://addons.mozilla.org/en-GB/firefox/addon/album-details-extractor/) for Firefox and the [Chrome Web Store](https://chromewebstore.google.com/detail/album-details-extractor/kfpkjhjengocbiaipfcbdhpjbaenkanb) for Chromium.
