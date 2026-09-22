/**
 * Single source of truth for site-wide constants.
 *
 * Nothing here should be duplicated into a page. If a value appears on more
 * than one screen — a phone number, a market list, a buy-box row — it belongs
 * in this file and gets imported.
 */

export const SITE = {
  /**
   * FLAG — OPEN DECISION (2026-09-21)
   *
   * `Gouru & Co. LLC` is the entity registered today, so it is what the footer
   * and the legal pages state. "Gouru Capital Partners" is currently a brand
   * operating under it.
   *
   * If GCP is registered as its own LLC, change `legalName` below to
   * "Gouru Capital Partners LLC" and every legal surface updates at once.
   * Do not state an entity name that is not actually registered.
   */
  legalName: "Gouru & Co. LLC",

  /** Full brand name. Used on marketing pages and in metadata. */
  brandName: "Gouru Capital Partners",
  /** Short wordmark, used in the header, footer, and title suffix. */
  name: "Gouru",

  /**
   * Publicly displayed address. Forwards to shuban@gouru.com, which is also
   * where Web3Forms delivers form submissions.
   */
  email: "hi@gouru.com",
  /** E.164, for tel: links. */
  phone: "+19198846816",
  /** Human-readable, for display. */
  phoneDisplay: "(919) 884-6816",

  /** Bare domain. */
  domain: "gouru.com",
  /** Canonical production origin (no trailing slash). */
  url: "https://gouru.com",

  /** Primary positioning line. */
  tagline: "We buy small multifamily.",
  /** Default meta description (overridable per page). */
  description:
    "Gouru Capital Partners acquires, improves, and operates 5-40 unit multifamily properties across the United States.",

  /**
   * Web3Forms access key.
   *
   * This is PUBLIC by design — Web3Forms documents it as "an alias to your
   * email". It only authorizes sending mail to the verified address; it grants
   * no read access and carries no account privileges. Committing it is correct.
   *
   * Bound to shuban@gouru.com. One key serves every form on the site; forms are
   * told apart in the inbox by the `subject` passed to <FormShell>.
   */
  web3formsKey: "0b0b760e-0aee-4270-a3c2-8d8dfb68e9a8",

  /**
   * Cache-buster for the social preview image.
   *
   * iMessage, Slack, LinkedIn and the rest key their cache on the image URL
   * and hold it for a long time. Whenever public/og-image.png is redrawn,
   * bump this number or those platforms keep serving the old picture.
   */
  ogVersion: "2",

  /** Date the legal pages were last reviewed. */
  legalUpdated: "September 21, 2026",
} as const;

/** Primary navigation, shared by the header and footer. */
export const NAV = [
  { href: "/", label: "Home" },
  { href: "/sell/", label: "Sell to Us" },
  { href: "/invest/", label: "Invest" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
] as const;

/** Secondary (legal) links, shown in the footer. */
export const LEGAL_NAV = [
  { href: "/privacy/", label: "Privacy" },
  { href: "/terms/", label: "Terms" },
] as const;

/**
 * Acquisition criteria. Published in full on /sell/ and summarized on /.
 *
 * Note there is deliberately no price row. No range has been set, and a
 * published range that is wrong turns away deals worth seeing.
 */
export const BUY_BOX = [
  {
    label: "Size",
    value: "5-40 units",
    note: "Small multifamily — the range most institutional buyers skip.",
  },
  {
    label: "Condition",
    value: "Light to medium value-add",
    note: "Good bones held back by deferred maintenance, below-market rents, or weak management.",
  },
  {
    label: "Occupancy",
    value: "Tenanted and operating",
    note: "We can work around existing leases and in-place management.",
  },
  {
    label: "Timeline",
    value: "Typically 30-60 days",
    note: "Faster when the situation calls for it.",
  },
] as const;

/** What we pass on. Being explicit here saves everyone a phone call. */
export const NOT_A_FIT = [
  "Ground-up development or lease-up from zero occupancy",
  "Fire-damaged or structurally distressed buildings",
  "Fully stabilized assets with no operational upside",
] as const;

/** Where we buy, most to least active. */
export const MARKETS = [
  {
    tier: "Primary",
    region: "North Carolina",
    detail: "Where we are, where we know the submarkets, and where we look first.",
  },
  {
    tier: "Secondary",
    region: "The Carolinas & Southeast",
    detail: "Active and underwriting regularly across the region.",
  },
  {
    tier: "Opportunistic",
    region: "Midwest, East Coast, West Coast & Texas",
    detail:
      "Ohio, Illinois, Michigan, Missouri and select coastal and Texas markets. We will travel for the right deal.",
  },
] as const;
