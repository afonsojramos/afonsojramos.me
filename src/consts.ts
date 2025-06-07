import type { Metadata, Site, Socials } from "~/types/site";

export const SITE: Site = {
  name: "afonso jorge ramos",
  jobTitle: "Product-Minded Software Engineer",
  email: "afonsojorgeramos@gmail.com",
  website: "https://afonsojramos.me",
  about: [
    "Product-minded Software Engineer, passionate about crafting the best products and experiences. Deeply committed to open source - not just as code, but as a philosophy of knowledge sharing, mentorship, and collective growth. This collaborative mindset and dedication to continuous learning defines both my professional work and personal approach to life.",
  ],
  numPostsOnHomepage: 3,
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
