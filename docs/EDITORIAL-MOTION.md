# Selected homepage: scroll motion and supplied project media

Scope: `/ar` and `/ar/home-1` only. Options 2 and 3 remain archived alternatives. No backend or audio integration.

## Media inspection

Inspected dimensions/durations/audio streams for all 27 supplied MP4s, created a contact sheet of every clip, then inspected three timed frames for each shortlisted source. Also inspected dimensions and contact sheets for all 32 supplied project images. Review artifacts and inventories are in `docs/media-review/`.

Videos: 21 × 9:16, one × 4:5, three × 4:3, two × 16:9. All original MP4s contain audio. Four site-ready excerpts were made with audio streams removed, H.264 encoding, 24 fps, fast-start metadata, and half-second keyframe spacing. Original files remain untouched.

| Descriptive site asset | Original video | Intended layout |
| --- | --- | --- |
| `hero-studio.mp4` | `e150e667d03be8555a6d992ceee1ccc0.mp4` | 960×540, monochrome hospitality hero, 7 s, ~715 KB |
| `portrait-motion.mp4` | `6e4bda96d78f5c6cbd59f4bebfc93756.mp4` | 540×960, intact 9:16 fitness film, scroll controlled, 8 s, ~1.35 MB |
| `food-craft.mp4` | `216215bba195a9b6bc66619dac0b5dec.mp4` | 640×800, intact 4:5 food preparation, 7 s, ~1.68 MB |
| `table-details.mp4` | `e6515b12f921385163d486b73b838412.mp4` | 800×600, intact 4:3 tabletop/print details, 5.5 s, ~636 KB |

Seven selected images were converted to descriptive WebP copies under `public/media/editorial/`. Source filenames and dimensions remain in `docs/media-review/images.json`. The five gallery images preserve their original composition; their entire frames move subtly rather than being enlarged into landscape crops. The baking photograph replaces the illustrative desert image inside the introduction.

## Choreography

- The hero wordmark dissolves and blurs as it leaves the viewport.
- Arabic headings reveal whole words in sequence. Joined glyphs are never split into letters. Accessible text is exposed once with `aria-label`; decorative word spans are hidden from assistive technology.
- Paragraphs/labels fade and blur on entry and exit. These are persistent, reversible scroll envelopes rather than a one-time intersection fade.
- Photograph frames move with viewport progress; decorative insets also scale.
- A native sticky portrait composition maps scroll position to the fitness clip's `currentTime`. Scrolling backward rewinds it. Native document scrolling remains intact.
- The other selected videos loop silently only near the viewport; a shared coordinator allows only one visible loop to play at a time. A visible scrub story pauses looping footage.
- Sources are assigned near the viewport. Posters remain when autoplay fails, media fails, reduced motion is requested, or data saving is enabled.
- The existing motion toggle stops motion and restores readable static text. Reduced motion also removes the tall sticky scroll stage.
- Project images open an accessible, full-composition image dialog.

## Verification

Five unit tests cover reveal visibility, reverse-scroll symmetry, exit fade bounds, video scrub mapping, and timeline clamping. TypeScript and production build validate the integration. `ffprobe` verifies dimensions, durations, and absence of audio streams in all four derived videos. No localhost browsing was performed, per user instruction; actual browser scroll feel and playback require user visual review.
