// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// `site` is the canonical production URL. It is used for canonical tags,
// Open Graph URLs, and the sitemap. Keep it in sync with public/CNAME.
export default defineConfig({
  site: "https://gouru.com",
  // GitHub Pages serves directory-style URLs (e.g. /about/). Trailing
  // slashes keep internal links and the deployed paths in agreement.
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
