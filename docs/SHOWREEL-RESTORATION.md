# Restore «نصنعُ الدهشة.» as a scroll sequence

The showreel is again the cinematic scroll experience itself, without a play button, modal takeover, or final CTA. It starts with the center film filling the viewport and the existing Arabic title over it. As scrolling continues, the composition recedes into the nine-film mosaic, and the title fades. All visible tiles retain grouped playback.

The effect now lives in `src/components/showreel-mosaic.tsx`, with locally scoped GSAP references and a dedicated final stylesheet. It no longer shares the homepage entrance effect's lifecycle. Pause disables its ScrollTrigger without resetting the current scale; resuming re-enables it. Reduced-motion users see a static mosaic. The existing marketing, production, and gradient changes remain untouched.

The visual grid is centered by explicit left/top placement and percentage translation. Direction is LTR for the visual grid alone; the title stays RTL. Old play-button state, markup, event handling, and CSS are removed.

Checks: TypeScript, 14 playback/media tests, production build. No localhost preview.
