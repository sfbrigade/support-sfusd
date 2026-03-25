# Pages Router → App Router Transition Plan

This document outlines what to consider when upgrading Support SF Schools from the Next.js **Pages Router** to the **App Router**, based on the current `package.json`, architecture, routes, components, and server/client split.

---

## 1. Current State Summary

### 1.1 Stack
- **Next.js** 16.1.6, **React** 19.2.4
- **Prisma** 5.13 (DB access in API routes and `getStaticProps`)
- **PostHog** (browser + React provider), **Plausible** (script in `_document`)
- **Tailwind**, **next/font** (Fredoka, Lato, Inter), **SVGR** for SVGs

### 1.2 Routes (Pages)
| Route | File | Data / behavior |
|-------|------|------------------|
| `/` | `pages/index.tsx` | Static; uses `useRouter`, PostHog |
| `/map` | `pages/map.tsx` | **getStaticProps** (Prisma schools); heavy client state (map, filters, sessionStorage) |
| `/school` | `pages/school.tsx` | **Query params** `name` + `stub`; client `fetch` to `/api/school/[stub]` |
| `/about` | `pages/about.tsx` | Static; client state (contact form) |
| `/review` | `pages/review.tsx` | Static; links to `/review/K5`, `/review/MS`, `/review/HS` (no pages exist for these) |
| `/image-preview` | `pages/image-preview.tsx` | **"use client"**; canvas/browser APIs |

### 1.3 API Routes
- `pages/api/searchSchools.ts` – GET, Prisma search by name
- `pages/api/school/[stub].ts` – GET, Prisma find by stub

### 1.4 App shell
- **`_app.tsx`**: Global CSS, fonts (Fredoka, Lato), `<Head>`, `MapProvider` → `ToastProvider` → `Layout` → `PostHogProvider` → `Component`
- **`_document.tsx`**: Custom `<Html>`, `<Head>` (favicon, Plausible, duplicate font links), `<body>`
- **`RootLayout`** (in `layouts/`): `useRouter` (pathname), `useMapContext`, NavBar, conditional Banner, BackToTop

### 1.5 Server vs client
- **Server-only today**: `getStaticProps` on `/map` (Prisma), API route handlers
- **Client**: Everything else; only `image-preview.tsx` is explicitly `"use client"`
- **SEO**: `SEO` component uses `next/head` + `useRouter.asPath` for canonical/OG

---

## 2. What to Consider When Upgrading

### 2.1 Deprecated or changed in App Router

| Current (Pages) | App Router approach |
|-----------------|---------------------|
| **`next/head`** | **`metadata`** export and **`generateMetadata()`** in `layout.tsx` / `page.tsx`; no `<Head>` in components |
| **`next/router`** (`useRouter`, `router.query`, `router.events`) | **`next/navigation`**: `useRouter()`, `usePathname()`, `useSearchParams()`; **no `router.events`** – use `usePathname()` + effects for route-dependent UI |
| **`getStaticProps` / `getServerSideProps`** | **Async Server Components** (fetch/Prisma in server component) or **Route Handlers** for API-style endpoints |
| **`_document.tsx`** | **`app/layout.tsx`** – root `<html>`, `<body>`, global scripts; no custom Document class |
| **`_app.tsx`** | **`app/layout.tsx`** – root layout with providers and default metadata |
| **API route** `export default function handler(req, res)` | **Route Handler**: `app/api/.../route.ts` with `GET(req, context)` etc., return `NextResponse.json()` |
| **Query params for school** (`/school?name=...&stub=...`) | Prefer **dynamic segment** `/school/[stub]` for clearer URLs, SEO, and static generation (optional but recommended) |

### 2.2 Client boundary (“use client”)

- Any component that uses **`useState`**, **`useEffect`**, **`useContext`**, **`useRouter`** (from `next/router` or `next/navigation` for client behavior), **browser APIs** (e.g. `sessionStorage`, `window`), or **event handlers** that need to run in the browser must be a **Client Component** (`"use client"` at top).
- **Today**: Only `image-preview.tsx` has `"use client"`. In practice, `_app` + layout + most pages use hooks; in App Router you’ll explicitly mark:
  - Root layout wrapper that does PostHog init, MapProvider, ToastProvider, and the current “Layout” (NavBar, Banner, etc.) as client, **or** split so the root `layout.tsx` is server and only the provider/UI shell is a client component.
  - Pages that rely on `useRouter`, `useMapContext`, or client state (e.g. `map`, `school`, `about`, `index`) as client components or composed with client children.
- **Map page**: Fetches data via `getStaticProps`; in App Router you can keep the **page** as a Server Component that fetches schools and passes them to a **client** `<MapPageClient>` that holds map state, filters, and sessionStorage.

### 2.3 New optimizations to adopt

- **Server Components by default**: Use async `page.tsx` / `layout.tsx` for data fetching (e.g. map initial schools, school by stub) where you don’t need client state.
- **Streaming**: Let the root layout and loading UI stream; add `loading.tsx` where useful (e.g. `app/school/[stub]/loading.tsx`).
- **Metadata API**: Replace `<SEO>` + `next/head` with **`metadata`** / **`generateMetadata`** so metadata is generated on the server and avoids client-only canonical URLs where possible.
- **Route Handlers**: Replace Pages API routes with **`app/api/.../route.ts`**; same Prisma singleton works.
- **Optional: `/school/[stub]`**  
  - Cleaner URLs, better for SEO and sharing.  
  - Use **`generateStaticParams`** + async page to pre-render school pages at build time (with Prisma).  
  - Update internal links (map, list, sitemap) from `/school?name=...&stub=...` to `/school/[stub]`.
- **Images**: You currently have `images: { unoptimized: true }`. After migration, consider re-enabling default Next.js image optimization and remove `unoptimized` if no longer required.
- **Sitemap**: Use **`app/sitemap.ts`** (dynamic) or keep the existing script; if you move to `/school/[stub]`, sitemap URLs should be updated to the new pattern.

### 2.4 Specific migration notes

- **Fonts**: Move `Fredoka`, `Lato`, `Inter` from `_app` into `app/layout.tsx` and apply via `className` (e.g. `className={fredoka.variable}`) on a wrapper; remove duplicate Google Fonts `<link>` from `_document`.
- **PostHog**: Keep init in a **client** component (e.g. `PostHogProvider` wrapper) that mounts once in the root layout; same pattern as today, just under `app/layout.tsx`.
- **Plausible**: Move the script into `app/layout.tsx` (e.g. in `<head>` or via a small client component that injects it).
- **NavBar**: Uses `router.events.on("routeChangeComplete")` and `router.route`. Replace with **`usePathname()`** from `next/navigation` and run your “on route change” logic in a `useEffect` that depends on `pathname`.
- **RootLayout**: Depends on `pathname` and `useMapContext`; will be a client component and can use `usePathname()`.
- **SEO component**: In App Router, remove per-page `<SEO>` and use **`metadata`** / **`generateMetadata`** in each route segment; for canonical/OG URL use the request URL or `generateMetadata({ params, searchParams })` where applicable.
- **Prisma**: Existing singleton in `lib/prisma` is fine for Server Components and Route Handlers; avoid using it in Client Components (they can’t run on server-only code).
- **Build script**: `generate-sitemap` runs before `next build`. If you switch to `app/sitemap.ts`, you can remove the script from the build step or keep it for a static fallback; if you keep it, update school URLs if you move to `/school/[stub]`.
- **Review sub-routes**: `/review/K5`, `/review/MS`, `/review/HS` are linked but have no Pages files. Decide whether to add `app/review/[slug]/page.tsx` or remove/change those links.

---

## 3. Suggested transition plan (phased)

### Phase 1 – Foundation (no URL changes)
1. Add **`app/`** directory and **root `app/layout.tsx`** (replace `_document` + `_app`): global CSS, fonts, default metadata, body class, client wrappers for PostHog, MapProvider, ToastProvider, and current Layout (NavBar, Banner, BackToTop).
2. Implement **Route Handlers** for existing APIs:
   - `app/api/searchSchools/route.ts`
   - `app/api/school/[stub]/route.ts`
3. Migrate **static/simple pages** first (no data fetching):
   - `app/page.tsx` (home),
   - `app/about/page.tsx`,
   - `app/review/page.tsx`,
   - `app/image-preview/page.tsx` (keep as client component).
4. Replace **`next/router`** with **`next/navigation`** in migrated routes and in shared components (NavBar, RootLayout, SEO replacement). Replace **`router.events`** with **`usePathname()`** + effect.
5. Replace **`<SEO>` + `next/head`** with **`metadata`** / **`generateMetadata`** in each new `app/...` page/layout.

### Phase 2 – Data-driven pages
6. **Map**: Add `app/map/page.tsx` as an async Server Component that fetches schools (Prisma) and renders a client `<MapPageClient>` with current map UI and state. Remove `getStaticProps` from the old page.
7. **School**:  
   - **Option A (minimal change):** Add `app/school/page.tsx` that reads `searchParams.name` and `searchParams.stub` and either fetches in server component (Prisma by stub) or keeps a thin client wrapper that fetches from `GET /api/school/[stub]`.  
   - **Option B (recommended):** Introduce **`app/school/[stub]/page.tsx`**, fetch school by `params.stub` in the server component, add `generateStaticParams` if you want static school pages. Update all links and sitemap to `/school/[stub]`.

### Phase 3 – Cleanup and optimization
8. Remove **`pages/`** directory (and `_app`, `_document`, all page and API files) once all routes and APIs are served from `app/`.
9. **Next config**: Confirm `skipTrailingSlashRedirect` and PostHog rewrites still work; consider removing `images.unoptimized` and testing image optimization.
10. **Sitemap**: Either implement **`app/sitemap.ts`** (and optionally `app/robots.ts`) or update the existing script to the new URL scheme and keep it in the build.
11. **Review**: Add `app/review/[slug]/page.tsx` for K5/MS/HS or adjust links.

### Phase 4 – Testing and docs
12. Full regression: navigation, map filters (and sessionStorage), school page (by query or by stub), API usage, PostHog/Plausible, fonts, SEO (titles, canonical, OG).
13. Update README or internal docs to describe App Router structure and where server vs client boundaries live.

---

## 4. File mapping (reference)

| Current | App Router (suggested) |
|---------|------------------------|
| `pages/_document.tsx` | `app/layout.tsx` (html, body, global scripts) |
| `pages/_app.tsx` | `app/layout.tsx` (providers, fonts, default metadata) |
| `pages/index.tsx` | `app/page.tsx` |
| `pages/map.tsx` | `app/map/page.tsx` + client component for map UI |
| `pages/school.tsx` | `app/school/page.tsx` (query) or `app/school/[stub]/page.tsx` |
| `pages/about.tsx` | `app/about/page.tsx` |
| `pages/review.tsx` | `app/review/page.tsx` |
| `pages/image-preview.tsx` | `app/image-preview/page.tsx` ("use client" or client child) |
| `pages/api/searchSchools.ts` | `app/api/searchSchools/route.ts` |
| `pages/api/school/[stub].ts` | `app/api/school/[stub]/route.ts` |
| `layouts/RootLayout.tsx` | Client component used inside `app/layout.tsx` |
| `components/SEO.tsx` | Replaced by `metadata` / `generateMetadata` in layouts/pages |

---

## 5. Risk and dependency notes

- **Next.js 16**: App Router is stable; ensure no reliance on deprecated Pages-only APIs.
- **PostHog / Plausible**: Verify tracking and rewrites work under App Router (no change expected if init stays in client layout).
- **Prisma**: No change; keep single Prisma instance for server usage only.
- **Query params**: If you keep `/school?name=...&stub=...`, **`useSearchParams()`** in a client component can replace `router.query`; for server components use `searchParams` prop on the page.

This plan should give you a clear, ordered set of steps and considerations for moving from the Pages Router to the App Router while preserving behavior and adopting server components and metadata where beneficial.
