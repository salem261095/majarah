# Asset migration — 9 November 2026

The active root application was scanned, including public-page data, homepage manifests, video component URL construction, ambient poster layers, image references, and tests. No application layout, copy or media contents were redesigned as part of this migration.

## Result

60 existing files were moved and given descriptive names under `public/assets`:

| Role | Count | Folder |
| --- | --- | --- |
| Runtime videos | 16 | `videos/` |
| Matching posters | 16 | `posters/` |
| Referenced images | 8 | `images/` |
| Matched Canva video originals | 16 | `originals/videos/` |
| Matched Canva image originals | 4 | `originals/images/` |

The runtime files preserve their optimized encodings. All runtime films remain silent. Originals preserve their original encoding and audio tracks. Four optimized images were matched to their raw Canva sources using thumbnail comparisons; each match was substantially closer than the other candidates. Video source relationships come from the existing source inventories.

All moves are recorded in [asset-migration.json](asset-migration.json), including before/after paths, original-source relationships, byte sizes and SHA-256 checksums. Every moved file is verified byte-for-byte unchanged. Unused source files and unused older derivatives remain in their original locations; no unrelated assets were deleted. Fonts and the favicon cursor remain where they were.

`src/lib/assets.ts` is the canonical runtime path registry. Stable logical IDs keep project routes and component props intact. The video player, project ambient posters, showreel backgrounds, portfolio images, shared reference images and tests now resolve paths through it. Source-review inventories include the new locations of moved originals.

The obsolete service compatibility adapter was also reduced to a re-export of the current shared service exports, correcting the pre-existing content-module mismatch encountered during verification. No service copy or layout was changed.

## Validation

- No legacy `/media`, `/images`, `/canva-images`, or `/canva-videos` URLs in active application code.
- 34 tests pass, including complete asset-path checks and all 60 move checksums.
- TypeScript and production build pass.
- All 16 runtime videos pass metadata checks and have no audio stream.
- Generated HTML is checked against the new asset URLs.
- The separate `majarra/` scaffold is not part of the active root application and is unchanged.
- Localhost is not opened or inspected.
