---
title: "How to Sync Apple Reminders with Android (When You're Hooked on the Menubar)"
description: "Learn how to sync Apple Reminders with Android using Microsoft as a bridge solution. Perfect for users committed to reminders-menubar on Mac who need occasional Android access. Includes setup steps, limitations, and honest assessment of sync delays and notification quirks."
slug: todo-sync-with-apple-reminders-and-outlook
date: 23 September 2025
---

If you're like me and have discovered [`reminders-menubar`](https://github.com/DamascenoRafael/reminders-menubar), you know exactly why leaving Apple Reminders isn't an option. This open-source menubar app transforms Apple's basic reminder system into something genuinely great - instant access with a keyboard shortcut, natural language input, and that satisfying feeling of capturing tasks without breaking your flow. And I've looked at other options, but nothing else comes close to the seamlessness of reminders-menubar on macOS, even if you're willing to pay (and I'm not).

The problem? I also use an Android phone. And Apple Reminders doesn't exactly play nice outside the walled garden.

So here's my situation: I'm completely sold on the workflow that reminders-menubar provides on my Mac. It's become part of how I think about task management - quick capture, always visible and with number that I hold myself accountable to. But when I pick up my Android phone, those reminders might as well not exist, or I might need to mimic them in another app - which was Google Keep for a while, but I kept forgetting to check it.

Let me be honest upfront - the solution I'm about to share isn't perfect. It does involve using Microsoft as a middleman, but if you're committed to staying with Apple Reminders because of `reminders-menubar` - like I am - this is currently your best option for Android access.

## Why Reminders-Menubar Changes Everything

Before we dive into the Android sync solution, let me explain why I'm going through this trouble instead of just switching to Todoist or Microsoft To Do.

Reminders-menubar is a lightweight Mac app that lives in your menubar and gives you instant access to Apple Reminders. Hit Option-Command-R (or whatever shortcut you configure), type "call mom tomorrow at 2pm," hit enter, and you're done. No opening apps, no clicking through menus, no friction.

The magic is that it uses Apple's native EventKit framework, so everything syncs perfectly with iCloud. Your reminders appear instantly on your iPhone, iPad, and Apple Watch (even if in my case I only have my Mac). At the end of the day, it's free, it's fast, and it just works. Which is exactly why I don't want to give it up just so I can have the same ToDos on my phone.

## The Microsoft Bridge Solution

Here's the workaround: we're going to use Microsoft's ecosystem to bridge Apple and Android. Microsoft Outlook can sync with Apple Reminders on iOS, and Microsoft To Do can access those same reminders on Android.

Think of Microsoft as the translator standing between two ecosystems that refuse to talk to each other.

## Setting It Up

The setup is surprisingly straightforward, even if the underlying architecture feels a bit convoluted.

#### macOS Setup

First, we need to configure your Mac to sync Apple Reminders with Microsoft:

1. Open macOS System Settings → Internet Accounts
2. Add your Microsoft account if it's not already there
3. Make sure "Reminders" is checked in the account services
4. That's it! Nothing else to configure here.

#### iOS Setup

On your iPhone or iPad:

1. Open iOS Settings → Apps → Reminders
2. Tap Reminders Accounts → Add Account
3. Add your Microsoft Outlook account
4. Ensure the "Reminders" toggle is ON
5. That's it! Nothing else to configure here.

This creates the bridge so that reminders created through reminders-menubar (or the native Reminders app) sync to Microsoft's servers.

#### On Your Android Device

Install Microsoft To Do from the Play Store and sign in with the same Microsoft account. That's it. Your reminders should start appearing shortly. And since you're using Microsoft To Do, you can actually use other platforms that integrate with it, such as Samsung's native Reminder app.

## The Only Downside Is Actually An Upside

Here's the one quirk you should know about: when a reminder's alarm fires, it rings on BOTH devices. And dismissing it on one device doesn't dismiss it on the other.

Set a reminder for 3 PM, and at 3 PM both your iPhone and Android buzz. Dismiss it on Android, and your iPhone keeps nagging. This is particularly noticeable with recurring reminders (not that I have daily reminders that bug me on multiple devices simultaneously 🫣, but still).

This happens because each platform maintains its own notification state. The reminder data syncs perfectly, but the "I've handled this" status doesn't.

But here's the thing - I've actually started to appreciate this "bug" as a feature. It's pretty hard to miss an important reminder when two devices are insisting you pay attention to it. For truly important deadlines or time-sensitive tasks, having that redundant notification system isn't the worst thing in the world - we're talking about reminders, after all.

## The Bigger Picture

What strikes me about this whole situation is how it highlights the state of cross-platform compatibility in 2025. We're still using workarounds and compromises to make basic productivity tools work across ecosystems.

Apple's walled garden provides genuine benefits - the integration really is excellent when you stay inside it. But it punishes flexibility. The fact that a free, open-source Mac app (reminders-menubar) can make Apple's basic reminder system more compelling than premium cross-platform alternatives says something about the value of deep platform integration, as well as the imense capabilities of open-source software.

Microsoft, ironically, has positioned themselves as the peace broker by building quality apps on both platforms and enabling sync between them. For now, if you need Apple Reminders on Android like me - especially if reminders-menubar is part of why you're committed to Apple's ecosystem - this Microsoft bridge approach is your best bet.

Is it elegant? No. Does it preserve the workflow that makes reminders-menubar so valuable? Absolutely. And honestly, once you get it set up, you'll forget about the Microsoft middleman entirely - it just works seamlessly in the background while you focus on actually getting things done.
