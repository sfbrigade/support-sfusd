# Phase 2b – Map Page

**Goal:** Migrate the map route to the App Router, delete the remaining `pages/` files, and fully retire the Pages Router.

**Merge order:** Phase 2b should merge **after** Phase 2a (School Pages). By the time this PR is written, school links in map components will already point to `/school/[stub]` — no link updates needed here.

**Prerequisites from Phase 2a:**
- `/school/[stub]` route is live
- School links in `SchoolCardMap.tsx`, `MapListCard.tsx`, and `pages/map.tsx` already updated
- `package.json` sitemap scripts already removed

---

## Overview of changes

| Action | File |
|--------|------|
| CREATE | `src/app/map/page.tsx` |
| CREATE | `src/components/MapPageClient.tsx` |
| DELETE | `src/pages/map.tsx` *(replaced by app/ version)* |
| DELETE | `src/pages/_app.tsx` *(no remaining pages/ routes)* |
| DELETE | `src/pages/_document.tsx` *(no remaining pages/ routes)* |

After all deletions, `src/pages/` should be empty and can be removed.

---

## Files to create

### `src/app/map/page.tsx`

An **async Server Component** that fetches all schools from Prisma at request time (replaces `getStaticProps`) and passes the data to `MapPageClient`. Metadata is exported here.

**Why server component?** Prisma runs only on the server, and fetching here avoids a client-side waterfall. The heavy interactive logic stays in `MapPageClient`.

```tsx
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import MapPageClient from "@/components/MapPageClient";

export const metadata: Metadata = {
  title: "Support SF Schools - School Map",
};

export default async function MapPage() {
  const schools = await prisma.school.findMany({
    include: {
      metrics: true,
      programs: true,
    },
  });

  return <MapPageClient schools={schools} />;
}
```

---

### `src/components/MapPageClient.tsx`

The existing `pages/map.tsx` component, extracted to a client component. This is the bulk of the migration work.

**Changes from `pages/map.tsx`:**
1. `"use client"` directive added at top
2. `GetStaticProps` export and the `getStaticProps` function removed entirely
3. `prisma` import removed (data comes via props from the server component)
4. `<SEO>` import and usage removed (metadata is in `app/map/page.tsx`)
5. School card link already points to `/school/[stub]` (updated in Phase 2a)

**Note:** By the time this PR is written, `pages/map.tsx` will already have the corrected `/school/[stub]` link from Phase 2a. Just copy the file as-is and apply the changes listed above.

```tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "mapbox-gl/dist/mapbox-gl.css";
import { School, DropdownItem } from "@/types/school";
import SchoolCard from "@/components/SchoolCardMap";
import MapList from "@/components/MapList";
import MapboxMap from "@/components/MapboxMap";
import ToggleButton from "@/components/ToggleButton";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import HighPriorityModal from "@/components/HighPriorityModal";
import { useMapContext } from "@/contexts/MapContext";
import { SchoolType } from "@prisma/client";
import FilterBySchoolType from "@/components/FilterBySchoolType";
import { usePostHog } from "posthog-js/react";

// Removed: GetStaticProps import, prisma import, getStaticProps function, SEO import

type Props = {
  schools: School[];
};

const schoolCardPlaceholderTitle = "Select a School";
const schoolCardPlaceholderText =
  "All schools are looking for volunteers and donations. Click on the school closest to you to learn more.";

const MapPageClient: React.FC<Props> = (props) => {
  // All state and handlers copied verbatim from pages/map.tsx
  const { isMapView, selectedSchool, setIsMapView, setSelectedSchool } =
    useMapContext();
  // ... rest of state unchanged ...

  return (
    <>
      {/* <SEO> removed — metadata is in app/map/page.tsx */}
      <div className="flex h-full flex-col bg-[#D7F1FF]">
        {/* ... all JSX unchanged ... */}
        {/* School card link already uses /school/[stub] from Phase 2a */}
      </div>
    </>
  );
};

export default MapPageClient;
```

**The full component body is a direct copy of `pages/map.tsx`** with only the removals listed above. No JSX changes beyond removing `<SEO>`.

---

## Files to delete

Once `app/map/page.tsx` is confirmed working:

| File | Reason |
|------|--------|
| `src/pages/map.tsx` | Replaced by `src/app/map/page.tsx` + `src/components/MapPageClient.tsx` |
| `src/pages/_app.tsx` | No remaining pages/ routes — all routes now served by App Router |
| `src/pages/_document.tsx` | No remaining pages/ routes — fonts and analytics already in `app/layout.tsx` |

After deleting all of the above, remove the `src/pages/` directory:

```bash
ls src/pages/
# Should output: No such file or directory
```

---

## What does NOT change in this phase

These files were already handled in Phase 2a and require **no modification** here:

- `src/components/SchoolCardMap.tsx` — links already updated
- `src/components/MapListCard.tsx` — links already updated
- `src/app/sitemap.ts` — already created
- `src/app/not-found.tsx` — already created
- `package.json` — sitemap scripts already removed

These files are unchanged across both phases:

- `src/layouts/RootLayout.tsx` — `usePathname()` checks already handle new URL patterns
- `src/components/NavBar.tsx` — `startsWith("/school")` covers `/school/[stub]`; `/map` check unchanged
- `src/app/layout.tsx` — no changes needed

---

## Verification checklist

### Map page (`/map`)
- [ ] School map loads and centers on San Francisco
- [ ] All school markers render; clustering works at lower zoom levels
- [ ] Map/List toggle works and persists via `MapContext`
- [ ] Search bar returns results and selects schools
- [ ] School type filters (Elementary, Middle, High) work; filter state persists in `sessionStorage`
- [ ] Priority filter works and state persists in `sessionStorage`
- [ ] Mobile drawer opens/closes; Reset and Apply buttons function
- [ ] Geolocate control shows user position if in SF
- [ ] PostHog events fire: `map_view_toggled`, `searched_for_school`, `selected_school_from_search`, `high_priority_modal_opened`, `map_marker_clicked`
- [ ] Clicking a school marker on mobile wraps the card in a link to `/school/[stub]`
- [ ] Selected school card shows on desktop

### Pages Router fully retired
- [ ] `src/pages/` directory no longer exists
- [ ] No remaining references to `pages/` files in `next build` output
- [ ] `npm run build` completes without errors
- [ ] `npm run dev` starts without errors

### Regression check (school pages still work)
- [ ] `/school/[stub]` pages still load correctly
- [ ] `/sitemap.xml` still returns valid XML
- [ ] Home page (`/`) still loads correctly
- [ ] About page (`/about`) still loads correctly
