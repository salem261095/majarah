# Majarra frontend system

Arabic homepage and public pages share a five-color brand palette, self-hosted Noto Sans Arabic, Playpen Sans Arabic handwritten accents, natural Arabic glyph proportions, RTL grids, consistent type roles, fine rules and expressive local media.

- `design-system.css` loads Tailwind theme/utilities without preflight and maps brand/font tokens.
- `typography.css` defines section-title, subheading, lead, body, label and metadata roles.
- Homepage sections retain their scoped styles and independent complex motion components.
- `inner-pages.css` defines the public-page editorial layouts, responsive grids, gallery, service rows, project details and contact form.
- Shared `SiteHeader`, `SiteFooter`, `SectionHeading` and `SectionStamp` connect the pages visually and functionally.
- `PageShell` provides menu, active routes, skip link, motion preference and GSAP reveals on inner pages.

GSAP owns staged entrances, orbital motion, the video-strip loop and cinematic showreel. Native CSS sticky owns selected-work stacking. CSS handles short interactive transitions. Reduced-motion provides static equivalents. The common media coordinator handles lazy sources, visibility, overlapping projects, grouped playback, user-requested playback priority and silent films.

Portfolio and service content use actual supplied assets and approved service descriptions. Public case pages avoid invented clients, dates, credentials and metrics. The frontend inquiry prepares a local summary and offers an explicit mailto handoff. Backend and admin remain later approval stages. The website is Arabic-only, without language switching or locale routing.

The homepage is `/`; legacy `/ar` URLs redirect to their root equivalents. The alternatives are removed. Public pages are documented in [Arabic public pages](ARABIC-PUBLIC-PAGES.md).

Validation includes TypeScript, thirty-one meaningful tests, media checks, generated HTML/link audits and production compilation. No localhost browser preview is opened, per the user's instruction.
