# Critique log

Rendered with `~/.claude/skills/concept-first-design/scripts/webshot` at iPhone 393 and laptop 1440 (WebKit).

## Pass 1 (r1)
Blocking
- Every row in the home register read LP-000: projects serialised into the client component lost
  identity, so `indexOf` returned -1. → refs are now computed once in `lib/lepton.ts`.
- A–F grid refs sat in normal flow and pushed the header down by about 100 px (`.sheet > *` overrode
  `position:absolute`). → `.sheet > :not(.grid-refs)`.
Weak
- The Rule #2 revision cloud overlapped its label. → tighter cloud, Δ marker moved to the corner.

## Pass 2 (r2)
Blocking
- Company page claimed "169+ people", a sum of the organograms that contradicts the deck's "~135".
  → the total is removed; departments are shown as published.
- Mobile: grid numbers still visible (specificity), route schematic unreadable at 393 px, the cloud
  overflowed the right edge. → refs hidden, schematic scrolls inside its own frame, cloud inset on mobile.
Weak
- Number grids left half-empty rows (auto-fill). → explicit 3/4/5 column variants.
- Inner-page H1s wrapped to 6 lines. → `.display.sm`.
- Render tool: CSS animations don't advance offscreen, and lazy images never load. → webshot now
  finishes animations and switches lazy images to eager before each shot.

## Pass 3 (r4/r5) · user feedback
- User asked for motion in the hero photo. → `PlateCarousel`: 8 real project plates, slow push-in,
  dimension line re-plots, callout per plate, scale-bar progress, pause on hover/focus, no autoplay
  under reduced motion, keyboard arrows.
- QCC section repeated the carousel's "restored" photo. → the deck's after-collapse photo instead.

## Checklist, final
No card grids, gradients, glass, icon circles, logo walls or testimonial carousels. Every number traces
to the deck. Section rhythm varies: split hero → title block → section drawing → register → rules +
dimension bars → revision table → full-bleed works.
Known gaps: email/website (`info@lepton.co.in`, `lepton.co.in`) come from the old codebase, not the
deck. No phone number. Logo is a 289 px raster (ask for the vector).
