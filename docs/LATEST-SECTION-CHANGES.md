# Studio removal and creative-services media

The user-supplied screenshot identifies the studio's image-and-text spread. That entire block is removed: craft image, caption, supporting lead/body, principles, and small signature. The shared studio heading, introduction, scroll-reading treatment, and closing line remain. Its obsolete reveal targets and CSS are removed.

Creative production retains its existing paired-media layout. Every former landscape image is now a real, silent 16:9 video derived from the supplied `public/canva-videos/new` folder:

| Panel | Landscape film | Original source |
| --- | --- | --- |
| Films | falcon-heritage | arabsstock_P130025.mp4 |
| Photography | samosa-detail | arabsstock_P386238.mp4 |
| Montage/color | gaming-session | arabsstock_P434232.mp4 |
| Short-form video | shawarma-craft | arabsstock_P160124.mp4 |

Each panel's two visible videos share a playback group. Existing lazy loading, offscreen suspension, manual playback priority, pause, and reduced-motion behavior remain supported. Asset tests now check both films and posters rather than a film and a supporting image.

The service background is the solid brand color `#15076E`. The gradient layer and animation are removed. This supersedes the earlier gradient design and studio spread documents.

Checks: TypeScript, 20 tests, four clips' landscape dimensions and lack of audio, production build. No localhost preview.
