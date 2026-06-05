# gouru.com

Marketing website for **Gouru & Co. LLC** — a software company building modern,
dependable tools for the real estate industry.

Built as a fully static site: fast, no backend, no tracking, self-hosted fonts.

## Stack

- **[Astro](https://astro.build)** — static site generator (outputs plain HTML)
- **[Tailwind CSS v4](https://tailwindcss.com)** — styling, via the Vite plugin
- Self-hosted brand fonts (Neue Montreal + Giaza), no third-party requests
- Deploys to **GitHub Pages** via GitHub Actions on every push to `main`

## Running it locally

You need [Node.js](https://nodejs.org) 20+ installed.

```bash
npm install      # one-time: install dependencies
npm run dev      # start a local preview at http://localhost:4321
npm run build    # produce the static site in dist/
npm run preview  # preview the built site
```

## Editing content

Everything is plain text — no database.

| What you want to change | Where |
| --- | --- |
| Legal name, email, tagline, "last updated" date | `src/consts.ts` (single source of truth) |
| Home page | `src/pages/index.astro` |
| About page (incl. optional founder block) | `src/pages/about.astro` |
| Platform page | `src/pages/platform.astro` |
| Contact page | `src/pages/contact.astro` |
| Privacy / Terms | `src/pages/privacy.astro`, `src/pages/terms.astro` |
| Header / footer (shared on every page) | `src/components/Header.astro`, `Footer.astro` |
| Colors, fonts, base styles | `src/styles/global.css` |

> **Important:** the legal entity name (`Gouru & Co. LLC`) is defined **once**
> in `src/consts.ts` and imported everywhere. Never hardcode it on a page — edit
> it there so it can never drift between pages.

### The optional founder block

In `src/pages/about.astro`, set `showFounder = true` and fill in the name, role,
and bio to publish it. Leave it `false` to omit the block entirely.

## Brand assets

- Source brand files live in `fonts/` and `logos/`.
- The web-optimized versions actually served by the site live in `public/`
  (subsetted `.woff2` fonts, favicons, the social/OG preview image, header mark).

## Deploying

See **[DEPLOY.md](DEPLOY.md)** for a complete, non-developer, step-by-step guide
to publishing this at gouru.com with HTTPS.
