# Approved homepage adjustments — 9 November 2026

- Keep the approved introduction, service panels, portfolio, highlights, showreel mosaic, process, and contact.
- Restore the prior compact dark navigation and video-backed hero with natural Arabic wordmark, handwritten accent, and client-name strip.
- Use RTL for the structural grids: service/section rails on the right, supporting panels on the left, correct metadata order, start-aligned Arabic copy, and left-directed action arrows.
- Isolate Latin names, email addresses, and numeric counters with explicit direction where appropriate.
- Tighten heading line heights to roughly 1.2–1.45 and body copy to roughly 1.7–1.75, with mobile overrides.
- Remove SVG textLength/spacingAndGlyphs, compressed Arabic tracking, and text-scaling effects. Arabic uses complete words and normal glyph proportions.
- `/ar` is the only main homepage. `/ar/home-1` redirects to it. `/ar/home-2` and `/ar/home-3` routes and their variant component are removed.
- Retired, unreferenced homepage implementations and their exclusive styles are removed. Shared video, inquiry, font, and content components remain.

Arabic frontend only. No backend changes, deployment, or localhost browser inspection.
