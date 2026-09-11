# Lepton Projects Website — Developer & Agent Guide

## Project Overview
This is the production Next.js codebase for **Lepton Projects Pvt. Ltd.** (lepton.co.in),
a multi-discipline engineering consultancy headquartered in Pune, India.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v3 with custom design tokens
- **Animations:** CSS-based IntersectionObserver animations (no Framer dependency required for SSR)
- **3D:** three.js + React Three Fiber + drei — procedural equipment models (no asset files)
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
  ui/
    AnimateOnScroll.tsx      # IntersectionObserver fade/slide animations
    AnimatedCounter.tsx      # Number counting animation
    Button.tsx               # Multi-variant button (link or button element)
    Icon.tsx                 # Lucide icon lookup by name string
    SectionHeader.tsx        # Reusable section header (tag, title, description)
  three/
    MachineViewer.tsx        # Public entry point — lazy mount, WebGL probe, HUD, a11y
    MachineScene.tsx         # Canvas, lighting, auto-framing, grid, callouts
    primitives.tsx           # MAT palette + Struts/boxTruss/latticeTower/handrail etc.
    registry.ts              # MachineId -> model, specs, view direction, annotations
    machineMap.ts            # project slug / service slug -> MachineId
    machines/                # One file per machine, each its own dynamic chunk
      BucketWheelReclaimer.tsx
      OverlandConveyor.tsx
      WagonTippler.tsx
      CrushingPlant.tsx
      CircularStacker.tsx
      BaghouseFilter.tsx

  sections/
    Hero.tsx                 # Homepage hero with animated stats card
    MachineShowcase.tsx      # Full-width interactive 3D equipment section
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
3. Map it to a 3D model in `components/three/machineMap.ts` (`SERVICE_MACHINE`)
4. It will auto-appear in: nav dropdown, services page, service cards

### Add a new project:
1. Edit `lib/data/projects.ts` — add entry to `PROJECTS` array
2. Map it to a 3D model in `components/three/machineMap.ts` (`PROJECT_MACHINE`).
   Unmapped slugs fall back to the overland conveyor.
3. It will auto-appear in: projects page, featured projects section (if `featured: true`)

### Add a new industry:
1. Edit `lib/data/industries.ts` — add entry
2. Add icon lookup to `Icon.tsx`
3. It auto-appears in: nav dropdown, industries page, industry cards

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

## 3D Equipment Models

Every machine is **built in code** from `components/three/primitives.tsx` — there are
no `.glb`/`.gltf` assets to load. `Struts` renders whole lattice booms and towers as a
single `InstancedMesh`, so a boom of several hundred members is one draw call.

### Adding a machine
1. Create `components/three/machines/<Name>.tsx` exporting `<Name>({ speed }: { speed?: number })`.
   **`speed === 0` must render a sensible static pose** — that is the reduced-motion path.
2. Model it about the origin standing on `y = 0`; the registry `offset` drops it onto the
   ground plane and centres it on the orbit axis (world Y).
3. Register it in `registry.ts` with a `viewDirection`, `offset`, spec chips and annotations.
   Annotation anchors are in **model space** (before `offset`).

### Framing
Cameras are **not** hand-positioned. `AutoFrame` in `MachineScene.tsx` measures the model
and solves for the distance that contains it — checking 24 azimuths so the auto-orbit never
clips — which is why the same model frames correctly in a 4:3 card, a wide hero and on a phone.
Only the *direction* of view is authored.

### Lighting
`StudioEnvironment` generates an IBL probe from three's `RoomEnvironment` in-process (no HDR
fetch). Without it, every surface with `metalness > 0` renders near-black. `scene.environmentIntensity`
is held low so the key light still does the shaping.

### Cost control
- `MachineViewer` mounts the WebGL context only when the element nears the viewport, and sets
  `frameloop="never"` when it scrolls away.
- `quality="card"` drops shadow maps and contact shadows — used for the 6-up projects grid.
- Models are dynamically imported per machine, so three.js stays out of the initial bundle.
- Falls back to the CSS blueprint backdrop when WebGL is unavailable.

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
