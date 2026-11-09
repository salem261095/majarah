# Typography and chapter rhythm

The design uses Majarra's palette, monochrome imagery, asymmetric RTL grids, large native Arabic wordmarks, and handwritten contrast. The hierarchy is based on content roles rather than the reference site's individual section sizes.

## Fonts

- Main copy and native wordmarks: existing Noto Sans Arabic.
- Hero tagline and footer handwritten line: Playpen Sans Arabic, weight 500. Downloaded from the official Google Fonts repository and self-hosted as `public/fonts/playpen-sans-arabic.ttf`, with its SIL OFL license alongside it.
- Source: https://fonts.google.com/specimen/Playpen+Sans+Arabic

## Shared roles

Defined in `src/app/typography.css`:

| Role | Responsive range | Use |
| --- | --- | --- |
| Section title | 36–80 px | Every chapter's h2 |
| Subheading | 24–38 px | Services, projects, process cards |
| Lead | 18–24 px | Short editorial supporting statements |
| Body | 16–18 px | Descriptions, form inputs |
| Label | 14–16 px | Eyebrows, navigation, actions, deliverables |
| Metadata | 12–14 px | Numbers, credits, categories, motion control |

The oversized brand signature is intentionally outside this scale. Wordmarks resize through their font size, preserving Arabic glyph proportions. Arabic tracking remains normal. Headlines use a 1.3 line height; body copy uses 1.7. Handwriting uses 1.4 to preserve marks and ascenders.

## Chapter structure

The reusable `SectionHeading` in `src/components/majarrah-home.tsx` renders a right-hand numbered index and short description, then a two-thirds title column. It is used for the introduction, services, portfolio, showreel introduction, process, and contact. On phones the index, copy, and title stack in reading order. The same type roles continue through the smaller work list, footer, dialogs, and form.

Services retain a subordinate sticky index below the full-width chapter header. Process stages form a connected grid: four columns on desktop, two on tablet, one on phones. Video playback behavior is unchanged.

No localhost preview was opened. Verification: font metadata/license, TypeScript, and production compilation.
