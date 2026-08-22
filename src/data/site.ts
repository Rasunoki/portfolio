/**
 * Single source of truth for identity, links, and deploy URL.
 * Everything SEO-related (metadata, sitemap, robots, JSON-LD, OG image)
 * reads from here so there is only one place to update.
 */

export const site = {
  name: "Joseph Rafael A. Macasling",
  shortName: "J. R. Macasling",
  initials: "JM",
  role: "Designer · Music Video Director · Photographer",
  location: "Valenzuela City, Philippines",
  tagline:
    "A student filmmaker from Valenzuela City — directing music videos, shooting photography, and designing visuals since 2023.",
  description:
    "Portfolio of Joseph Rafael A. Macasling — music video director, photographer, and designer based in Valenzuela City, Philippines. 15+ music videos directed since 2023.",

  /**
   * Public origin of the deployed site. Set NEXT_PUBLIC_SITE_URL in the host
   * (Vercel exposes VERCEL_PROJECT_PRODUCTION_URL automatically); the literal
   * is the last-resort fallback so absolute URLs are never relative.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://josephmacasling.vercel.app"),

  email: "josephrmacasling@gmail.com",
  phone: "+63 951 546 5994",
  phoneHref: "tel:+639515465994",

  socials: {
    linkedin: "https://www.linkedin.com/in/joseph-rafael-macasling-1b1027412",
    github: "https://github.com/Rasunoki",
    facebook: "https://www.facebook.com/josephrafael.macasling",
    youtube: "https://www.youtube.com/@definitelynexx",
  },

  /** Featured video for the Showreel section. */
  showreel: {
    videoId: "W8ot8p7mt3I",
    title: "Yugto — nexart ft. Gerold",
    subtitle: "One-take music video · Director / DP",
  },
} as const;

/** Section ids in document order — drives the navbar and the sitemap. */
export const sections = [
  { id: "showreel", label: "Showreel" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "gallery", label: "Gallery" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;
