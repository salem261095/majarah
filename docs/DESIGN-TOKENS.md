# Shared visual tokens

`src/app/design-system.css` is the source of truth for the site's visual values. It is imported before component styles by `src/app/layout.tsx`.

- The five approved brand colors and the Arabic/handwritten font families are registered in Tailwind's `@theme static` block. They also work directly as CSS custom properties.
- Supporting tones, including existing subdued text and surface colors, live in the same file. Alpha variants derive from these colors with `color-mix`, so changing the underlying color updates its translucent variants too.
- Font sizes, weights, line heights and tracking share reusable tokens. The `--type-*` roles define metadata, labels, body, lead copy, titles, section headings and handwriting. Their mobile overrides live alongside the desktop definitions in this file. Fluid role primitives use names such as `--text-role-body` and `--text-role-section-mobile`.
- Padding, margins, gaps, scroll spacing and positional offsets use the `--space-*` scale. Page gutters and section spacing retain their existing scoped `--ni-gutter` and `--ni-space` aliases.
- Border radii use `--radius-none`, `--radius-small`, `--radius-medium` and `--radius-round`.
- Client-strip dimensions have dedicated `--client-*` variables, with desktop and mobile values together at the bottom of the file.

Component CSS consumes these variables rather than redefining the system. Scope and media-query order are retained to preserve the current composition. Fixed image/video dimensions, aspect ratios, grid proportions, breakpoints, border widths and animation geometry remain layout or media concerns rather than typography/spacing tokens. Static SVG and raster artwork keep their own embedded colors.

GSAP's studio reading animation reads the shared palette through `getComputedStyle`; its start/end colors are no longer separate JavaScript literals.

`tests/design-tokens.test.ts` checks the approved brand palette, rejects literal styling values in the covered categories outside the token file, and checks token references. An additional migration audit compared all declarations across the 17 component stylesheets after resolving tokens, with no value differences.

The unused `.env.example` has been removed. The active frontend does not require environment variables for deployment. `.env*` remains ignored to prevent accidental credential commits in future work.

## Active style foundation

The active shared layout, video presentation and form/playback controls are in `src/app/site-base.css`. The old `majarrah.css`, `editorial-motion.css` and `premium-editorial.css` files have been removed after their unused selectors were pruned. Feature styles retain their original cascade order. See `docs/PERFORMANCE-AND-STYLE-CLEANUP.md` for the cleanup audit and size comparison.

The homepage process section lives in `src/components/process-timeline.tsx` with its own `process-timeline.css`. Its heading and timeline share one compact sticky panel on the brand deep-violet surface. The panel has natural content height, with its scroll distance controlled by the central `--process-*` variables. At the end, the entire section and background scroll away normally into contact. Titles finish before descriptions start. Mobile stages use a full content-width column, stay sharp, and finish their opacity reveal before arriving at center; each stage then holds for reading. The original four Arabic titles and descriptions remain unchanged. Paused/reduced motion, short viewports and pre-hydration rendering retain a readable static timeline with native horizontal scrolling. Old process-card rules and their highlight controller have been removed.


The pointer cursor is a transparent star that transitions to white on dark section surfaces and brand purple on light surfaces. `--cursor-star-size` controls both the main star and the initial size of all click particles. `src/components/star-cursor.tsx` uses GSAP for radial burst transforms and an on-demand ticker for movement-driven spin; it stops the ticker when the spin settles and bounds active particles to 60. Burst colors reference the shared brand palette. The cursor is mounted once in the root layout and uses a pointer-transparent manual popover to stay visible above dialogs without blocking controls. Reduced motion retains a static transparent native star; coarse pointers have no custom effect. Text and disabled-control cursors remain native. All burst nodes/tweens are cleaned up on completion, suspension, preference changes or unmount. The favicon itself is unchanged.


Adaptive cursor contrast is resolved from the nearest section/header/footer/dialog surface and its transparent ancestors, with results cached per surface. Pointer and scroll events share one scheduled contrast check, so scrolling beneath a stationary cursor also updates the color. The main star uses the centralized `--cursor-color-dark` and `--cursor-color-light` values and `--motion-short` transition. Burst particles keep their individual brand colors. Native reduced-motion fallbacks have corresponding white/purple star assets. A future media surface can explicitly select a tone with `data-cursor-theme="dark"` or `data-cursor-theme="light"`.


The homepage component is `MajarahHome` in `src/components/majarah-home.tsx`; React component JSX must retain its capitalized name. Root `RouteScrollReset` opens new routes at the top, preserves explicit section fragments, and prevents native history restoration from keeping a previous footer offset. Dialog opener focus is restored with `preventScroll`.

Global hero/footer pause buttons and the duplicate manual-video pause overlay have been removed. Reduced-motion preferences, viewport-aware playback coordination and native manual-video controls remain. Selected-work ambient layers now use live videos in the same playback group as their covers, clipped to their cards. Their lighter diffusion uses `--work-ambient-blur` (12px desktop, 8px mobile), `--work-ambient-opacity` and `--work-ambient-brightness` in the central token file.


The homepage and contact-page inquiry forms now share `useInquirySubmission`: normal submit copy, validation, a brief sending state, and the requested simulated success confirmation. The form resets after success. This is deliberately a frontend simulation; it does not send, copy or persist an inquiry. The former copy-summary/email-app instructions and manual-copy fallbacks are removed from both forms.


Arabic brand spelling is consistently «مجرّة», and the former studio navigation/section label is «من مجرّة». Selected-work metadata now shows «العميل» with the frontend placeholder clients stored in `selectedWork`; matching project detail pages reuse those same names. These names are fictional review content supplied under the user's mock-data instruction.

Marketing service rows use ScrollTrigger to activate a background while crossing the reading line, with the same `--color-selection` purple used by text selection and white supporting text for contrast. Keyboard focus receives the same highlight. Expanding a row refreshes the trigger positions.

The showreel retains its cinematic zoom-out but finishes at a scale calculated from actual grid/stage dimensions and page gutters. Every tile is a 16:9 landscape frame; footage uses contain sizing to avoid cutting off the source, with the existing soft backdrop behind portrait clips. Reduced motion presents the complete fitted composition without a zoom sequence.


Selected work now has separate mobile and desktop film mappings in `src/lib/home-media.ts`. Mobile uses dedicated 9:16 previews while desktop retains landscape films. Covers, live ambient backgrounds and the opened film all use the same selected orientation. Before viewport detection, responsive poster markup renders without mounting either video; afterward only the matched film mounts. Mobile foregrounds and modal playback use contain sizing to preserve the complete portrait image. All existing video asset paths and migration destinations point to the user's `videos/portrait` and `videos/landscape` folders.
