# Studio editorial spread

The «الاستوديو» section is rebuilt as a dedicated `StudioSection` component. Its shared numbered eyebrow, heading scale, palette, natural Arabic typography, and RTL reading order remain consistent with the rest of the homepage.

The new body is a twelve-column spread: a dominant monochrome craft image spans seven columns on the right, an empty column creates separation, and a quiet four-column reading area sits on the left. That column contains a short lead, the existing studio description, two concise principles, and a small typographic signature. A fine rule closes the section with a handwritten line and a services link. On phones the figure, text, and closing line stack naturally.

The existing real craft photograph is intentionally cropped around the hand and dough; its caption identifies it as part of Majarra's visual library. No fabricated team imagery, testimonials, or metrics are introduced.

Scoped GSAP effects progressively read the headline, reveal the main image before the supporting copy, and introduce the closing line. Pause preserves the current state; reduced-motion uses a static equivalent. Shared `SectionHeading` and `SectionStamp` markup is extracted without changing the other sections' appearance. The old studio-specific animations are removed from the page-wide lifecycle.

No hero, showreel, services, portfolio, or footer redesign. No backend or localhost preview.
