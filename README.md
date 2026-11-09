# مجرة · Majarra

Arabic-only agency website. Current scope: Arabic frontend; backend remains a later approval stage. There is no second-language version or language switch.

## Run

```sh
npm ci
npm run dev
```

Main homepage: http://127.0.0.1:3000/. Legacy `/ar` URLs redirect to their root equivalents. Homepage alternatives 2 and 3 have been removed.

```sh
npm run typecheck
npm test
npm run build
```

The project root is the active app. The separate `majarra/` scaffold is excluded from its TypeScript and test projects.

## Current design

The approved reference-based content sections remain. The previous compact dark header and video-backed editorial hero are restored. All section grids and navigation follow RTL. Arabic wordmarks use natural HTML text with normal tracking and no SVG stretching, skewing, or horizontal scaling. Heading and body line heights are tightened.

GSAP + ScrollTrigger handle staged reveals and the showreel-to-mosaic transition. CSS handles simple hover effects. Tailwind CSS and shared CSS variables provide the responsive design system.

Local project images and silent video copies are used; originals remain untouched. New supplied landscape clips are shown as visual-library scenes. Forms prepare a local summary for an explicit mail handoff to `halla@majarrah.sa`; no backend submission or storage is enabled.

The logo is typographic until official assets arrive. Noto Sans Arabic is self-hosted; Playpen Sans Arabic supplies the handwritten contrast (self-hosted with its SIL OFL license). Arabic wordmarks fit their available width by changing font size, without scaling or stretching glyphs.

Per user instruction, localhost is not opened or inspected. Checks cover TypeScript, playback-policy tests, production compilation, and media metadata; visual browser QA remains the user's review.

[Original specification](docs/specification.md) · [Delivery phases](docs/PHASES.md) · [Latest approved layout adjustments](docs/RTL-HOME-1.md)

The latest editorial polish refines the introduction, dark services, consistent chapter headings, and dark footer. The showreel zooms out into nine live, lazy-loaded films from the original Canva folder; portrait films retain their complete frame. Its visible tiles play together, with manual playback taking priority. No sound disclaimer or duration label is displayed.

Typography uses shared role tokens: section titles, subheadings, lead copy, body, labels, and metadata. One reusable section-heading component aligns the numbered index and supporting copy with the title across the homepage. Services retain their sticky service index; process stages form a connected four-column grid on desktop, two columns on tablets, and one column on phones.

## Arabic public pages

The complete Arabic public frontend is available at `/work`, `/services`, `/about`, and `/contact`, with eight project/visual-study detail pages and eight service detail pages. Header, footer, menu, homepage titles and project dialogs connect to them. Portfolio filters/search and inquiry preparation work locally.

See [delivered pages and checks](docs/ARABIC-PUBLIC-PAGES.md). The public site is permanently Arabic-only. Backend work awaits frontend approval.

## Asset library

Referenced images, films, posters and their matched Canva originals now live under `public/assets/`. Runtime paths are centralized in `src/lib/assets.ts`; media IDs stay stable while physical filenames are descriptive. Unused source files remain in their original folders. The full move/rename map and SHA-256 checksums are in `docs/asset-migration.json`.
