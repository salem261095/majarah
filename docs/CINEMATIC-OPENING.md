# Cinematic opening and staged reveals

Selected Arabic homepage only (`/ar`, `/ar/home-1`). Implemented 9 November 2026.

## Sequence

1. Black opening overlay. Centered `مجرة` resolves from blur; a small sharp `مجرة` sits near the bottom. GSAP dismisses the overlay after approximately 2.1 seconds. Skip and Escape are available, reduced motion bypasses it, a JS timeout bounds it at 3.3 seconds, and a CSS fallback hides it if hydration fails. Body scrolling is restored on completion, interruption, or unmount.
2. Full-width `مجرة` wordmark, monochrome abstract moving line field, faint monochrome production footage, and a fine shared grid. The hero timeline waits for the opening completion event.
3. A purple, rotated italic tagline resolves in two phases with blur and clip-mask reveal, followed by a drawn underline. The established Noto Sans Arabic font is retained. Purple substitutes for the reference's red to preserve Majarra's palette.
4. The abstract field and a repeated client-name strip move continuously. Names are from supplied work; no official logo artwork is fabricated. Visible pause controls stop the background/video motion and GSAP sequences.
5. A bright off-white introduction provides a strong contrast shift. Shared grid lines and section gutters continue.
6. Whole Arabic words progress from purple to near-black with scroll. Arabic glyphs remain joined. The no-JS/reduced-motion equivalent is readable near-black text.
7. Two project images flank the statement with diagonal-corner clipping. Image reveals precede supporting copy and studio attribution; no fictitious author is introduced.
8. Services remain dark, numbered disclosure rows. The reverted 3D carousel is not present.
9. Dark portfolio: large sharp portrait covers, staggered alignment, spacious metadata, and enlarged blurred copies extending image colors behind each cover. Existing supplied images are used while additional video assets are pending.
10. Showreel: large media stage with oversized centered Arabic lettering, visible controls, and playback status. It stays silent and starts on request.
11. Process: light structured cells with a scroll-selected near-black active cell, white text, and purple number badge. No additional pinning is introduced.

## Technical behavior

- GSAP/ScrollTrigger controls opening, hero sequence, tagline resolution, marquee, intro color-reading, staged support reveals, image parallax, and process emphasis.
- CSS handles static composition, simple hover transitions, clipping, fallback visibility, and reduced-motion presentation.
- Tailwind design tokens and existing brand variables remain in use.
- Existing video coordination, deferred sources, posters, offscreen pause, silent media, image dialogs, and contact flow remain intact.
- Motion contexts and event listeners revert on unmount. Local font and image loads trigger geometry refreshes.

Validation: six playback policy tests, TypeScript, and a production build. No localhost browser inspection was performed, per user instruction. Exact timing, cropping, and motion feel remain subject to visual review.
