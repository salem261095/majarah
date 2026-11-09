# Full-screen portrait-strip hero

- The compact header and hero together occupy one small viewport (`100svh`), with the hero subtracting the header's 78 px desktop / 72 px mobile height.
- Native Arabic wordmarks fit by font size, considering both available width and identity-area height. Their shapes are not stretched.
- The Playpen Sans Arabic tagline is centered horizontally over the lower part of the wordmark. The primary CTA sits on the horizontal centerline; its supporting action is beside it on desktop and beneath it on mobile.
- The background contains six unique portrait films from the original `public/canva-videos` folder: pasta, training, beads, hospitality, burger, and neon fries. Silent compressed copies and posters are in `public/media/editorial`; originals are untouched.
- Three adjacent films fill desktop width; one full film fills mobile width. All gaps, margins, padding, borders, and rounded corners between video tiles are zero. Cropping uses `object-fit: cover`, preserving proportions.
- Two identical sets permit a seamless GSAP horizontal loop. Only visible films play together; the shared playback policy prioritizes explicit film playback.
- Motion pauses with the page's control, when the hero leaves the viewport, and when the document is hidden. Reduced-motion preferences receive a stationary poster strip.
- Short-screen media queries preserve viewport height and readable actions. All other homepage sections remain unchanged.

Verification: TypeScript, playback-policy tests, production compilation, and six clips' portrait dimensions / absence of audio. Localhost remains unopened per user instruction.

## Latest hero adjustment

The centered Playpen Sans Arabic tagline reads «نصنع الإبداع، ونوسّع مدار الأثر». The client-logo strip and its marquee animation are removed, and its reserved space is returned to the hero composition. The six-film track repeats indefinitely (`repeat: -1`) on both desktop and mobile; every visible video also loops. User pause, reduced motion, and offscreen/hidden-page suspension remain supported.

The vertical-centering experiment is undone: the tagline is again horizontally centered over the lower part of the wordmark. The background viewport alone has `dir="ltr"` and isolated LTR CSS; the overwide track is explicitly positioned at `left: 0; top: 0`. This prevents an RTL containing block from right-aligning the duplicated strip before its negative-X animation begins. The repeat distance remains exactly one of the two identical six-film sets. Hero content, navigation, and the rest of the page remain RTL.
