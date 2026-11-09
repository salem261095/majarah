# Marketing services replacement

The former «مزيد من الأعمال» chapter (04) is replaced in place by «الخدمات التسويقية», under the heading «حضورٌ أذكى. وأثرٌ يمتد.».

Content was reviewed at the user's previous website: https://cliks.com.sa/ar/#services

Four groups adapt its service areas to Majarra's voice:

1. Campaigns and digital management: paid campaigns, SEO, influencers, social channels.
2. Strategy and brand: brand positioning, marketing plans, research, campaign planning.
3. Marketing technology and content: websites/stores, copywriting, graphic design, analytics.
4. Training and experience: customer experience, service, sales processes, marketing teams.

Four full-width numbered rows show large titles, short descriptions, and circular plus controls. Native details/summary controls expand each group’s four capabilities, with keyboard support and a reduced-motion fallback. The screenshot supplied by the user guides the row structure; existing section-heading and eyebrow components remain unchanged. Descriptions are rewritten; no old-brand contacts, partnership claims, certifications, or outcome guarantees are carried over. The section uses existing heading/type tokens, RTL, dark surfaces, fine borders, restrained reveals, and a contact action. It stacks on phones.

All other homepage sections remain in their current order. No backend or localhost preview.

Creative services in chapter 02 now cover films, photography, montage/color, and short-form video only. Strategy, campaigns, digital management, websites, training, and analytics are grouped in chapter 04. These are separate sections; marketing is no longer nested inside selected work. The production media-panel layout remains.

A stale selected-work media directory was corrected from `/media/neiden` to the existing `/media/showcase` folder. Selected work keeps three original Canva-derived clips plus the workspace clip derived from `public/canva-videos/new/arabsstock_P520706.mp4`. All four films decode successfully and have posters. Shared media references are in `src/lib/home-media.ts`, with regression checks for selected work, creative services, hero strip, and showreel assets.
