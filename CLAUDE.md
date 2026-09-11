# Lepton Projects Website — Developer & Agent Guide

## Project Overview
This is the production Next.js codebase for **Lepton Projects Pvt. Ltd.** (lepton.co.in),
a multi-discipline engineering consultancy headquartered in Pune, India.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v3 with custom design tokens
- **Animations:** CSS/IntersectionObserver for page transitions; **anime.js v4** for the
  animated technical equipment elevations
- **Icons:** Lucide React
- **Forms:** React Hook Form (optional — currently inline state)
- **Fonts:** Inter (body) + Manrope (display/headings) via Google Fonts

## Project Structure

```
app/                         # Next.js App Router
  layout.tsx                 # Root layout — metadata, fonts, Header, Footer
  page.tsx                   # Homepage (all sections composed here)
  globals.css                # Design tokens, component classes, animations
  about/page.tsx
  services/
    page.tsx                 # Services list
    [slug]/page.tsx          # Individual service detail
  projects/
    page.tsx                 # Portfolio (client-side filter)
    [slug]/page.tsx          # Project detail
  industries/page.tsx
  contact/page.tsx
  careers/page.tsx
  request-quote/page.tsx
  privacy/page.tsx
  not-found.tsx
  error.tsx
  sitemap.ts                 # Auto-generated XML sitemap
  robots.ts

components/
  layout/
    Header.tsx               # Sticky nav with dropdown menus + mobile drawer
    Footer.tsx               # Full footer with nav links, contact, certifications
  anime/
    MachineDiagram.tsx       # Public entry point — one timeline drives every diagram
    diagrams.tsx             # Six machine elevations, marked up declaratively
    technical.tsx            # SVG geometry helpers (truss, tower, spokes, hopper…)
    registry.ts              # DiagramId -> elevation, specs, callouts
    machineMap.ts            # project slug / service slug -> DiagramId
  ui/
    AnimateOnScroll.tsx      # IntersectionObserver fade/slide animations
    AnimatedCounter.tsx      # Number counting animation
    Button.tsx               # Multi-variant button (link or button element)
    Icon.tsx                 # Lucide icon lookup by name string
    SectionHeader.tsx        # Reusable section header (tag, title, description)
  sections/
    Hero.tsx                 # Homepage hero with animated stats card
    Stats.tsx                # Company stats with AnimatedCounter
    ServicesOverview.tsx     # 6-card service grid
    WhyChooseUs.tsx          # 8-reason grid + sticky quote panel
    FeaturedProjects.tsx     # Featured project cards (dark navy)
    IndustriesSection.tsx    # 6-industry card grid
    Process.tsx              # 6-step delivery process
    Testimonials.tsx         # Interactive testimonial carousel
    Certifications.tsx       # ISO certs + client logos
    CTABanner.tsx            # Reusable CTA section (3 variants)
    ContactForm.tsx          # Contact page form with validation
    QuoteForm.tsx            # Multi-step quote request form

lib/
  data/
    company.ts               # Brand constants, stats, certifications, clients
    services.ts              # 6 engineering services
    projects.ts              # 6 portfolio projects
    industries.ts            # 6 industry verticals
    team.ts                  # Leadership + team bios
    testimonials.ts          # 6 client testimonials
  utils.ts                   # cn(), formatNumber(), slugify()
```

## Color System

| Token | Hex | Usage |
|-------|-----|-------|
| `navy-950` | `#060F1C` | Hero/dark section backgrounds |
| `navy-900` | `#0B1D35` | Primary dark background |
| `orange-500`| `#F05A28` | Primary CTA, accent |
| `orange-600`| `#D44A1A` | CTA hover |
| `gold-500`  | `#C9A84C` | Secondary accent, gradient |
| `slate-50`  | `#F8FAFC` | Light section background |

## Design Principles
1. **Mobile-first:** All layouts start at mobile and scale up
2. **Semantic HTML:** Proper heading hierarchy, landmark elements, aria labels
3. **Dark hero sections** with the navy palette; **light body sections** alternate between `white` and `slate-50`
4. **Orange accents** on every interactive element (hover states, CTAs, icon hover)
5. **No inline styles** except for `clamp()` font sizes
6. **Scroll animations** use `IntersectionObserver` (no layout shift)

## Development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # Production build
npm run lint         # ESLint
```

## Adding New Content

### Add a new service:
1. Edit `lib/data/services.ts` — add entry to `SERVICES` array
2. Add icon lookup to `components/ui/Icon.tsx`
3. It will auto-appear in: nav dropdown, services page, service cards

### Add a new project:
1. Edit `lib/data/projects.ts` — add entry to `PROJECTS` array
2. It will auto-appear in: projects page, featured projects section (if `featured: true`)

### Add a new industry:
1. Edit `lib/data/industries.ts` — add entry
2. Add icon lookup to `Icon.tsx`
3. It auto-appears in: nav dropdown, industries page, industry cards

## Animated Equipment Elevations

Six technical side elevations, drawn as SVG and animated with **anime.js v4**. No WebGL
and no image assets, so they cost almost nothing and render identically everywhere.

### The declarative convention
`MachineDiagram.tsx` contains *no per-machine choreography*. It reads data attributes off
whatever elevation it is given:

| Attribute | Effect |
|---|---|
| `data-draw="<order>"` | Stroke draws itself on, low order first |
| `data-part="dx,dy"`   | Starts offset by (dx,dy) and slides home — the exploded-assembly reveal |
| `data-spin="<secs>"`  | Rotates forever about its own centre |
| `data-flow="<secs>"` + `data-fx` / `data-fy` | Material travels one lump-spacing along the belt and repeats. `fx`/`fy` **must match the belt's slope**, or the stream slides off it |
| `data-pulse`          | Slow opacity breathing |

Adding a machine therefore means writing an elevation in `diagrams.tsx` and registering
it — never touching the animator.

### anime.js v4, not v3
The API changed: it is **`ease`, not `easing`** (v4 silently ignores `easing`), `stagger`
comes from the root export, scroll triggering is `autoplay: onScroll({ … repeat: false })`,
and stroke drawing is `svg.createDrawable()` animating a `draw: '0 1'` property. Copying a
v3 snippet will run without erroring and simply not animate.

### Reduced motion
`prefers-reduced-motion` skips the choreography and sets the finished drawing directly —
the elevation is still fully legible, just static.

## SEO Checklist
- [x] `generateMetadata()` on every page
- [x] `layout.tsx` OG metadata, Twitter card, JSON-LD Organization schema
- [x] `sitemap.ts` auto-generates from data files
- [x] `robots.ts` configured
- [x] Semantic HTML heading hierarchy (h1 per page)
- [x] Alt text on all images
- [x] Preconnect for Google Fonts
- [x] Security headers in `next.config.ts`
- [x] Canonical URLs
- [ ] TODO: Add Google site verification token
- [ ] TODO: Create public/og-image.png (1200×630)
- [ ] TODO: Create public/logo.png for JSON-LD

## Performance
- Next.js Image component (lazy loading, AVIF/WebP)
- Inter + Manrope loaded via `next/font` (no layout shift)
- CSS animations (no JS animation library overhead)
- `compress: true` in next.config
- Static params for all `[slug]` routes (no runtime SSR for known slugs)

## Accessibility
- Skip-to-main-content link in root layout
- `focus-visible` ring on all interactive elements
- ARIA labels on icon buttons (nav toggle, carousel controls)
- Colour contrast: all text meets WCAG AA
- Mobile menu traps focus, closes on route change / ESC
