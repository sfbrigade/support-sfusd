# Phase 3 – Cleanup and Optimization

**Goal:** Remove all Pages Router scaffolding that is no longer needed, tighten up the Next.js configuration, and add missing App Router utilities (`robots.ts`, `not-found.tsx` if not done in Phase 2). By the end of this phase the codebase is fully on the App Router with no Pages Router remnants.

**Prerequisite:** All routes from Phase 1 and Phase 2 are confirmed working and the entire `src/pages/` directory was deleted at the end of Phase 2.

---

## Overview of changes

| Action | File |
|--------|------|
| CREATE | `src/app/robots.ts` |
| MODIFY | `next.config.js` – review `images.unoptimized` |
| MODIFY | `tailwind.config.ts` – remove `pages/` from content paths |
| DELETE | `scripts/generate-sitemap.ts` *(now replaced by `app/sitemap.ts`)* |
| DELETE | `src/components/SEO.tsx` *(fully replaced by `metadata` / `generateMetadata`)* |

---

## Files to create

### `src/app/robots.ts`

Next.js 13+ can serve `robots.txt` automatically from a `robots.ts` file in the app directory. This replaces any manually maintained `public/robots.txt` (if one exists).

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://supportsfschools.org/sitemap.xml",
  };
}
```

**Check first:** If `public/robots.txt` exists, delete it — the file-based `public/robots.txt` and the programmatic `app/robots.ts` will conflict.

```bash
ls public/robots.txt
# If it exists: rm public/robots.txt
```

---

## Files to modify

### `next.config.js` — review `images.unoptimized`

Currently the config disables Next.js image optimisation globally:

```js
// next.config.js (current)
images: {
  unoptimized: true,
},
```

This was likely set to avoid issues in a specific deploy environment (Vercel Postgres / static export). Now that the app is fully on the App Router with server-side rendering, consider re-enabling optimisation.

**Option A – Re-enable optimisation (recommended if deploying to Vercel):**

```diff
-images: {
-  unoptimized: true,
-},
+// images: {} – rely on Next.js defaults; Vercel handles optimisation automatically
```

After removing `unoptimized: true`, run `npm run build` and test that school banner images and logo images render correctly. Watch for any `<Image>` components that pass `src` as an external URL without being listed in `remotePatterns`.

**Option B – Keep `unoptimized: true`:**

If your deploy target does not support the image optimisation server (e.g. a plain Node.js or Docker environment without a CDN), keep the setting and document the reason inline.

---

### `tailwind.config.ts` — remove `pages/` from content paths

With `src/pages/` deleted, the `pages/**` glob in Tailwind's `content` array is now dead weight. Remove it so Tailwind doesn't scan a directory that no longer exists (this also slightly speeds up CSS generation).

```diff
 content: [
-  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
   "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
   "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
   "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
 ],
```

---

## Files to delete

### `scripts/generate-sitemap.ts`

The sitemap is now generated dynamically by `src/app/sitemap.ts`. The script is no longer called from any npm script (removed in Phase 2) and can be deleted.

```bash
rm scripts/generate-sitemap.ts
```

Also check if the script imported any helper modules only used for sitemap generation and remove those too:

```bash
grep -r "generate-sitemap" src/ scripts/ package.json
# Should return nothing after deletion
```

---

### `src/components/SEO.tsx`

This component used `next/head` and `useRouter` to inject meta tags. The entire pattern is replaced by:
- `export const metadata` in static pages (`app/page.tsx`, `app/about/page.tsx`, `app/map/page.tsx`)
- `export async function generateMetadata()` in dynamic pages (`app/school/[stub]/page.tsx`)

Before deleting, verify no remaining imports exist:

```bash
grep -r "from.*SEO" src/
grep -r "import SEO" src/
# Should return nothing
```

Then delete:

```bash
rm src/components/SEO.tsx
```

---

## Verification checklist

### Configuration
- [ ] `npm run build` completes without errors or warnings about missing directories
- [ ] Tailwind CSS still applies correctly on all pages (fonts, colours, spacing)
- [ ] PostHog rewrites in `next.config.js` still function (check Network tab: `/ingest/*` requests should proxy correctly)

### Image optimisation (if `unoptimized` was removed)
- [ ] Home page background image loads
- [ ] School banner images (`/school-images/full/[stub].webp`) load and are optimised
- [ ] School logo images (`/school-images/logo/[stub].webp`) load
- [ ] About page team member photos load with blur placeholder
- [ ] No `Error: Invalid src prop` console errors (would indicate missing `remotePatterns`)

### SEO / metadata
- [ ] `<title>` tag is correct on every route in browser DevTools:
  - `/` → `"Support SF Schools - Home"`
  - `/map` → `"Support SF Schools - School Map"`
  - `/about` → `"Support SF Schools - About"`
  - `/school/[stub]` → `"Support SF Schools - [School Name] Profile"`
- [ ] `<meta name="description">` is populated on all routes
- [ ] Favicon appears in browser tab (uses `logo_icon.ico`)
- [ ] OG tags present (check with a link preview tool or `curl` the HTML)

### Robots and sitemap
- [ ] `http://localhost:3000/robots.txt` returns valid robots file pointing to sitemap URL
- [ ] `http://localhost:3000/sitemap.xml` is still accessible and valid
- [ ] No `public/robots.txt` conflict (should have been removed if it existed)

### Dead code removed
- [ ] `grep -r "from.*SEO"` returns nothing in `src/`
- [ ] `grep -r "generate-sitemap"` returns nothing in `package.json` and `scripts/`
- [ ] `grep -r "next/router"` returns nothing in `src/` (all usages migrated to `next/navigation`)
- [ ] `grep -r "next/head"` returns nothing in `src/` (all usages replaced by metadata API)
- [ ] `grep -r "getStaticProps\|getServerSideProps"` returns nothing in `src/`
- [ ] `ls src/pages/` — directory should not exist
