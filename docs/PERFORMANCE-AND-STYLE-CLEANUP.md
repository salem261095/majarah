# Animation, stylesheet and opening refinements

## Shared video coordination

`src/lib/media-coordinator.ts` now owns one scroll listener, one resize listener, one visibility listener, one reduced-motion listener and one nearby-video IntersectionObserver for the mounted media registry. They are removed when the last film unmounts.

`src/lib/frame-batch.ts` coalesces repeated requests into one animation frame. It measures affected nearby films first, caches shared clipping/cover rectangles, then applies loading, seeking and playback decisions. Playback selection is linear and runs once per batch. Hero and showreel animations invalidate their own group instead of dispatching a global DOM event to every video.

Distant films are not measured on scroll or hero animation ticks. Animated-group films load only when actually visible; offscreen and covered films pause. Explicit manual playback retains priority. Reduced-motion/data-saving preferences, silent playback, and immediate pausing in hidden tabs are preserved. Repeated play calls are suppressed while a play promise is pending.

The client-logo strip measures cell positions on resize rather than reading each logo's bounding box every animation frame. Its movement, edge blur and compact spacing are preserved.

These changes remove avoidable work; they are not a measured claim about frame rate on physical devices. No localhost preview was opened.

## Smaller style system

Removed 955 obsolete selector branches, 172 overridden longhand declarations and 171 unused token definitions. Dynamic class prefixes and functional pseudo-classes were retained conservatively. Existing feature stylesheet order was preserved.

The active contents of `majarrah.css`, `editorial-motion.css` and `premium-editorial.css` are consolidated into `site-base.css`. Feature layouts and the shared token file remain separate. Undefined legacy aliases in surviving controls now refer to actual brand/font/surface tokens; short control transitions share `--motion-short`.

- CSS source: 232,487 to 139,691 bytes, approximately 40% smaller.
- Compiled CSS: 225,332 to 135,367 bytes, approximately 40% smaller (uncompressed).
- Root stylesheets: 18 to 16.
- A static cascade audit compared 3,546 retained selector/property combinations, including media contexts and importance: zero unexpected differences after normalizing the repaired legacy aliases.

The cleanup preserves the approved composition, Arabic typography, palette and motion design.

## Opening once per session

`src/lib/opening-session.ts` remembers completion, explicit skipping and reduced-motion bypasses in session storage. Returning to the homepage or refreshing in the same tab skips the split-panel opening. A new tab/session can show it again.

A small head script hides the returning-session overlay before the first paint; React then removes it. When storage is blocked, an in-memory fallback still handles client-side return visits. Existing skip, Escape, reduced-motion and timeout fallbacks remain.

## Verification

The production Webpack build and TypeScript checks pass. Tests cover coalescing/read-before-write ordering, registry lifecycle and shared geometry, group-scoped updates, hidden tabs, reduced-motion/manual playback, session persistence, blocked storage and the pre-paint bootstrap. The existing locally deleted architecture image and video-source list are unrelated and remain untouched.
