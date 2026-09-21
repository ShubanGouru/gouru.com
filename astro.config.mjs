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
  // /platform/ described the former software business and no longer exists.
  // A static build emits a meta-refresh page here, so the old URL still
  // lands somewhere useful instead of 404ing for anyone holding the link.
  redirects: {
    "/platform": "/",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
