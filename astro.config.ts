import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import tailwind from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://afonsojramos.me",
  integrations: [mdx(), sitemap(), solid()],

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
