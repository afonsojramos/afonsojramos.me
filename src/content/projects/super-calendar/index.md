---
title: "super-calendar"
description: "A gesture-driven, virtualized month / week / day calendar and date picker for React Native and the web, published to npm and JSR."
date: "2026-06-22"
demoURL: "https://super-calendar.afonsojramos.me"
repoURL: "https://github.com/afonsojramos/super-calendar"
tags: ["React Native", "TypeScript", "Reanimated", "Expo", "Open Source"]
---

Every calendar library I reached for in React Native made the same trade: render every date up front, and pay for it in jank the moment someone starts swiping between months. Building the timetable for [BPP's mobile app](https://www.bpp.com), I kept hitting that wall, so I pulled the calendar out into its own thing and rebuilt it properly. That thing became [super-calendar](https://super-calendar.afonsojramos.me).

It is a generic, themeable **month / week / day** calendar for React Native, a ground-up reimagining inspired by the excellent [`react-native-big-calendar`](https://github.com/acro5piano/react-native-big-calendar). It keeps the familiar month/week/day model but is built around [Reanimated](https://docs.swmansion.com/react-native-reanimated/) and modern list virtualization via [`@legendapp/list`](https://legendapp.com/open-source/list/), trading framework-agnosticism for a richer, gesture-driven experience.

The parts I am most proud of are the ones that are hard to fake: a zoomable week/day grid you can **pinch** on iOS and Android (or Ctrl/Cmd + scroll on web), running entirely on the UI thread with no re-renders. Virtualized, snap-paging months and weeks that stay smooth no matter how far you scroll. Bring-your-own event typing through `CalendarEvent<T>`, a `renderEvent` escape hatch, and a headless `useMonthGrid` hook for anyone who wants to build a fully custom calendar on top of the primitives. It runs on iOS, Android, and web (the web target via [react-native-web](https://necolas.github.io/react-native-web/)).

It ships on both [npm](https://www.npmjs.com/package/@super-calendar/native) and [JSR](https://jsr.io/@super-calendar/native) as `@super-calendar/native`, with a full [documentation site](https://super-calendar.afonsojramos.me), a live web demo, an API reference, and a copy-paste migration guide for anyone coming from `react-native-big-calendar`. It has picked up **150+ stars** in its first weeks and is MIT licensed. Source on [GitHub](https://github.com/afonsojramos/super-calendar).
