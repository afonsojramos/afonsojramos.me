import type { Metadata, Site, Socials } from "~/types/site";

export const SITE: Site = {
  name: "afonso jorge ramos",
  jobTitle: "senior product-minded software engineer",
  email: "afonsojorgeramos@gmail.com",
  website: "https://afonsojramos.me",
  about: [
    "Product-minded software engineer and tech lead. Most of my work is full-stack TypeScript, and I'm framework-agnostic: most at home in React, but just as comfortable shipping in Svelte, Solid, Vue, or Angular. I ship across languages just as readily: I core-maintain Spicetify, a Go CLI with 20M+ downloads and 23k+ GitHub stars, and I brought macOS support to qbz, a bit-perfect hi-fi audio player written in Rust, upstreaming fixes to it and to the Rust audio crates it builds on, like coreaudio-rs and notify-rust.",
    "A growing part of how I work is AI-augmented: I ship confidently with AI coding agents, which is how much of my <a href='https://github.com/afonsojramos' class='underline underline-offset-2 hover:no-underline'>recent open-source work</a> gets built, faster and across more languages than I would manage alone. I also write about prompt engineering and GenAI for the CNCF and YLD blogs.",
    "Deeply committed to open source - not just as code, but as a philosophy of knowledge sharing, mentorship, and collective growth. This collaborative mindset and dedication to continuous learning defines both my professional work and personal approach to life.",
  ],
  skills: [
    {
      category: "languages",
      items: ["TypeScript", "JavaScript", "Go", "Rust", "Java", "SQL"],
    },
    {
      category: "frontend",
      items: [
        "React",
        "React Native",
        "Next.js",
        "Svelte",
        "Solid",
        "Vue",
        "Angular",
        "Astro",
        "TanStack",
        "Tailwind",
      ],
    },
    {
      category: "backend",
      items: ["Node.js", "NestJS", "Apache Kafka", "Microservices"],
    },
    {
      category: "platform",
      items: ["AWS", "GCP", "Azure", "Kubernetes", "Terraform", "Cloudflare", "CI/CD", "Docker"],
    },
    {
      category: "ai engineering",
      items: [
        "RAG",
        "Embeddings / vector search",
        "Agentic systems & tool use",
        "WASM / edge inference",
        "Prompt engineering",
      ],
    },
    {
      category: "ai workflow",
      items: [
        "AI coding agents",
        "Subagents",
        "Git worktrees",
        "MCP",
        "Spec-driven dev",
        "AI code review",
      ],
    },
  ],
  numPostsOnHomepage: 4,
  numWorksOnHomepage: 2,
};

export const HOME: Metadata = {
  title: "home",
  description: SITE.about[0],
};

export const BLOG: Metadata = {
  title: "blog",
  description: "A collection of articles on topics I am passionate about.",
};

export const WORK: Metadata = {
  title: "work",
  description: "Where I have worked and what I have done.",
};

export const PROJECTS: Metadata = {
  title: "projects",
  description: "Products, open-source tools, and small experiments I have made over the years.",
};

export const MUSIC: Metadata = {
  title: "music",
  description: "Collection of favorite albums and concerts throughout the years.",
};

export const NOT_FOUND: Metadata = {
  title: "404",
  description: "Page not found. The page you're looking for doesn't exist.",
};

export const SOCIALS: Socials = [
  {
    name: "email",
    href: `mailto:${SITE.email}`,
    value: SITE.email,
  },
  {
    name: "github",
    href: "https://github.com/afonsojramos",
    value: "@afonsojramos",
  },
  {
    name: "linkedin",
    href: "https://www.linkedin.com/in/afonsojramos",
    value: "/in/afonsojramos",
  },
  {
    name: "meet me",
    href: "https://cal.com/afonsojramos",
    value: "cal.com/afonsojramos",
  },
  {
    name: "bluesky",
    href: "https://bsky.app/profile/afonsojramos.me",
    value: "@afonsojramos.me",
  },
];
