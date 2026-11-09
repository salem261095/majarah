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
