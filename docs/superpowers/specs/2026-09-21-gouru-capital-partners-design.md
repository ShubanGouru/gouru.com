# Gouru Capital Partners — site design

**Date:** 2026-09-21
**Status:** Approved, implementing

## Purpose

Repoint gouru.com from a software-company marketing site to the public site for
**Gouru Capital Partners (GCP)** — a real estate firm that buys, improves, and
sells small multifamily assets.

The site serves two distinct audiences who must never be made to hunt for their
path:

1. **Owner-operators / brokers** with a property to sell.
2. **Prospective capital partners** who want to invest alongside us.

Every page is built so a visitor lands in the right lane within one screen.

## Scope

### Pages

| URL | Page | Contents |
| --- | --- | --- |
| `/` | Home | Positioning, two-audience split, what we do, criteria summary, markets |
| `/sell/` | Sell to Us | Owner-operator pains, how we work, **buy box**, seller form, direct contact |
| `/invest/` | Invest with Us | Thesis, investor form w/ conditional fields, **FAQ**, securities disclaimer |
| `/about/` | About | Team disciplines and approach |
| `/contact/` | Contact | Short form, email, phone |
| `/thanks/` | Thank you | Landing target for non-JS form submissions |
| `/privacy/` | Privacy | Updated to disclose form-data processing |
| `/terms/` | Terms | Updated entity/description references |
| `/404/` | Not found | Unchanged behavior, refreshed links |

`/platform/` is **deleted**. `astro.config.mjs` gains a `redirects` entry
mapping `/platform` to `/` so the old URL emits a meta-refresh page instead of
a 404.

### Explicitly out of scope

- Any CMS, blog, or deal listing.
- Any analytics or tracking. The site remains request-clean.
- Any investor portal, login, or document room.

## Constraints

- **Static only.** The site builds to plain HTML and deploys to GitHub Pages
  via the existing Actions workflow. There is no server runtime, so all form
  handling is delegated to a third party.
- **No new brand work.** The existing design system in `src/styles/global.css`
  (navy `#072547` on warm paper `#f8f6f0`, Giaza display serif, Neue Montreal
  text face) is kept in full. Only the content layer changes.

## Architecture

### Preserved unchanged

`src/styles/global.css`, `src/layouts/Base.astro`, `src/components/Footer.astro`,
`src/components/CtaBand.astro`, all fonts and favicons.

### Modified

- `src/consts.ts` — new brand, contact, buy box, and markets data.
- `src/components/Header.astro` — gains a mobile disclosure menu. The nav grows
  from 3 items to 4 with longer labels ("Sell to Us", "Invest"), which overflows
  a 375px viewport in the current single-row layout.
- `astro.config.mjs` — `/platform` redirect.

### New: form subsystem

Form plumbing is isolated in `src/components/form/` so the submission endpoint
and access key exist in exactly one place, mirroring the existing discipline of
defining the legal entity name only in `consts.ts`.

| Component | Responsibility |
| --- | --- |
| `FormShell.astro` | Owns the endpoint, access key, subject line, honeypot, submit button, and the success/error region. Accepts fields via slot. |
| `Field.astro` | A labelled text/email/tel input with optional hint text. |
| `Select.astro` | A labelled native `<select>`. |
| `Textarea.astro` | A labelled multi-line input. |
| `Conditional.astro` | Wraps fields that appear only when another field holds a given value. |

One bundled script, shipped by `FormShell`, handles both behaviors for every
form on the site:

**Conditional reveal.** A `Conditional` wrapper carries
`data-show-when="fieldName:value"`. On any change within the form, the script
shows or hides each wrapper and — critically — adds or removes `required` on
the inputs inside it in the same step. A hidden field that is still `required`
blocks submission with a browser validation message pointed at an element the
user cannot see.

**Submission.** The script intercepts submit, POSTs the form as JSON to
Web3Forms, and renders an inline success or error message without a page
navigation. Without JavaScript the form performs a native POST and Web3Forms
redirects to `/thanks/`, so the form degrades rather than breaking.

## Form backend

**Web3Forms.** Chosen over Formspree (paid sooner), Netlify Forms (would force
a hosting migration off GitHub Pages), and an embedded Google Form (cannot be
styled to match the site).

- Endpoint: `https://api.web3forms.com/submit`
- Free tier: 250 submissions/month.
- The access key is bound to a destination **email address**, not to a form.
  One key therefore serves all three forms; they are distinguished in the inbox
  by a per-form hidden `subject` field.
- The key is public by design — Web3Forms documents it as "an alias to your
  email" — so committing it to a public repository is correct, not a leak.
- Submissions route to `shuban@gouru.com`. The publicly displayed address stays
  `hi@gouru.com`, which forwards there.

Because form data transits a third-party processor on US servers, the privacy
page must name this. That is a requirement of this design, not an optional
addition.

## Form fields

Required fields are marked with an asterisk.

**Seller** — Name\*, Email\*, Phone\*, Property city & state\*, Number of
units\*, Price expectation, Timeline, Notes.

**Investor** — Name\*, Email\*, Phone, Typical check size, How did you hear
about us?\*, Accredited investor?, Notes.

The investor form's referral question drives the conditional logic:

| Selection | Revealed field |
| --- | --- |
| Current investor | Which investor? (required) |
| Referral | Who referred you? (required) |
| Other | Tell us more (required) |

**Contact** — Name\*, Email\*, Phone, Reason for contact, Message\*.

## Buy box

Published on `/sell/` and summarized on `/`.

| Criterion | Value |
| --- | --- |
| Unit count | 5–40 units |
| Condition | Light to medium value-add |
| Not a fit | Lease-up from zero occupancy; fire-damaged or structurally distressed buildings; fully stabilized assets with no upside |
| Close timeline | Typically 30–60 days |

Price range is deliberately **omitted**. A published range that is wrong filters
out good inbound, and no range has been set.

## Markets

| Tier | Coverage |
| --- | --- |
| Primary | North Carolina |
| Secondary | The Carolinas and the Southeast |
| Opportunistic | Midwest (OH, IL, MI, MO), East Coast, West Coast, Texas |

## Investor FAQ

Eight questions covering: what we buy, deal-by-deal versus blind pool, minimum
investment, accreditation, hold period, distributions, risks, and what happens
after the form is submitted.

**No investment terms are invented.** Where a number has not been set —
minimum check, hold period, distribution schedule — the answer says the terms
are set per deal and offered on a call. Publishing a figure that a future
offering contradicts is worse than publishing nothing.

## Securities positioning

`/invest/` is written to build a relationship list, not to offer a security.
It states no returns, no deal terms, and no offering. It carries a disclaimer
that nothing on the site is an offer to sell or a solicitation of an offer to
buy a security, and that any offering would be made only to qualified investors
through definitive documents.

The page includes a plain-language risk paragraph covering loss of value,
rising rates and expenses, renovation overruns, and illiquidity.

**This construction should be reviewed by securities counsel before launch.**
It is a conservative default, not a legal opinion.

## Legal entity

The registered entity today is `Gouru & Co. LLC`. Whether GCP becomes a DBA of
that entity or a separately registered LLC is undecided.

Resolution: `consts.ts` splits `brandName` ("Gouru Capital Partners") from
`legalName` ("Gouru & Co. LLC"). Marketing surfaces render `brandName`; the
footer and legal pages render `legalName`. The site therefore states nothing
untrue today, and adopting a new entity is a one-line change in one file.

A `FLAG` comment in `consts.ts` records the open decision.

## Accessibility and correctness requirements

- Every input has a programmatically associated `<label>`.
- Revealed conditional fields toggle `required` together with visibility.
- The form status region is `role="status"` with `aria-live="polite"` so
  success and failure are announced.
- The mobile menu button carries `aria-expanded` and `aria-controls`.
- Phone and email are real `tel:` and `mailto:` links.

## Verification

The build must succeed, and the following are checked in a browser before the
work is called done: every nav link resolves, all three forms submit and render
their inline success state, the investor form's conditional fields appear and
disappear correctly, and the layout holds at 375px.
