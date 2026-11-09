# Majarra implementation phases

The website is Arabic-only. The approved order is frontend completion and approval, then backend work.

1. Arabic homepage and visual direction — implemented and iteratively refined with the user.
2. Remaining Arabic public pages — implemented: portfolio, eight project/visual-study pages, services overview, eight service pages, about, contact and branded not-found page.
3. Full Arabic frontend refinement and approval — user review of the complete site; remaining responsive, navigation and visual refinements as requested.
4. Backend and CMS — only after frontend approval. Authentication, database, media administration, actual inquiry delivery and publishing workflows.

Current implementation remains frontend-only and local. The user has asked that localhost not be opened or inspected; validation uses TypeScript, unit tests, media metadata, generated HTML and production builds.

The brand palette is `#190C89`, `#15076E`, `#0B0915`, `#14299F`, `#7D41AF`. Main type is self-hosted Noto Sans Arabic; handwriting uses self-hosted Playpen Sans Arabic. The public email is `halla@majarrah.sa`.

See [Arabic public pages](ARABIC-PUBLIC-PAGES.md) for the delivered routes, interactions and validation boundary.
