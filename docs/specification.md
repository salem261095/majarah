# Majarra — Complete Website Development Plan

Project specification · Version 1.0 · November 2026

Project: مجرّة | Majarra Creative & Marketing Agency\
Market: Saudi Arabia\
Languages: Arabic (RTL) and English (LTR)\
Architecture: Full-stack Next.js\
Visual direction: Premium, cinematic, controlled motion\
Primary objectives: Portfolio presentation and qualified lead generation

## 1. Project vision

Majarra's website will be a visually distinctive digital presence for a multidisciplinary creative and marketing agency.

The website must communicate two core capabilities under one brand:

- Creative production: Commercial filmmaking, photography, visual production, advertising content, and post-production.
- Marketing: Strategy, campaigns, digital marketing, brand communications, and related services.

The experience should reflect the creativity of a production agency while maintaining the commercial clarity and usability expected from a professional marketing agency.

The design principle is:

Cinematic presentation. Functional navigation. Measurable business outcomes.

### Primary success criteria

| Objective                   | Measurement                                                    |
| --------------------------- | -------------------------------------------------------------- |
| Portfolio discovery         | Project views and engagement with portfolio filters            |
| Lead generation             | Qualified contact form submissions and contact CTA conversions |
| Brand presentation          | Engagement with showreel, selected works, and services         |
| Performance                 | Core Web Vitals and actual mobile loading performance          |
| Content independence        | Team can publish projects without developer assistance         |
| International accessibility | Complete and usable Arabic and English versions                |

Initial performance targets should be validated against the final video and design requirements rather than treated as guarantees.

## 2. Visual identity and design system

Proposed visual palette based on the supplied brand references

\#190C89

\#15076E

\#0B0915

\#14299F

\#7D41AF

Primary violet · Deep violet · Midnight · Electric blue · Luminous purple

### Visual specifications

| Element    | Direction                                                             |
| ---------- | --------------------------------------------------------------------- |
| Background | Rich violet, dark purple and near-black                               |
| Typography | Expressive Arabic headings with complementary modern Latin typography |
| Imagery    | Large-format production stills and cinematic video                    |
| Gradients  | Soft blue-purple light, selectively applied                           |
| Layout     | Editorial composition, generous spacing, asymmetrical sections        |
| Animation  | Deliberate transitions tied to content and user interaction           |
| Components | Custom-designed rather than generic SaaS templates                    |
| Mobile     | Independently art-directed responsive layouts                         |

Avoid excessive blur, glowing buttons, ornamental 3D elements, repetitive fade-ins, and effects that compete with actual client work.

## 3. Website information architecture

Majarra

Home

Homepage and showreel

Our Work

Filterable portfolio

Project Details

Individual case studies

Services

Service overview

Service Details

Dedicated service pages

About

Identity and capabilities

Contact

Inquiry and lead generation

Admin Dashboard

Private content management

### Proposed URL structure

| Page      | Arabic                | English               |
| --------- | --------------------- | --------------------- |
| Home      | `/ar`                 | `/en`                 |
| Portfolio | `/ar/work`            | `/en/work`            |
| Project   | `/ar/work/[slug]`     | `/en/work/[slug]`     |
| Services  | `/ar/services`        | `/en/services`        |
| Service   | `/ar/services/[slug]` | `/en/services/[slug]` |
| About     | `/ar/about`           | `/en/about`           |
| Contact   | `/ar/contact`         | `/en/contact`         |
| Admin     | `/admin`              | —                     |

Use locale-aware routing and content dictionaries, with individual translated project and service content where appropriate. Next.js supports internationalized App Router layouts and locale routes.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://nextjs.org\&sz=32)

Next.js+1



## 4. Homepage — Detailed structure

The homepage should be an editorial journey through Majarra's capabilities, rather than a collection of unrelated decorative sections.

[What Is A Cinematographer Definition (2025) - Saturation](https://images.openai.com/static-rsc-4/dQ27dF2JG37ZtjWa2gTQAIOYJgv002JORNQp8xsxH8YHPswxugucoCHGSfYRUBrEv2VMfcXj81ofgS-3ax_UMslxAbJCn1vhpfbw0_iYbSKLXJ47Yj2PTPIzGTkQpU0Rcna4rCe6O7ohWgkcIXZ4_56yQUB9e6UIWNg2TlE7M30?purpose=inline)

01 — Cinematic hero

Full-bleed video showreel, distinctive headline, concise positioning statement, and two CTAs: Explore Our Work and Start a Project.

Background video should be muted, looped, and supported by a high-quality static poster.

[Reflektor Digital - CSS Winner](https://images.openai.com/static-rsc-4/jU5kDKMb68KidjQvHgGOdIuXQHqB-B8kg2vaUDVVtdsSafPMHLs2AnPFzoswtbW3rfEZ84ZXY-vgIgiLEKTCKEMAxmfxg-pZrlHIydLvIh_L9BWP0xwqyVKUMgVohzuyxOoMijDRmohYxLdOVfFWmcW98tJZlR5Z6M3pOoo2dQw?purpose=inline)

02 — Agency introduction

A concise statement explaining the combination of creative production and marketing expertise.

Use an expressive typographic reveal, not another full-screen video.

[Create high end luxury ai video ads for brands and products by Oceanstudioai | Fiverr](https://images.openai.com/static-rsc-4/az01ttf08aUH0tAsGtN-QMRGT14pAHNjhw7juhPDC4Qm_BTTEpVwH2MKortr9r-axP0mTINa-X9Ghzi-1aM3IdTMvp5LF3p1MLwcEJc3LEne12UONhHkatXTWv8Up2RMJZWL2CZyA8HZkd3hWEInffP59IEo8zyYNYEFE2-ZOU0?purpose=inline)

03 — Selected work

Three to six featured projects with large video or image previews, project titles, categories, and links to full case studies.

Prioritize a mix of production and marketing projects.

[I've not been great at posting on here recently! But we've been busy!  Here's a photo proving we've been busy...  Inspirational? I think so. More to follow. | Si Mason](https://images.openai.com/static-rsc-4/bGlHE3Aeny5wRg4YZ9oPwXB_-hdIC1aCTrz1O1QKCjVFpSnGXIypkL4BDixD637haeskqc8gHWiMLBrjFbnCgbbivPT7tUirXAXvG7p0-PYc_s0y46wJHSa4w-Dm6M0q_vM4K-9xnRGUHS8HRDZFVgm1rxDLsBjWjdrsvmJ5w3U?purpose=inline)

04 — Capabilities and services

Two high-level capabilities: Creative Production and Marketing, with selected services beneath each.

Use interactive cards with subtle media previews.

[Indx Creator Space | Creative Agency & Studio Space in Bangalore](https://images.openai.com/static-rsc-4/lHKoJtri5wRRUVlQ33idRQlMfqvmixOrYT3m4d7PVQHc_M4J-jiO-2bgrCO88PmyR52ssrWFgutCFe8kmvsx6QgoUpeOxUckbvLKgEpauHCxuP0EUYLUxE9DtA4Oj0atV0ZFO2EH4jwlMxofCXa1YNCXiRnIP2cEQ7N1CzkpWCo?purpose=inline)

05 — Process and approach

Communicate how Majarra takes a business objective from strategy to production, execution, and evaluation.

A restrained scroll-based timeline can support this section.

[Otimizare © 2024 :: Behance](https://images.openai.com/static-rsc-4/t1Xrc83ze-h6gg8friwj9inYGD08dxvwO4nWUBDbFVfIhnHJ8jqNap-5vUsZqvuLCLevMeXFhJBR0Pl52SwoT6FKvh0SR08HYWfdltZt_ETP7Zuw4OcuMfgki8ersxiAroF9cKxuVDqXfScN-7db3xssFkgGLc9J2WH2uIIrXLk?purpose=inline)

06 — Clients and credibility

Client logos, relevant project outcomes, and selected testimonials. Display statistics only when validated.

[belo | Your international virtual wallet](https://images.openai.com/static-rsc-4/h0ZPhVCglmnl2U2VWwFmdodWXWydkHbb7siYiPh1tw24ayfJYDuNlQBsv8HIYdP2ApxlDVZA-Vui4xsY5emXE-qXo1lH2uR3E-04hKfFa2XnTGApSD6DzvQ7aIGbBVnKipZE4ev3W1eBTigYyuM4vY_L1kdagg4HOi8WrghyMe8?purpose=inline)

07 — Final conversion section

Strong closing proposition, project inquiry CTA, direct contact options, and footer.

The final interaction should be visually strong without adding unnecessary video downloads.

The homepage should have a clear content hierarchy even when animations fail, JavaScript is delayed, or videos cannot autoplay.

## 5. Video strategy — The most important technical decision

Recommendation: Use a dedicated video platform or media CDN instead of serving all video assets directly from the Next.js application.

A landing page with many videos can produce excessive network requests, decoding overhead, memory pressure, and poor mobile performance. Video compression alone does not solve all these problems.

Next.js documentation identifies external video hosting and streaming services as useful approaches to avoid excessive app-level storage and delivery costs.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://nextjs.org\&sz=32)

Next.js+1



### Recommended architecture

Admin Dashboard

Upload project video or select existing asset

Video Processing Service

Transcoding · Streaming renditions · Poster · Playback ID

Media CDN

Delivers video to visitors

PostgreSQL

Stores metadata and references

Next.js Website

Loads posters first and video streams on demand

### Compare video delivery approaches

| Approach             | Best use                                            | Assessment                              |
| -------------------- | --------------------------------------------------- | --------------------------------------- |
| Optimized MP4 on CDN | Short decorative background loops                   | Simple and cost-conscious               |
| Mux                  | Large portfolio, admin uploads, adaptive streaming  | Recommended managed solution            |
| Cloudflare Stream    | Video-heavy projects with Cloudflare infrastructure | Strong alternative                      |
| YouTube/Vimeo embeds | Long videos and externally hosted portfolio content | Useful selectively, less visual control |

I recommend Mux for primary portfolio videos, subject to pricing and expected traffic, with the option to use optimized MP4 files for a small number of decorative loops.

Mux supports adaptive bitrate delivery, hosted video processing, direct upload workflows, thumbnails, and playback analytics.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://www.mux.com\&sz=32)

Mux+1



### Video behavior by section

| Location                | Playback                                        | Loading                                           |
| ----------------------- | ----------------------------------------------- | ------------------------------------------------- |
| Hero showreel           | Muted autoplay, loop                            | Poster immediately; video prioritized selectively |
| Featured work           | Autoplay when visible, muted                    | Defer video source until near viewport            |
| Portfolio cards         | Hover/focus preview on desktop, tap on mobile   | Poster first; source on interaction               |
| Project page            | User-initiated playback with sound and controls | Adaptive streaming                                |
| Behind-the-scenes media | Click to play                                   | Deferred loading                                  |
| Mobile hero             | Shorter video or poster fallback                | Network- and device-aware                         |

### Mandatory video optimization rules

1. Never load all homepage videos simultaneously. Create video sources only when near the viewport or when requested.
2. Keep a maximum of one prominent background video actively playing at a time. Other previews should pause when offscreen.
3. Use responsive poster images for every video; prioritize the hero poster when it is the LCP candidate.
4. Encode short decorative loops without audio tracks and keep their duration minimal.
5. Provide multiple quality levels through adaptive streaming where justified.
6. Respect `prefers-reduced-motion`, data-saving preferences where available, and browser autoplay restrictions.
7. Stop or release video resources when their components leave the active view, where appropriate.
8. Reserve fixed aspect-ratio space to prevent layout shifts.

Browser video performance guidance specifically recommends posters, deferred offscreen loading, and careful autoplay control.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://web.dev\&sz=32)

web.dev+2



### Suggested initial media budgets

These are project design targets, not standardized limits:

| Media                            | Target                                                |
| -------------------------------- | ----------------------------------------------------- |
| Hero decorative loop             | Approximately 1–3 MB for an initial optimized version |
| Portfolio thumbnail              | 50–180 KB, depending on size and format               |
| Short card preview               | Approximately 0.3–1.5 MB if actually requested        |
| Full project video               | Adaptive streaming, not a fixed file-size target      |
| Initial homepage video downloads | Ideally hero only, with other videos deferred         |

The final limits must be assessed through testing on real mobile connections and target devices. If the hero cannot meet the loading budget, a static hero poster should appear first, with video playback starting after initial rendering or user interaction.

## 6. Portfolio and case study system

The portfolio is a primary business feature, not just a gallery.

### Portfolio overview

Implement the following functionality:

- Filter projects by capability, service, industry, and media type.
- Search by project title, client, and relevant keywords.
- Featured projects and manually controlled ordering.
- Responsive card layouts with image or video previews.
- Shareable filter URLs where useful.
- Pagination or controlled incremental loading.
- Accessible keyboard and touch interactions.

### Individual project pages

Each project should support:

| Content          | Description                                      |
| ---------------- | ------------------------------------------------ |
| Project title    | Arabic and English                               |
| Client           | Client name and optional logo                    |
| Category         | Creative production, marketing, or both          |
| Services         | Services delivered                               |
| Industry         | Restaurant, retail, corporate, hospitality, etc. |
| Project overview | Background and context                           |
| Challenge        | Client's objective or problem                    |
| Solution         | Majarra's approach                               |
| Deliverables     | Video, photography, campaign assets, etc.        |
| Media gallery    | Images, videos, and mixed layouts                |
| Results          | Validated performance data, when available       |
| Related work     | Relevant projects                                |
| Contact CTA      | Inquiry about a similar project                  |

Important: Not every project should be forced into the same case-study structure. A commercial filmmaking project may emphasize its final film and production stills, while a marketing campaign may emphasize campaign objectives, creative assets, and outcomes.

The admin dashboard should support flexible sections rather than a single rigid template.

## 7. Admin dashboard and content management

Use a private, role-protected dashboard at `/admin`.

Majarra CMS — Proposed interface

Concept

# 24

Projects

# 6

Drafts

# 12

Inquiries

Recent Projects

Example data

Commercial Film

Published

Brand Campaign

Draft

Product Photography

Published

### Dashboard modules

| Module           | Required functionality                                    |
| ---------------- | --------------------------------------------------------- |
| Projects         | Create, edit, delete, publish, reorder                    |
| Media library    | Upload, organize, select, and reuse assets                |
| Video management | Upload status, playback IDs, posters, previews            |
| Services         | Manage services and translations                          |
| Clients          | Manage names, logos, and relationships                    |
| Homepage         | Manage showreel, featured projects, and selected sections |
| Inquiries        | View, filter, and update contact submissions              |
| SEO              | Edit titles, descriptions, social preview images          |
| Site settings    | Contact information, social profiles, global content      |
| Users            | Manage administrator and editor accounts                  |

### Content workflow

1. Editor creates a project in draft status.
2. Editor adds Arabic and English content, images, and videos.
3. System processes and validates uploaded media.
4. Editor previews the project in both languages.
5. Authorized user publishes the project.
6. The website refreshes affected project, listing, and homepage content.

Support draft, published, and archived states, with publishing dates and basic revision history. A preview must not make unpublished material publicly discoverable.

For the first release, use two roles: Admin and Editor. Expand permissions only if the organization actually needs more roles.

## 8. Technical architecture

### Recommended stack

| Layer                | Technology                                                      | Reason                                 |
| -------------------- | --------------------------------------------------------------- | -------------------------------------- |
| Application          | Next.js App Router + TypeScript                                 | Unified full-stack architecture        |
| Styling              | Tailwind CSS + CSS custom properties                            | Reusable responsive design system      |
| UI components        | Custom React components, selective use of accessible primitives | Brand-specific interface               |
| Animation            | GSAP + ScrollTrigger                                            | Controlled scroll choreography         |
| Micro-interactions   | CSS transitions, optional Motion library                        | Lower-complexity animations            |
| Database             | PostgreSQL                                                      | Relational data and content management |
| ORM                  | Prisma or Drizzle                                               | Typed database access                  |
| Authentication       | Auth.js or a comparable maintained solution                     | Private admin access                   |
| Media                | Mux + image storage/CDN                                         | Optimized video and image distribution |
| Internationalization | next-intl or equivalent                                         | Locale-aware content and routing       |
| Validation           | Zod                                                             | Input and schema validation            |
| Testing              | Vitest + Playwright                                             | Logic, UI, and end-to-end testing      |
| Deployment           | Node-compatible host or Vercel                                  | Production execution                   |
| Monitoring           | Error tracking + web analytics                                  | Operational visibility                 |

Use compatible, maintained stable package versions pinned at implementation time, with lockfile and security scanning. This avoids committing the architecture to an unverified version combination.

### System architecture

Public Website + Admin Dashboard

Next.js · React · TypeScript

Server Layer

Server Components · Server Actions · Route Handlers · Authorization

PostgreSQL

Structured content

Media Services

Images and video

Integrations

Analytics and email

Use Server Components for content-heavy pages and Client Components only where browser interaction is required. This reduces unnecessary client-side JavaScript.

### Proposed project directory structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx
│   │   ├── work/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── services/
│   │   ├── about/
│   │   ├── contact/
│   │   └── layout.tsx
│   ├── admin/
│   │   ├── projects/
│   │   ├── media/
│   │   ├── services/
│   │   ├── inquiries/
│   │   └── settings/
│   └── api/
│       ├── contact/
│       ├── media/
│       └── webhooks/
├── components/
│   ├── ui/
│   ├── layout/
│   ├── home/
│   ├── portfolio/
│   ├── video/
│   └── admin/
├── features/
├── lib/
│   ├── auth/
│   ├── db/
│   ├── media/
│   ├── i18n/
│   └── validation/
├── server/
│   ├── services/
│   └── repositories/
├── styles/
└── types/

```

Maintain separation between domain logic, data access, content schemas, and visual components. Project-specific UI components should not directly contain database queries.

## 9. Database and data relationships

Use a relational schema supporting translated content, flexible project layouts, and reusable media.

Projects

id · status · clientId · featured · sortOrder

ProjectTranslations

projectId · locale · title · slug · content

MediaAssets

id · type · provider · playbackId · dimensions

ProjectMedia

projectId · mediaId · position · settings

Services

id · category · status · order

ServiceTranslations

serviceId · locale · title · description

Clients

id · name · logo · website

Inquiries

id · contact · service · message · status

Users

id · email · role · credentials

SiteSettings

key · locale · structuredValue

Additional relationship tables should handle project-to-service, project-to-industry, and category assignments.

For flexible case studies, introduce a `ProjectSections` model with typed sections and ordered content blocks. Validate each section type so that flexibility does not lead to arbitrary, difficult-to-maintain data structures.

The site should also store asset ownership, media processing status, creation dates, publication dates, and audit information.

## 10. Animation and interaction specification

Animation must enhance visual hierarchy rather than become the primary navigation mechanism.

| Interaction         | Proposed implementation                                        |
| ------------------- | -------------------------------------------------------------- |
| Page navigation     | Short opacity and spatial transitions                          |
| Hero                | Controlled text introduction over video                        |
| Section reveals     | Small, purposeful transforms                                   |
| Portfolio previews  | Media reveal on hover or focus                                 |
| Project transitions | Smooth continuity between card and detail page where practical |
| Typography          | Selective line or word reveals                                 |
| Scroll sections     | Limited GSAP ScrollTrigger sequences                           |
| Mobile              | Reduced interaction complexity                                 |
| Reduced motion      | Remove nonessential movement and autoplay effects              |

### Animation constraints

- Do not use global scroll hijacking.
- Avoid long pinned sections that obstruct navigation.
- Do not animate all portfolio videos simultaneously.
- Prefer `transform` and `opacity` rather than repeatedly animating layout properties.
- Clean up animation instances when React components unmount.
- Ensure keyboard navigation, focus states, and content order remain logical.
- Provide reduced-motion equivalents that preserve all content and functionality.

Recommendation: Implement the visual design and responsive layouts first. Add animation after individual components are functionally complete.

## 11. Arabic and English support

The website must be designed for both writing directions, not merely translated after implementation.

### Requirements

- Arabic default language for the Saudi market, unless business needs dictate otherwise.
- Explicit `/ar` and `/en` paths.
- Correct `<html lang>` and `dir` attributes.
- CSS logical properties for spacing, borders, and alignment.
- Arabic and English typography tuned independently.
- Locale-aware dates, numbers, and content.
- Manual editorial translations for brand messaging and case studies.
- Language switching that preserves the equivalent page when available.
- Translation status visible inside the admin dashboard.

Do not mechanically mirror every decorative element. Images, video composition, and brand-specific graphics may need distinct arrangements in RTL and LTR layouts.

## 12. SEO and discoverability

The website needs strong technical SEO because Majarra is targeting businesses searching for creative and marketing services.

### Technical SEO

- Server-rendered or prerendered public content.
- Unique metadata in Arabic and English.
- Canonical URLs.
- Bidirectional `hreflang` references.
- XML sitemap covering published localized pages.
- Robots configuration excluding private and preview routes.
- Open Graph and social preview imagery.
- Structured data appropriate for the organization, services, and project pages.
- Descriptive image alt text, video titles, and meaningful transcripts where appropriate.
- Correct redirects and 404 handling.
- Search-friendly text supporting video-heavy sections.

### Content SEO

Build service pages around actual buyer intent. Examples include commercial video production, product photography, advertising production, marketing campaign management, and marketing strategy in Saudi Arabia.

Keyword research should determine the final titles and page structure. Avoid publishing near-identical pages solely to target variations of a keyword.

## 13. Lead generation and contact system

The contact page should help visitors begin a serious project inquiry without introducing unnecessary friction.

### Proposed form fields

| Field               | Requirement                                   |
| ------------------- | --------------------------------------------- |
| Name                | Required                                      |
| Company             | Optional                                      |
| Email               | Required                                      |
| Phone / WhatsApp    | Optional                                      |
| Interested service  | Required                                      |
| Project description | Required                                      |
| Budget range        | Optional                                      |
| Timeline            | Optional                                      |
| File attachment     | Optional, subject to security and size limits |

After submission:

1. Validate and sanitize input server-side.
2. Apply rate limiting, spam prevention, and CSRF protections where applicable.
3. Store the inquiry in PostgreSQL.
4. Send an email notification through a transactional email service.
5. Display a localized confirmation.
6. Provide a dashboard view for managing inquiry status.

Collect consent where required and define data retention and access controls, especially because the business operates in Saudi Arabia.

### Conversion tracking

Track meaningful events such as contact submission, project inquiry, WhatsApp click, portfolio-to-contact navigation, and service inquiry.

For video engagement, measure user-initiated plays and completion events separately from automatic decorative playback. Otherwise, autoplay can inflate engagement statistics.

## 14. Security and operational requirements

These are requirements for the initial production release, not optional future enhancements.

| Area           | Requirement                                                |
| -------------- | ---------------------------------------------------------- |
| Authentication | Secure login, protected sessions, strong password handling |
| Authorization  | Server-side permissions on every admin mutation            |
| Database       | Managed backups, migration process, least-privilege access |
| File uploads   | Type validation, size limits, secure provider upload URLs  |
| Video webhooks | Verify signatures and handle repeated events idempotently  |
| Contact forms  | Validation, rate limiting, anti-spam measures              |
| Secrets        | Environment variables and dedicated secret management      |
| Monitoring     | Error logging and production alerts                        |
| Deployment     | Separate staging and production environments               |
| Recovery       | Documented restore procedure and backup testing            |

For admin access, multi-factor authentication is desirable, especially if multiple staff members manage client content.

## 15. Performance and quality targets

Use the following as acceptance objectives for real-user measurement:

| Metric                          | Target                                         |
| ------------------------------- | ---------------------------------------------- |
| Largest Contentful Paint (LCP)  | ≤ 2.5 seconds at 75th percentile               |
| Interaction to Next Paint (INP) | ≤ 200 ms at 75th percentile                    |
| Cumulative Layout Shift (CLS)   | ≤ 0.1 at 75th percentile                       |
| Lighthouse accessibility        | ≥ 90 as a project quality target               |
| Critical navigation             | Fully usable without video playback            |
| Portfolio loading               | Progressive loading without excessive requests |
| Mobile experience               | No uncontrolled simultaneous video playback    |

Performance results should be evaluated separately for mobile and desktop. Lighthouse scores are useful diagnostics but do not replace real-user Core Web Vitals.

### Testing coverage

Test on desktop Chrome, Safari, Firefox, mobile Safari, and Android Chrome. Include slow mobile connections, low-powered devices, RTL/LTR layouts, reduced-motion settings, missing translations, failed video requests, and unavailable media services.

## 16. Implementation roadmap

The recommended delivery sequence separates architecture, core functionality, content integration, and visual refinement.

Phase 01Discovery and specificationApproved requirements and sitemap

- Confirm services and information architecture
- Inventory available client projects and videos
- Finalize content fields and translation rules
- Define measurable acceptance criteria

Phase 02Design system and UXComplete responsive UI specification

- Create typography and color tokens
- Design desktop and mobile layouts
- Design portfolio and project templates
- Specify animation behavior and reduced-motion alternatives

Phase 03Core application foundationWorking application foundation

- Initialize Next.js application
- Configure database and authentication
- Implement locale routing
- Build shared layout and navigation
- Establish staging and CI

Phase 04CMS and portfolioFunctional content management system

- Build project and service data models
- Implement admin CRUD workflows
- Implement media upload and processing integration
- Build project previews and publication workflow

Phase 05Public website and animationComplete public-facing website

- Develop homepage and inner pages
- Build portfolio filters and case studies
- Integrate video playback strategy
- Implement controlled motion and responsive behavior

Phase 06SEO, leads and quality assuranceRelease candidate

- Implement contact workflow and analytics
- Configure metadata and sitemaps
- Run accessibility and security tests
- Optimize videos and Core Web Vitals
- Validate both languages

Phase 07Deployment and handoverProduction release and handover

- Production deployment and smoke testing
- Configure backups and monitoring
- Prepare editor documentation
- Train content administrators
- Complete final acceptance checks

### Recommended delivery priority

P0 — Initial release

Required

Homepage, portfolio, case studies, services, about, contact, two languages, admin dashboard, secure media integration, SEO, analytics, and essential optimization.

P1 — Refinement

After core release

Advanced project transitions, enhanced media gallery interactions, richer editorial modules, advanced search, and expanded admin reporting.

P2 — Future expansion

Optional

CRM integrations, campaign landing-page builder, client portal, sophisticated content scheduling, or additional languages.

No calendar dates are assigned yet because the project team, content availability, and resource constraints have not been established.

## 17. Release acceptance checklist

Production readiness

0/14 verified

Homepage functions in Arabic and English

Every navigation link resolves correctly

Portfolio filters and search operate correctly

Project pages support both media and structured content

Admins can publish and update projects independently

Video uploads and processing failures are handled

Offscreen videos do not initiate unnecessary playback

Mobile layouts work across target viewport sizes

Contact submissions are stored and notifications delivered

Admin routes and mutations enforce authorization

SEO metadata and localized URLs are correct

Core Web Vitals are evaluated with realistic media

Accessibility and reduced-motion behavior are tested

Production backup, monitoring, and recovery are configured

## 18. Final architecture decisions

These are my recommended technical defaults for Majarra:

| Decision            | Recommendation                                                    |
| ------------------- | ----------------------------------------------------------------- |
| Rendering           | Hybrid static/server rendering with targeted client interactivity |
| Main video platform | Mux                                                               |
| Decorative video    | Optimized short loops, delivered via CDN                          |
| Main database       | PostgreSQL                                                        |
| Content management  | Custom Next.js admin                                              |
| Localization        | Route-based `/ar` and `/en`                                       |
| Animation           | GSAP, with native CSS for simpler transitions                     |
| Admin uploads       | Direct-to-provider uploads                                        |
| Hosting             | Node-compatible infrastructure with CDN                           |
| Content publishing  | Draft → Preview → Publish                                         |
| Video performance   | Poster-first, visibility-aware playback                           |

### Remaining decisions before implementation

The following still require concrete input: final services list, official brand fonts and assets, hosting provider, available project/media inventory, approximate monthly traffic, media storage budget, and who will maintain content.

The largest architectural uncertainty is video volume. A homepage with 5–10 short decorative videos has different operational requirements from an agency managing hundreds of 4K commercials. Both are feasible, but the upload pipeline, delivery configuration, storage economics, and CMS complexity differ.

My recommended approach: Build Majarra as a full-stack content-driven agency platform, keep video processing outside the application server, and prioritize reliable media delivery and responsive performance before implementing advanced cinematic transitions.

The result should feel like a premium production studio while operating as a professional marketing agency website with reliable portfolio management and conversion tracking.