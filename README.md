# gouru.com

Public website for **Gouru Capital Partners** — a real estate firm that buys,
improves, and operates small multifamily properties.

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
| Brand name, legal name, email, phone, form key | `src/consts.ts` (single source of truth) |
| **Buy box criteria** and **market tiers** | `src/consts.ts` (`BUY_BOX`, `NOT_A_FIT`, `MARKETS`) |
| Home page | `src/pages/index.astro` |
| Sell to Us page | `src/pages/sell.astro` |
| Invest with Us page, incl. the FAQ | `src/pages/invest.astro` |
| About page | `src/pages/about.astro` |
| Contact page | `src/pages/contact.astro` |
| Privacy / Terms | `src/pages/privacy.astro`, `src/pages/terms.astro` |
| Header / footer (shared on every page) | `src/components/Header.astro`, `Footer.astro` |
| Colors, fonts, base styles | `src/styles/global.css` |

> **Important:** the legal entity name is defined **once** in `src/consts.ts`
> and imported everywhere. Never hardcode it on a page.

> **Open item:** `legalName` is still `Gouru & Co. LLC`, the entity registered
> today. `brandName` is `Gouru Capital Partners`. If GCP becomes its own
> registered LLC, change `legalName` and every legal surface updates at once.
> Do not put an entity name on the site that is not actually registered.

## Forms

The site is static, so there is no server to receive form submissions. All three
forms (seller, investor, contact) post to [Web3Forms](https://web3forms.com),
which emails them to the address the access key is bound to.

- The access key lives in `src/consts.ts` as `web3formsKey`. It is **public by
  design** — Web3Forms describes it as "an alias to your email" — so committing
  it is correct, not a leak. It only permits sending mail to the verified
  address.
- One key serves every form. Forms are told apart in the inbox by the `subject`
  passed to `<FormShell>`.
- Free tier is 250 submissions/month.

All form plumbing lives in `src/components/form/`:

| File | Role |
| --- | --- |
| `FormShell.astro` | The endpoint, access key, honeypot, submit button, status region, and the one script that drives every form |
| `Field.astro` / `Textarea.astro` / `Select.astro` | Labelled inputs |
| `Conditional.astro` | Fields shown only when another field has a given value |

### Conditional fields

Wrap them in `<Conditional when="fieldName:value">` and mark the inputs
`requireWhenShown` rather than `required`:

```astro
<Conditional when="hear:current-investor">
  <Field label="Which investor?" name="referring_investor" requireWhenShown />
</Conditional>
```

The script keeps visibility, `required`, and `disabled` in step. Never set
`required` directly on a conditional field: a hidden required field blocks
submission with a browser error pointed at something the visitor cannot see.

When a `<Conditional>` keys off a `<Select>`, give that select explicit
`{ value, label }` options so rewording a label cannot silently break the match.

## Brand assets

- Source brand files live in `fonts/` and `logos/`.
- The web-optimized versions actually served by the site live in `public/`
  (subsetted `.woff2` fonts, favicons, the social/OG preview image, header mark).

## Deploying

See **[DEPLOY.md](DEPLOY.md)** for a complete, non-developer, step-by-step guide
to publishing this at gouru.com with HTTPS.
