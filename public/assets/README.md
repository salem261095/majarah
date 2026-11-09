# Majarra asset library

- `clients/`: eighteen standalone SVG logo crops from the user-provided sheet.
- `images/`: referenced, optimized images and reference photographs.
- `videos/landscape/`: registered landscape films.
- `videos/portrait/`: portrait films and user-provided source clips; the website uses the registered silent previews.
- `posters/`: matching immediate-loading video posters.
- `originals/images/`: matched original Canva images, renamed without changing their bytes.
- `originals/videos/`: matched original Canva clips, renamed without changing their bytes. The website plays the optimized files in `videos/`.

Application paths are registered in `src/lib/assets.ts`. The project migration log is `docs/asset-migration.json`, containing each old path, new path, role, original-source relationship, byte count and SHA-256 hash. Unused source media remains outside this library in its original folders.


Selected work uses four dedicated 540×960 silent eight-second mobile previews, generated from `anah.mp4`, `max.mp4`, `buters.mp4` and `buters2.mp4`. Their uploads are preserved unchanged. Existing desktop clips retain their bytes and now resolve through the reorganized landscape folder. The canonical registry selects the active orientation; unregistered uploads are not fetched by the page.
