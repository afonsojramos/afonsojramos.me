---
title: "qbz"
description: "macOS support for qbz, a native, bit-perfect hi-fi Qobuz desktop player written in Rust on Tauri."
date: "2026-04-04"
repoURL: "https://github.com/vicrodh/qbz"
demoURL: "https://qbz.lol"
tags: ["Rust", "Tauri", "macOS", "CoreAudio", "Audio"]
---

[qbz](https://qbz.lol) is a native, bit-perfect hi-fi player for [Qobuz](https://www.qobuz.com), built in **Rust** on top of **Tauri**. It started life as a Linux-only app. I brought it to **macOS**.

![qbz home screen running on macOS](qbz-home.avif)

Most of the work was the kind you only notice when it is wrong. Real **CoreAudio** output with device probing and sample-rate switching, so playback stays bit-perfect end to end. Hunting down a track-change crackle that turned out to be a buffer handover bug. Deep links for `qobuzapp://`, native notifications with album artwork, `x86_64` cross-compilation for Intel Macs, and ad-hoc signing so Gatekeeper stops rejecting the bundle. Each one is small on its own; together they are the difference between "compiles on macOS" and "feels native on macOS".

Some of it pushed one layer down, into the crates qbz is built on. macOS sample-rate switching needed device-rate enumeration that [`coreaudio-rs`](https://github.com/RustAudio/coreaudio-rs) did not expose, so I [added it there](https://github.com/RustAudio/coreaudio-rs/pull/149). Album artwork in notifications needed [`notify-rust`](https://github.com/hoodie/notify-rust) to accept an image path, so I [added that too](https://github.com/hoodie/notify-rust/pull/264). For a while qbz ran on my forks of both; once the changes were released, it went back to the published crates.

Almost all of the app-level work landed **upstream** in [vicrodh/qbz](https://github.com/vicrodh/qbz) across a few dozen merged pull requests, starting with [the initial macOS support PR](https://github.com/vicrodh/qbz/pull/181). Working in someone else's audio codebase, in Rust, on a platform it was never written for, was a good reminder of how much careful work sits underneath the word "port".
