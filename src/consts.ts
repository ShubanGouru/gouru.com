/**
 * Single source of truth for site-wide constants.
 *
 * IMPORTANT: `legalName` is our registered legal entity name and must match
 * our D-U-N-S record character-for-character — including the period after
 * "Co" and the exact spacing. It is defined ONCE here and imported on every
 * page so it can never drift. Do not hardcode the legal name anywhere else.
 */
export const SITE = {
  /** Registered legal entity name. Verbatim everywhere. */
  legalName: "Gouru & Co. LLC",
  /** Short brand name / wordmark. */
  name: "Gouru",
  /** Single contact address — swap here to change it site-wide. */
  email: "hi@gouru.com",
  /** Bare domain. */
  domain: "gouru.com",
  /** Canonical production origin (no trailing slash). */
  url: "https://gouru.com",
  /** Primary positioning line. */
  tagline: "Modern software for real estate.",
  /** Default meta description (overridable per page). */
  description:
    "Gouru & Co. LLC is a software company building modern, dependable tools for the real estate industry.",
  /** Date the legal pages were last reviewed. */
  legalUpdated: "June 5, 2026",
} as const;

/** Primary navigation, shared by the header and footer. */
export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/platform/", label: "Platform" },
  { href: "/contact/", label: "Contact" },
] as const;

/** Secondary (legal) links, shown in the footer. */
export const LEGAL_NAV = [
  { href: "/privacy/", label: "Privacy" },
  { href: "/terms/", label: "Terms" },
] as const;
