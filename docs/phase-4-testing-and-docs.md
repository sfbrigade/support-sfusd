# Phase 4 – Testing and Documentation

**Goal:** Full regression across every user-facing feature, analytics integration, and infrastructure concern. Document the new App Router structure so future contributors understand where things live and why.

**Prerequisite:** Phases 1–3 are complete. `src/pages/` has been deleted. `npm run build` passes cleanly.

---

## Regression test checklist

### Navigation and routing

- [ ] `/` home page loads; "Explore Schools" button navigates to `/map`
- [ ] `/map` loads; back-button from a school page returns to `/map` (browser history works)
- [ ] `/about` loads
- [ ] `/image-preview` loads
- [ ] `/school/[stub]` loads for a known valid stub (e.g. `/school/glen-park-elementary`)
- [ ] `/school/does-not-exist` serves the custom 404 page (not a blank/crash page)
- [ ] `/review` returns 404 (intentionally removed)
- [ ] Old URL `/school?stub=glen-park-elementary` returns 404 (new URL is `/school/[stub]`)
- [ ] Refreshing any route directly (no client navigation) returns the correct page (SSR/SSG working)
- [ ] Deep-linking to a school URL from an external source works (no "hydration error" in console)

### NavBar

- [ ] NavBar background is **transparent** on `/`
- [ ] NavBar background is `bg-[#D7F1FF]` on `/map`
- [ ] NavBar background is `bg-white drop-shadow` on `/about`
- [ ] NavBar background is `bg-white drop-shadow` on `/school/[stub]`
- [ ] Logo click navigates to `/`
- [ ] "About Us" link navigates to `/about`
- [ ] NavBar does not flash the wrong background on soft navigation

### Banner

- [ ] Banner is visible on `/` (home)
- [ ] Banner is visible on `/school/[stub]`
- [ ] Banner is **not** visible on `/map` or `/about`
- [ ] "feedback/questions" button in banner opens the Contact Us modal
- [ ] Contact Us modal can be closed; form can be submitted
- [ ] Mobile close button (×) dismisses the banner; banner does not reappear on next render
- [ ] Banner state does not bleed between routes (dismissing on home should not affect school page)

### Map page (`/map`)

- [ ] Map centres on San Francisco; panning is bounded to SF area
- [ ] All school markers load; clustering works at zoom < 14
- [ ] Geolocate button shows device location (allow location access in browser)
- [ ] Navigation controls (zoom ±) work
- [ ] Selecting a school marker highlights it and shows the school card panel (desktop) or overlaid card (mobile)
- [ ] School card on desktop has a link to the school page; clicking opens `/school/[stub]`
- [ ] School card on mobile is itself a link to the school page
- [ ] Closing the school card deselects the school
- [ ] Toggling Map ↔ List view works; `MapContext.isMapView` updates
- [ ] List view renders all filtered schools as cards
- [ ] Search bar filters schools in real time; selecting a dropdown item selects the school on the map
- [ ] School type filters (Elementary, Middle, High) filter correctly and can be combined
- [ ] Priority filter shows only priority schools when checked
- [ ] Filter state persists in `sessionStorage` across page refreshes
- [ ] Mobile filter drawer opens/closes; Reset clears all filters; Apply closes the drawer
- [ ] High Priority info modal opens from the school card and from the priority filter label

### School page (`/school/[stub]`)

- [ ] Banner image renders at full width
- [ ] School logo renders in the overlapping position (top-left of content area)
- [ ] School header shows name, principal, address, contact info
- [ ] About section renders with bullet points
- [ ] Student outcomes section shows only when `category === "outcome"` metrics exist; hidden otherwise
- [ ] Volunteer section renders; volunteer form link opens externally
- [ ] Donation section renders; donation link opens externally
- [ ] Testimonial section shows only when `school.testimonial` is set
- [ ] Embedded YouTube player shows only when `school.notable_video` is set
- [ ] Visiting a school page with no matching stub shows `not-found.tsx` (custom 404)
- [ ] "Browse Schools" link in 404 navigates to `/map`
- [ ] Page loads with correct `<title>` tag (check DevTools)
- [ ] Loading spinner shows on slow connections (throttle in DevTools → Slow 3G)

### API routes

- [ ] `GET /api/searchSchools?searchTerm=glen` returns matching schools as JSON
- [ ] `GET /api/searchSchools?searchTerm=` (empty term) returns all schools
- [ ] `GET /api/school/glen-park-elementary` returns the school with metrics and programs
- [ ] `GET /api/school/does-not-exist` returns `{ error: "School not found" }` with status 404

### Fonts

- [ ] Fredoka One renders on headings (home page `<h1>`)
- [ ] Lato renders on body text
- [ ] Inter renders on NavBar and general UI
- [ ] No FOUT (flash of unstyled text) on first load — font CSS variables are set on `<html>` in `app/layout.tsx`

### SEO / metadata

Run these checks with `curl http://localhost:3000/[route]` and inspect the raw HTML, or use browser DevTools → Elements:

| Route | Expected `<title>` | Expected OG description |
|-------|---------------------|-------------------------|
| `/` | `Support SF Schools - Home` | site default description |
| `/map` | `Support SF Schools - School Map` | site default description |
| `/about` | `Support SF Schools - About` | about page description |
| `/school/[stub]` | `Support SF Schools - [Name] Profile` | school-specific description |

- [ ] `<link rel="canonical">` is present on all routes (set via metadata if desired)
- [ ] `og:title`, `og:description`, `og:image` are populated on all routes
- [ ] Favicon (`logo_icon.ico`) shows in browser tab

### Analytics

- [ ] PostHog: open browser DevTools → Network, filter by `us.posthog.com`. Verify:
  - `pageview` event fires on home page load
  - `explore_schools_clicked` fires on button click
  - `map_view_toggled` fires when switching map/list
  - `searched_for_school` fires when typing in search bar
  - `selected_school_from_search` fires when picking a dropdown result
  - `map_marker_clicked` fires when clicking a map marker
  - `high_priority_modal_opened` fires when opening the priority info modal
  - `contact_us_form_opened` fires when clicking the banner feedback link
- [ ] PostHog rewrites in `next.config.js` proxy `/ingest/*` correctly (requests should show `localhost` as host, not `us.posthog.com` — they go through Next.js rewrites)

### Build and static generation

- [ ] `npm run build` completes without errors
- [ ] Build output shows `app/school/[stub]` pages pre-rendered (listed under "Static" or "SSG" in the build output)
- [ ] `generateStaticParams` produces the expected number of school stubs (compare against DB count)
- [ ] Sitemap: `npm run build` → `http://localhost:3000/sitemap.xml` lists all school URLs in `/school/[stub]` format

### Accessibility

- [ ] Map markers have `aria-label` attributes (verify in DevTools → Accessibility panel)
- [ ] NavBar links are keyboard-navigable (Tab, Enter)
- [ ] Modal dialogs (Contact Us, High Priority, filter drawer) trap focus while open
- [ ] BackToTop button is reachable via keyboard
- [ ] Colour contrast meets WCAG AA on all primary text elements

---

## Documentation updates

### Update `README.md`

Add or update a section describing the App Router structure:

```
## Project Structure

src/
├── app/                          # App Router (all routes)
│   ├── layout.tsx                # Root layout: fonts, providers, global CSS
│   ├── providers.tsx             # "use client" — PostHog, MapProvider, ToastProvider
│   ├── page.tsx                  # / (home) — server shell
│   ├── HomeClient.tsx            # / — interactive client component
│   ├── about/
│   │   ├── page.tsx              # /about — server shell with metadata
│   │   └── AboutClient.tsx       # /about — client component
│   ├── image-preview/
│   │   └── page.tsx              # /image-preview — client component (canvas)
│   ├── map/
│   │   └── page.tsx              # /map — server fetches schools, renders MapPageClient
│   ├── school/
│   │   └── [stub]/
│   │       ├── page.tsx          # /school/[stub] — server; generateStaticParams + generateMetadata
│   │       └── loading.tsx       # Loading UI for school page
│   ├── api/
│   │   ├── searchSchools/
│   │   │   └── route.ts          # GET /api/searchSchools?searchTerm=
│   │   └── school/
│   │       └── [stub]/
│   │           └── route.ts      # GET /api/school/[stub]
│   ├── sitemap.ts                # /sitemap.xml — dynamic, generated from Prisma
│   ├── robots.ts                 # /robots.txt
│   └── not-found.tsx             # Global 404 page
├── components/
│   ├── MapPageClient.tsx         # "use client" — full map UI and state
│   ├── SchoolPageClient.tsx      # "use client" — school detail view
│   └── ...                       # Other shared components
├── layouts/
│   └── RootLayout.tsx            # "use client" — NavBar, Banner, BackToTop wrapper
├── contexts/
│   ├── MapContext.tsx            # MapProvider + useMapContext hook
│   └── Toast/
│       └── ToastContext.tsx      # ToastProvider + useToast hook
└── lib/
    ├── prisma.ts                 # Singleton PrismaClient (server-only)
    └── ...
```

### Server vs client boundary reference

Add a short note to `README.md` (or a separate `ARCHITECTURE.md`) explaining the boundaries:

```
## Server vs Client

**Server components** (no "use client"):
- app/layout.tsx, app/page.tsx, app/about/page.tsx, app/map/page.tsx
- app/school/[stub]/page.tsx
- These fetch data with Prisma directly; never imported into client components.

**Client components** ("use client"):
- app/providers.tsx — PostHog init, all context providers
- app/HomeClient.tsx, app/about/AboutClient.tsx, app/image-preview/page.tsx
- src/components/MapPageClient.tsx — map state, sessionStorage, filters
- src/components/SchoolPageClient.tsx — school detail view
- src/layouts/RootLayout.tsx — NavBar, Banner (depends on usePathname, useMapContext)
- src/components/NavBar.tsx — route-dependent background

**Key rule:** Never import `lib/prisma.ts` from a client component.
```

### Update CLAUDE.md (if present)

If the project has a `CLAUDE.md`, update it to note:
- The app is now fully on the App Router
- School URLs are `/school/[stub]` (not `/school?stub=...`)
- The `src/pages/` directory no longer exists
