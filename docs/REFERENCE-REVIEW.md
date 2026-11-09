# Frontend reference review — 8 November 2026

Requested references:

- [Neiden](https://neiden.framer.media/)
- [Kairo](https://kairotemplate.framer.website/)
- [Raster overview](https://raster-template.framer.website/), including its linked [Home 1](https://raster-template.framer.website/home-1)

Reviewed the live reference page content and screenshots. These are sources of layout and interaction direction, not templates copied into the application. No reference text, customer claims, project assets, testimonials, pricing, or metrics were reused.

| Reference direction | Majarra implementation |
| --- | --- |
| Neiden: oversized studio typography, editorial spacing, indexed sections, extended page narrative | Large Arabic introduction, six numbered chapters, full-screen navigation index, large footer wordmark |
| Kairo: cinematic scene-led hero, scene selector, expandable services, FAQ | Three manual photographic scene choices, image-backed hero, four expandable service rows, four FAQ rows |
| Raster: visible grid, metadata, disciplined project presentation, chapter-based process | Hero grid and index bar, alternating contextual project stories, sticky process heading with active chapter navigation |

## Arabic adaptation

- Preserve connected Arabic words; do not split Arabic glyphs into individually animated characters.
- Use logical spacing, RTL text flow, left-pointing action arrows, and touch-friendly controls.
- Art-direct mobile separately: scene selector becomes a horizontal row, project stories stack, process cards remain in natural flow, and sticky headings become static.
- Keep the existing approved violet, deep violet, midnight, blue and purple base colors. Add warm paper as a neutral surface for contrast between chapters.
- Keep Noto Sans Arabic self-hosted. The official logo and any final typography remain pending.

## Motion and interaction

- No audio, audio controls, Web Audio, or media players.
- Scene transitions and a subtle photographic drift; scenes change only when selected.
- Native fullscreen menu with entry transition and staggered link entry.
- Scroll-entry animations through IntersectionObserver and Web Animations, with visible unanimated fallback.
- CSS grid transitions expand services and FAQs. Closed regions use `inert` and `aria-hidden`.
- Native project and brief dialogs contain focus, close on Escape, and return focus to the opener.
- Reduced-motion preferences disable decorative transitions. The homepage pause control stops its background drift and reveal animations.
- No scroll hijacking or forced loading screen.

## Verification boundary

The user explicitly requested that localhost not be opened or inspected. Verification therefore uses TypeScript and the production build, plus source review of responsive styles, interaction state, accessible labeling, and media behavior. Visual layout and runtime interaction behavior have not been browser-verified in this revision.

## Current scope

Arabic frontend only. Projects and imagery are clearly illustrative. The project brief copies locally and does not send or store data. No backend work, publication, new dependencies, or English localization was added.
