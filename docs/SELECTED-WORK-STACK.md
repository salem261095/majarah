# Selected work: sequential overlapping stack

Scope: «أعمال مختارة» only. The reference's selected-work area was inspected at https://kairotemplate.framer.website/. Its project links use native sticky positioning and increasing layer order. Majarra applies that mechanism with a shared top position, matching the requested single stack.

Each project is an opaque, viewport-fitting card below the compact header. It scrolls into position and stays there while later cards rise over it. All four share the same landing point and increase in z-index. The final project holds briefly before the stack exits into marketing. Existing media, ambient backdrops, metadata, typography, RTL order, and project dialogs remain.

The previous individual project entrance transforms are removed so they do not conflict with native sticky positioning. The card sizes adapt to desktop, mobile, and short screens. Reduced motion displays the same projects as a normal readable list.

Video visibility subtracts the area covered by a later opaque project. This prevents the first sticky video's geometry from incorrectly keeping it playing beneath the other cards. The visibility calculation remains unchanged for hero and showreel media without a project layer. Keyboard focus brings its selected card into view before activating its dialog.

Implementation: `SelectedWorkStack`, its section-scoped stylesheet, and an opt-in project-layer visibility calculation. No changes to hero, studio, services, marketing, showreel, process, or footer.

Checks: TypeScript, 20 playback/media/visibility tests, production build. Localhost remains unopened.
