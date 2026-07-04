---
company: "BPP (via YLD)"
dateStart: "2024-09-01"
role: "Principal Software Engineer - Tech Lead"
shortDescription: "Leading technical modernization efforts at BPP, including a unified React Native mobile app, multi-platform communication service, and full-stack tutor portal, while inheriting and maintaining critical backend services."
tags:
  [
    "React Native",
    "Expo",
    "TanStack Router",
    "Full-Stack",
    "System Architecture",
    "CI/CD",
    "Team Leadership",
    "Mobile Development",
    "Terraform",
    "Observability",
  ]
url: "https://www.bpp.com"
---

- Led the mobile modernization, replacing BPP's legacy Hub app with a single React Native and Expo app for **30k+ learners** to view course information, register attendance, and manage their profiles. Unified the iOS and Android codebases in two quarters and delivered a **150% session-duration improvement** by reworking core navigation for a more intuitive, crash-free experience.

- Built the **Tutor Portal** from the ground up, turning a manual, error-prone attendance process into a full platform: a Next.js app with **QR-code check-in** for in-person sessions and automated online-classroom capture, stitched together by event-driven serverless pipelines (EventBridge, SQS, Lambda) that reconcile records and post attendance back to Salesforce.

- Spotted a major opportunity in the mobile **timetable**, so I built [**super-calendar**](https://super-calendar.afonsojramos.me) on my own time, a gesture-driven React Native and web calendar with pinch-to-zoom and virtualized rendering, then brought it into BPP as the app's calendar engine and open-sourced it.

- Delivered a **multi-platform communications service** for real-time notifications and in-app messaging across the app and portals, and took ownership of inherited serverless GraphQL backends (DynamoDB, EventBridge), shipping the **academic appeals** flow end to end while modernising legacy code for reliability.

- Drove a platform-wide **reliability and delivery** push: New Relic dashboards and alerts codified as Terraform, self-hosted **expo-updates** infrastructure for over-the-air releases, PII redaction, diagnosable queue failures, and CI hardening (SHA-pinned actions, yarn-to-pnpm and jest-to-vitest migrations, ephemeral-env reapers).
