// Canonical runtime paths. Logical media IDs are stable across file reorganizations.
export const videoAssets = {
  "editorial": {
    "beads-detail": {
      "src": "/assets/videos/prayer-beads-closeup.mp4",
      "poster": "/assets/posters/prayer-beads-closeup.jpg"
    },
    "burger-craft": {
      "src": "/assets/videos/burger-preparation.mp4",
      "poster": "/assets/posters/burger-preparation.jpg"
    },
    "cafe-conversation": {
      "src": "/assets/videos/cafe-hospitality-conversation.mp4",
      "poster": "/assets/posters/cafe-hospitality-conversation.jpg"
    },
    "hospitality-arrival": {
      "src": "/assets/videos/hospitality-entrance.mp4",
      "poster": "/assets/posters/hospitality-entrance.jpg"
    },
    "invitation-detail": {
      "src": "/assets/videos/invitation-paper-details.mp4",
      "poster": "/assets/posters/invitation-paper-details.jpg"
    },
    "lantern-story": {
      "src": "/assets/videos/ramadan-lantern.mp4",
      "poster": "/assets/posters/ramadan-lantern.jpg"
    },
    "monochrome-craft": {
      "src": "/assets/videos/cinematic-hands-monochrome.mp4",
      "poster": "/assets/posters/cinematic-hands-monochrome.jpg"
    },
    "neon-fries": {
      "src": "/assets/videos/fries-neon-sign.mp4",
      "poster": "/assets/posters/fries-neon-sign.jpg"
    },
    "pasta-craft": {
      "src": "/assets/videos/pasta-preparation.mp4",
      "poster": "/assets/posters/pasta-preparation.jpg"
    },
    "saffron-table": {
      "src": "/assets/videos/saffron-rice-table.mp4",
      "poster": "/assets/posters/saffron-rice-table.jpg"
    },
    "training-moment": {
      "src": "/assets/videos/fitness-training.mp4",
      "poster": "/assets/posters/fitness-training.jpg"
    }
  },
  "showcase": {
    "falcon-heritage": {
      "src": "/assets/videos/saudi-falcon-heritage.mp4",
      "poster": "/assets/posters/saudi-falcon-heritage.jpg"
    },
    "gaming-session": {
      "src": "/assets/videos/gaming-session.mp4",
      "poster": "/assets/posters/gaming-session.jpg"
    },
    "modern-workspace": {
      "src": "/assets/videos/modern-office-interior.mp4",
      "poster": "/assets/posters/modern-office-interior.jpg"
    },
    "samosa-detail": {
      "src": "/assets/videos/samosa-preparation.mp4",
      "poster": "/assets/posters/samosa-preparation.jpg"
    },
    "shawarma-craft": {
      "src": "/assets/videos/shawarma-roasting.mp4",
      "poster": "/assets/posters/shawarma-roasting.jpg"
    }
  }
} as const;

export const imageAssets = {
  "berry-icecream-campaign": "/assets/images/berry-cups-icecream.webp",
  "crispy-chicken-photography": "/assets/images/crispy-chicken-campaign.webp",
  "healthy-food-campaign": "/assets/images/ananas-healthy-meal.webp",
  "prayer-beads-gift-box": "/assets/images/gift-box-prayer-beads.webp",
  "reference-architecture": "/assets/images/architecture-study.jpg",
  "reference-desert": "/assets/images/desert-landscape.jpg",
  "reference-food": "/assets/images/food-table-styling.jpg",
  "reference-heritage": "/assets/images/heritage-architecture.jpg"
} as const;

export type VideoDirectory=keyof typeof videoAssets;
export type VideoAsset={readonly src:string;readonly poster:string};
export function getVideoAsset(name:string,directory:VideoDirectory='editorial'):VideoAsset{
 const group:Readonly<Record<string,VideoAsset>>=videoAssets[directory];
 const asset=group[name];
 if(!asset)throw new Error(`Unknown video asset: ${directory}/${name}`);
 return asset;
}

export { clientLogos } from './client-logos';
