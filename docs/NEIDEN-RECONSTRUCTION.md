# Neiden reference reconstruction

Active entrypoints: `/ar` and `/ar/home-1` now render `NeidenHome`, a separate component with its own `ni-` CSS namespace. The earlier homepage implementations are retained but are not rendered by these entrypoints.

## Direct reference inspection

Reviewed the live [Neiden homepage](https://neiden.framer.media/) through screenshots, scrolling, DOM geometry, and computed presentation styles. Inspected the actual hero, introduction, service chapter, portfolio cover transitions, Highlights heading, full-screen showreel, and its zoom-out into a 3×3 mosaic.

Desktop reference viewport: 1280×720.

| Element | Observed geometry / behavior | Reconstruction |
| --- | --- | --- |
| Navigation | 44 px white header, brand at left, links centered/right, fixed top-right menu button | Same physical structure with Majarra text and local links |
| Hero | 676 px below header, 40 px gutters, three equal columns, enormous wordmark, supporting content primarily in middle/right columns | Same grid and placement; Majarra wordmark is fitted across the available width using SVG textLength |
| Background | Continuous monochrome abstract field with grain | Original locally rendered toroidal field with grain; not the reference's media file |
| Introduction | White, 850 px section, 150 px vertical padding, statement overlaps opposing images | Matching section dimensions and overlap pattern; supplied Majarra images |
| Services | 1/3 sticky heading rail and 2/3 stacked content; ~300 px paired imagery; wide detail rows | Replaces the prior disclosure-only layout with the reference's stacked panel structure |
| Portfolio | Dark, three metadata columns; nearly full-viewport landscape covers, soft enlarged image backgrounds | Four local landscape-video scenes, descriptive metadata without fabricated client/year claims |
| More work | 1/3 section rail, 2/3 numbered rows | Retained with Majarra content |
| Highlights | Small label/copy in the first third, enormous heading over the remaining two thirds | Reconstructed as `مختارات.` |
| Showreel | Sticky full-screen center tile, title overlay, scales back to a 3×3 collage; final center play button | GSAP zoom-out to a 3×3 mosaic using new local posters and a moving center tile; play opens a silent manual reel |

Opening: bounded black brand beat, blurred central Majarra wordmark, small sharp bottom signature, hero entrance sequenced after completion. Skip, Escape, and reduced motion remain supported.

Main Arabic font stays Noto Sans Arabic. The tagline uses the self-hosted open-source Aref Ruqaa font to provide actual calligraphic contrast; its license is preserved beside the font. Majarra purple replaces the reference's red accent. No Neiden brand artwork, copy, testimonials, metrics, or media was copied into the site.

## Supplied media

Inspected both dimensions and two timed frames for all ten files in `public/canva-videos/new`. All are landscape and have no audio. Five-second optimized copies and posters use descriptive names in `public/media/neiden/`. Originals remain untouched; all visible markings remain in the footage. These are presented as a visual library rather than assigned invented client commissions.

Mapping:

- P130025 → falcon-heritage
- P160124 → shawarma-craft
- P165352 → traditional-dance
- P188111 → headset-preparation
- P386238 → samosa-detail
- P391275 → saudi-dining
- P434232 → gaming-session
- P475349 → family-dining
- P520706 → modern-workspace
- P54092 → coffee-portrait

The contact email remains `halla@majarah.sa`. Forms remain frontend-only, with local summary preparation and an explicit email handoff. Everything stays silent.

## Verification limits

The reference was directly inspected. Per the user's instruction, localhost was not opened or inspected. TypeScript, production build, existing playback tests, and ffprobe metadata checks validate implementation and media integrity. Exact pixel/frame identity is not verified; the abstract field is original, text and font metrics are Arabic, and only one prominent loop plays at a time.
