# Majarra asset library

- `clients/`: eighteen standalone SVG logo crops from the user-provided sheet.
- `images/`: referenced, optimized images and reference photographs.
- `videos/`: silent, optimized films used by the website.
- `posters/`: matching immediate-loading video posters.
- `originals/images/`: matched original Canva images, renamed without changing their bytes.
- `originals/videos/`: matched original Canva clips, renamed without changing their bytes. The website plays the optimized files in `videos/`.

Application paths are registered in `src/lib/assets.ts`. The project migration log is `docs/asset-migration.json`, containing each old path, new path, role, original-source relationship, byte count and SHA-256 hash. Unused source media remains outside this library in its original folders.
