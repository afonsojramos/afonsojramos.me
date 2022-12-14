---
title: Spicetify - An open-source journey
description: How did I get to be one of the core maintainers of Spicetify? Let's find out!
slug: spicetify-open-source-journey
date: 12 December 2022
---

According to my Telegram messages, it all started around February 2020, when I found out about Spicetify through some random Reddit post in the illustrious [r/unixporn](https://www.reddit.com/r/unixporn/) - a subreddit where the highest tier of nerds share their Unix setups and configs - and I was immediately intrigued. I had been using Spotify for a while, but even though the UI is not **awful**, they do have some very anti-user behaviours. Initially, I was simply a user, but then ideas to improve it started coming up, such as [spicetify-cli#247](https://github.com/spicetify/spicetify-cli/issues/247). Since Spotify's release "notifications" were practically useless, and they still are to this day **[1]**, the [New Releases Custom App](https://spicetify.app/docs/advanced-usage/custom-apps#new-releases) quickly became one of my favourite Spicetify features.

> **[1]** They did do **something** on mobile, but if you follow more than 30 artists the list gets pretty polluted with singles. The only filter available is either Music or Podcasts, which is not very useful. And I mostly listen to Spotify on my PC anyway, so it doesn't really matter.

Spicetify's core, what we call [spicetify-cli](https://github.com/spicetify/spicetify-cli), is a Command-line Interface (CLI) tool that runs on top of Spotify's binaries mutating them through regex matching to allow for the promised customisation. It is written in Go, which is a highly performant language that I learnt a couple of years before to give a [workshop](https://github.com/afonsojramos/competitive-programming/blob/master/advent-of-code/2018/go-guide.md) (that is likely to be slightly out of date) on it at [IEEE University of Porto Student Branch](https://ieee.fe.up.pt/), a student branch of the IEEE that I was a member of at the time - and later was elected Vice-President for a year.

With time, I started helping out more and more both in handling issues, developing small features, and keeping the latest Spotify version supported **[2]**, and eventually [khanhas](https://github.com/khanhas) made me a maintainer on GitHub. In late 2021, Spicetify's popularity truly blew up and we had to start handling a lot more issues and pull requests, which was a very exciting time for me. However, it was also the last time we saw khanhas, as he decided to leave the project and focus on other things.

> **[2]** Spotify releases most of the times do not break the CLI itself, but when they do it is because we need to apply updates to the regexes that match the Spotify binaries. This is a very tedious process, but it is crucial to keep the CLI working.

It was September 2020 when I started working full-time, but it was in 2022 that my workload, other side-projects and overall life started pilling up a bit more, and, eventually, I noticed myself not being able to dedicate as much time to Spicetify as I would have liked. This is when I shifted to a more managerial role, where I would help out with the more complex issues, but also help out with the more mundane tasks, such as reviewing pull requests and merging them. I also created the [Spicetify Documentation](https://spicetify.app) website, which is a very important part of the project, as it is the first place people look at when they want to customise their Spotify, unlike previously when people could only look at GitHub's wiki, which is not very user-friendly for newcomers. And also created the [Spicetify GitHub organisation](https://github.com/spicetify), which is where all the repositories are hosted since previously all repositories were hosted across several different contributors' accounts.

![Spicetify Docs Visitors](/blog/spicetify-visitors.png)

Overall, it has been quite a ride, but seeing +100K downloads per release and over 200K unique visitors per month is a very rewarding feeling. I am very grateful to all the contributors, users and maintainers that have helped out in this journey, and I hope that we can continue to make Spicetify better and better.
