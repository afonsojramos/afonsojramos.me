import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import tailwind from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://afonsojramos.me",
  integrations: [mdx(), sitemap(), solid()],

  redirects: {
    "/atom.xml": "/rss.xml",
    "/rss": "/rss.xml",
    "/blog/01-opening-remarks": "/blog/opening-remarks",
    "/blog/02-spicetify": "/blog/spicetify-open-source-journey",
    "/blog/03-wasm-genai": "/blog/wasm-genai",
    "/blog/04-prompt-engineering": "/blog/prompt-engineering",
    "/blog/05-elysia-vs-hono": "/blog/elysia-vs-hono-astro-cloudflare",
    "/blog/06-apple-reminders": "/blog/todo-sync-with-apple-reminders-and-outlook",
    "/blog/07-framework-defined-infrastructure": "/blog/framework-defined-infrastructure",
    "/blog/08-accidental-homelab": "/blog/accidental-homelab",
    "/blog/09-relentless-by-default": "/blog/relentless-by-default",
  },

  vite: {
    plugins: [tailwind()],
  },

  adapter: cloudflare({
    imageService: "compile",
  }),

  image: {
    domains: ["i.scdn.co", "res.cloudinary.com"],
  },

  output: "server",
});
