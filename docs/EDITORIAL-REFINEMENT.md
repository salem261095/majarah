# Editorial refinement — 9 November 2026

The compact dark header and approved section sequence remain. `/ar` is the main homepage and `/ar/home-1` redirects to it; no alternative homepages remain.

- Natural Arabic wordmarks nearly fill the available width. A ResizeObserver and the loaded font's measured text width adjust font size only; no horizontal scaling, SVG stretching, or compressed Arabic tracking.
- Self-hosted Playpen Sans Arabic replaces the earlier handwritten fonts for the hero and footer accents. Noto Sans Arabic remains the main typeface.
- The introduction uses an asymmetric twelve-column composition, two monochrome frames, and separate supporting copy. Text never overlaps the media.
- Dark services use large titles, numbered rules, unequal media columns, original silent footage, and simple deliverable lists.
- Section headings and eyebrows share a quieter hierarchy and consistent spacing. The footer has a three-column directory and oversized brand signature.
- The showreel title is «نصنعُ الدهشة.»; duration and sound-disclaimer labels are removed. All nine mosaic tiles contain real videos from the original `public/canva-videos` folder. Portrait clips remain uncropped in the mosaic.
- Grouped playback allows all visible mosaic tiles to play together. Visibility considers both screen axes and the sticky stage's clipping bounds, including during GSAP zoom updates. Offscreen tiles pause. Explicit film playback takes priority. Reduced-motion and data-saver preferences retain posters.
- Clips are five-second, silent, compressed derivatives; source files remain untouched. Source mappings are in `media-review/editorial-clips.json`. The portfolio uses original library footage where suitable; the workspace scene remains from the additional supplied folder.

Scope: Arabic frontend only, no backend, no deployment, and no localhost preview.
