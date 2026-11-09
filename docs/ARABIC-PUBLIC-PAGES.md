# Arabic public pages — 9 November 2026

Phase 2 is implemented in the active root application. The public frontend uses the same five brand colors, Noto Sans Arabic, Playpen Sans Arabic accents, RTL alignment, fine grids, large editorial headings, monochrome atmosphere, and expressive portfolio media as the approved homepage. The homepage's hero, orbital field, split opening, selected-work stack, showreel zoom, and service layouts remain in place.

## Pages

| Route | Content and behavior |
| --- | --- |
| `/work` | Portfolio browser with Arabic-normalized search, discipline/sector/media filters, sorting, result count, empty/reset state, shareable filter query strings, and controlled loading of more work. |
| `/work/[slug]` | Eight media-led project/visual-study pages, with user-initiated film playback, real supplied imagery, editorial treatment, gallery, related service, next project, and contextual contact action. |
| `/services` | Separate creative-production and marketing treatments, service navigation, FAQs, and inquiry action. |
| `/services/[slug]` | Eight service pages: film production, photography, post-production, short-form video, campaigns, brand strategy, marketing technology, and training. Includes scope, process, complementary services, and prefilled contact links. |
| `/about` | Studio positioning, immersive monochrome film, philosophy, principles, process, and contact invitation. |
| `/contact` | Project brief with service/project prefilling, validation, company, email, phone, project, budget and timing fields; copy-summary action and explicit email handoff. |
| Not found | Arabic branded 404 with working navigation. |

Shared navigation and footer now connect the homepage and public pages. Homepage project dialogs and titles link to the new detail pages. Header/menu/footer styling is reused rather than replaced.

## Content and media

The public portfolio uses local project images and approved visual-library footage. Only supplied client attribution is used. Unknown years, teams, outcomes, certifications, and performance metrics are not invented. Visual studies are described as visual studies. There are no frontend-only disclaimers in the public copy.

Posters render before films. Portfolio cards mount silent video previews on hover/focus, then stop them on exit. Main project films are user-initiated. Looping media shares the existing visibility and playback coordinator; service pairs can play together, while explicit manual playback takes priority. Reduced motion, pause, hidden tabs and offscreen suspension remain supported.

## Technical scope

- Server-rendered content pages with client components for filters, motion, menu, media and inquiry preparation.
- Shared CSS role tokens and Tailwind utilities, without preflight. New page styles are scoped to the inner-page classes; homepage composition is retained.
- Arabic metadata, breadcrumbs, active navigation, semantic headings, labels, focus states, native FAQ disclosures and skip link.
- Arabic only, permanently. No second-language version is planned. No admin, database, CMS, form storage, automated messaging or publishing added.
- Contact prepares a validated local brief. The user explicitly opens their own mail application to send it to `halla@majarah.sa`.

## Verification

TypeScript and production compilation cover all routes. Thirty-one tests cover playback, covered-media visibility, asset existence, route-safe slugs, detail links, Arabic search, compound filters, sorting, and inquiry encoding. Generated Arabic HTML is audited for a single h1, duplicate IDs, missing internal destinations, and missing images. The contact route is dynamic to read optional query prefills.

Per the user's instruction, localhost is not opened or inspected. Desktop/mobile styling is implemented; visual browser review remains with the user.
