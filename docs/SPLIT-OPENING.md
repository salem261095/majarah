# Opposing split reveal and favicon cursor

The black opening is two physical, vertical half-screen panels. Both contain a clipped copy of the same complete Arabic wordmark, so the letters retain their natural shaping while the halves separate. After the brief blur-to-sharp brand beat, the left panel moves up 101% and the right panel moves down 101%, simultaneously over 1.2 seconds. The hero's existing entrance sequence begins when the panels start moving.

Skip, Escape, reduced-motion handling, restoration of the body's previous scroll state, a JavaScript timeout, and a CSS-only timeout remain available. The page is not faded out as the panels move; the opening wrapper is transparent behind its two black panels.

On fine-pointer, hover-capable devices, the native cursor uses a 32-pixel copy of `src/app/icon.svg`, served at `public/brand-cursor.svg`. Its hotspot is centered. Input fields retain the text cursor and disabled controls retain their disabled cursor. Touch devices retain native behavior. Native cursor rendering avoids adding another animation loop.

Checks: generated Next route types, TypeScript, and production build. No localhost browser preview.
