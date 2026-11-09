# Client logos and homepage adjustments

The supplied sheet contains eighteen client marks. They are extracted into separate, self-contained SVG image files in `public/assets/clients`. Each SVG uses a tightly bounded viewport over the exact source pixels; artwork is not redrawn, resampled or stretched. The original sheet is retained at `public/assets/originals/images/client-logo-sheet.png`. Crop coordinates and provenance are recorded in `client-logo-extraction.json`. The sheet's credit lies outside every crop.

The final client-strip direction is one continuous row at the top of the second (studio) section. All eighteen marks are included, and an identical hidden copy allows a seamless infinite loop. Movement is LTR for the logo artwork alone; the section remains RTL. Logos use grayscale, inversion and multiply blending to remove the apparent white image background on the site's light surface. Blur and opacity increase toward the outer edges; central logos remain legible. Hover pauses the motion, and offscreen/hidden-page suspension and reduced-motion alternatives remain supported.

The floating pause button is removed from the homepage and inner pages. Motion control remains available inline in the footer and in the hero's existing control. The large trailing hold space after the selected-work stack is removed; the browse-all CTA follows closely. Only the mobile hero tagline and underline use the brighter off-white treatment.

Validation: TypeScript, thirty-seven tests, production build. Logo checks verify eighteen distinct files, source-pixel preservation, non-overlapping crops, and exclusion of the sheet credit. Localhost remains unopened.
