# Arabic-only routing and creative-service video motion

The user's Arabic-only decision supersedes the bilingual proposal in the original specification and older phase notes.

- Canonical pages are `/`, `/work`, `/services`, `/about`, `/contact`, and their project/service detail URLs.
- The dynamic `[locale]` directory, locale validation/parameters, English switch and language-control CSS are removed.
- The root document retains `lang="ar"` and `dir="rtl"`.
- Navigation, breadcrumbs, project/service links and inquiry links use root URLs.
- Existing `/ar` links redirect permanently to the corresponding canonical page. `/ar/home-1` redirects to `/`.
- No English routes, locale dictionaries or alternate-language metadata are introduced.

Creative production's paired video frames have an independent scoped GSAP component. As the row enters the viewport, its frames move in from the physical left. Each frame's original colors progressively return on entry, hold in the viewing region, and fade to grayscale as it exits. The same behavior reverses when scrolling back. Naturally monochrome source footage keeps its original monochrome appearance.

The existing grouped playback, lazy loading and solid brand background remain. Pause and reduced-motion preferences show stationary, readable frames with their original colors. The hero, selected-work stack and showreel retain their own behavior.

Validation: TypeScript, 34 tests, production build and generated-route/link checks. Localhost is not opened.
