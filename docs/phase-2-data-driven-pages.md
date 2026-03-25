# Phase 2 – Data-Driven Pages

**Goal:** Migrate the two remaining page routes (`/map` and `/school`) to the App Router, introduce the new `/school/[stub]` URL structure, wire up the dynamic sitemap, and update all internal links to point to the new URL scheme.

By the end of this phase, `pages/` no longer serves any routes and can be deleted.

---

## Overview of changes

| Action | File |
|--------|------|
| CREATE | `src/app/map/page.tsx` |
| CREATE | `src/components/MapPageClient.tsx` |
| CREATE | `src/app/school/[stub]/page.tsx` |
| CREATE | `src/app/school/[stub]/loading.tsx` |
| CREATE | `src/app/not-found.tsx` |
| CREATE | `src/components/SchoolPageClient.tsx` |
| CREATE | `src/app/sitemap.ts` |
| MODIFY | `src/components/MapboxMap.tsx` *(update school links)* |
| MODIFY | `src/components/SchoolCardMap.tsx` *(update school links)* |
| MODIFY | `src/components/MapList.tsx` / `MapListCard.tsx` *(update school links if present)* |
| MODIFY | `package.json` *(remove sitemap generation from build script)* |
| DELETE | `src/pages/map.tsx` *(after app/ version verified)* |
| DELETE | `src/pages/school.tsx` *(after app/ version verified)* |
| DELETE | `src/pages/api/searchSchools.ts` *(app/ version live since Phase 1)* |
| DELETE | `src/pages/api/school/[stub].ts` *(app/ version live since Phase 1)* |
| DELETE | `src/pages/_app.tsx` *(no remaining pages/ routes)* |
| DELETE | `src/pages/_document.tsx` *(no remaining pages/ routes)* |

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

The existing `pages/map.tsx` component, extracted to a client component. This is the bulk of the migration work for the map page.

**Changes from `pages/map.tsx`:**
1. `"use client"` directive added at top
2. `GetStaticProps` export and the `getStaticProps` function removed entirely
3. `Props` type changed: schools now come as a prop passed from the server component above (same shape)
4. `<SEO>` import and usage removed
5. School card link updated: `/school?name=...&stub=...` → `/school/[stub]` (see link diff below)

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
        {/* ... all JSX unchanged except the school card link below ... */}
      </div>
    </>
  );
};

export default MapPageClient;
```

**Key link diff inside `MapPageClient` (the school card link):**

```diff
-  <Link
-    href={
-      "/school?name=" +
-      encodeURIComponent(selectedSchool.name) +
-      "&stub=" +
-      selectedSchool.stub
-    }
-    className="block md:hidden"
-  >
+  <Link
+    href={`/school/${selectedSchool.stub}`}
+    className="block md:hidden"
+  >
     <SelectedSchoolCard school={selectedSchool} />
   </Link>
```

---

### `src/app/school/[stub]/page.tsx`

An **async Server Component** that:
- Fetches the school by stub directly with Prisma (no API round-trip)
- Exports `generateStaticParams` to pre-render all school pages at build time
- Exports `generateMetadata` for per-school titles and descriptions
- Calls `notFound()` from `next/navigation` if the stub doesn't exist

**Note on `params`:** In Next.js 16, route params are a **Promise** — always `await params` before destructuring.

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import SchoolPageClient from "@/components/SchoolPageClient";

export async function generateStaticParams() {
  const schools = await prisma.school.findMany({
    select: { stub: true },
  });
  return schools.map((school) => ({ stub: school.stub }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stub: string }>;
}): Promise<Metadata> {
  const { stub } = await params;
  const school = await prisma.school.findUnique({
    where: { stub },
    select: { name: true, about: true },
  });

  if (!school) return { title: "School Not Found" };

  return {
    title: `Support SF Schools - ${school.name} Profile`,
    description: `Support SF Schools encourages the community to support ${school.name}. ${school.about} Learn more about ${school.name} and their available donation and volunteer opportunities.`,
  };
}

export default async function SchoolPage({
  params,
}: {
  params: Promise<{ stub: string }>;
}) {
  const { stub } = await params;

  const school = await prisma.school.findUnique({
    where: { stub },
    include: {
      metrics: true,
      programs: true,
    },
  });

  if (!school) notFound();

  return <SchoolPageClient school={school} />;
}
```

---

### `src/app/school/[stub]/loading.tsx`

Displayed automatically by Next.js while the school page server component is fetching. Replaces the inline loading spinner that was managed with `useState` in `pages/school.tsx`.

```tsx
export default function SchoolLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
        <p className="text-gray-600">Loading school information...</p>
      </div>
    </div>
  );
}
```

---

### `src/app/not-found.tsx`

Global 404 page, shown when `notFound()` is called (e.g. when a school stub doesn't exist) or when a route has no match. Replaces the inline not-found UI from `pages/school.tsx`. The "Go Back" button is replaced with a link to `/map` since `useRouter().back()` is unreliable from a server-rendered 404.

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-bold text-gray-600">
          School Not Found
        </h1>
        <p className="text-gray-500">
          The requested school could not be found.
        </p>
        <Link
          href="/map"
          className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Browse Schools
        </Link>
      </div>
    </div>
  );
}
```

---

### `src/components/SchoolPageClient.tsx`

The school detail view, extracted from `pages/school.tsx` and simplified. Because data fetching now happens in the server component above, the client component receives a fully-loaded `school` prop and the entire fetch/loading/error state machine is removed.

**Changes from `pages/school.tsx`:**
1. `"use client"` directive added
2. `useRouter`, `useEffect`, `useState` for fetch, loading, error state — all removed
3. `<SEO>` removed (handled by `generateMetadata` in `page.tsx`)
4. `router.back()` in error/not-found states removed (handled by `app/not-found.tsx`)
5. Component receives `school: School` as a prop
6. `studentOutcomes` computed inline (simple filter, no need for state)

```tsx
"use client";

import SchoolAbout from "@/components/schoolPageComponents/SchoolAbout";
import SchoolDonation from "@/components/schoolPageComponents/SchoolDonation";
import SchoolHeader from "@/components/schoolPageComponents/SchoolHeader";
import SchoolStudentOutcomes from "@/components/schoolPageComponents/SchoolStudentOutcomes";
import SchoolTestimonial from "@/components/schoolPageComponents/SchoolTestimonial";
import SchoolVolunteer from "@/components/schoolPageComponents/SchoolVolunteer";
import { School } from "@/types/school";
import { blurDataURL } from "@/lib/imageConfig";
import Image from "next/image";

// Removed: useRouter, useEffect, useState, SEO

type Props = {
  school: School;
};

export default function SchoolPageClient({ school }: Props) {
  const studentOutcomes = school.metrics?.filter(
    ({ category }) => category === "outcome",
  );

  return (
    <div>
      <div className="relative w-full">
        <Image
          className="relative h-64 w-full object-cover max-md:h-48"
          src={`/school-images/full/${school.stub}.webp`}
          alt={school.name + " image"}
          width={800}
          height={400}
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </div>
      <div className="relative mx-auto flex flex-col gap-10 p-6 pt-2 md:py-20 lg:w-4/5 2xl:w-2/3">
        <Image
          className="z-1 absolute -top-20 h-32 w-32 rounded bg-white drop-shadow-lg md:-top-32 md:h-44 md:w-44"
          src={`/school-images/logo/${school.stub}.webp`}
          alt={school.name + " logo"}
          width={400}
          height={400}
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
        <SchoolHeader school={school} />
        <SchoolAbout school={school} />
        {studentOutcomes.length > 0 && (
          <SchoolStudentOutcomes stats={studentOutcomes} />
        )}
        <SchoolVolunteer school={school} />
        <SchoolDonation school={school} />
        {school.testimonial && <SchoolTestimonial school={school} />}
        {school.noteable_video && (
          <iframe
            height="340"
            src={school.noteable_video}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full rounded-lg"
          ></iframe>
        )}
      </div>
    </div>
  );
}
```

---

### `src/app/sitemap.ts`

Replaces the `scripts/generate-sitemap.ts` build script. Next.js automatically serves this at `/sitemap.xml`. Uses the same Prisma singleton already set up in `lib/prisma.ts`.

```ts
import type { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const schools = await prisma.school.findMany({
    select: { stub: true },
  });

  const schoolEntries: MetadataRoute.Sitemap = schools.map((school) => ({
    url: `https://supportsfschools.org/school/${school.stub}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: "https://supportsfschools.org",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://supportsfschools.org/map",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://supportsfschools.org/about",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...schoolEntries,
  ];
}
```

---

## Files to modify

### `src/components/MapboxMap.tsx` and/or `SchoolCardMap.tsx` — update school links

Search for any remaining references to the old `/school?name=...&stub=...` URL pattern and update them. The primary occurrence is in `MapPageClient` (handled above), but double-check these components:

```bash
# Find all occurrences in src/components/
grep -r "/school?name" src/components/
grep -r "stub=" src/components/
```

For any matches, apply:

```diff
-href={`/school?name=${encodeURIComponent(school.name)}&stub=${school.stub}`}
+href={`/school/${school.stub}`}
```

---

### `package.json` — remove sitemap generation from build

The `generate-sitemap` step is no longer needed since `app/sitemap.ts` generates the sitemap dynamically.

```diff
-"build": "prisma migrate reset --force && npm run generate-sitemap && next build",
+"build": "prisma migrate reset --force && next build",
```

Also update the `dev` script if it references the sitemap generator:

```diff
-"dev": "npm run migrate-check && npm run generate-sitemap && next dev",
+"dev": "npm run migrate-check && next dev",
```

---

## Files to delete (after verification)

Once `app/map` and `app/school/[stub]` routes are confirmed working:

| File | Replacement |
|------|-------------|
| `src/pages/map.tsx` | `src/app/map/page.tsx` + `src/components/MapPageClient.tsx` |
| `src/pages/school.tsx` | `src/app/school/[stub]/page.tsx` + `src/components/SchoolPageClient.tsx` |
| `src/pages/api/searchSchools.ts` | `src/app/api/searchSchools/route.ts` *(live since Phase 1)* |
| `src/pages/api/school/[stub].ts` | `src/app/api/school/[stub]/route.ts` *(live since Phase 1)* |
| `src/pages/_app.tsx` | `src/app/layout.tsx` + `src/app/providers.tsx` *(live since Phase 1)* |
| `src/pages/_document.tsx` | `src/app/layout.tsx` *(live since Phase 1)* |

After deleting all of the above, the `src/pages/` directory should be empty. Confirm with:

```bash
ls src/pages/
# Should output: No such file or directory (or an empty listing)
```

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

### School page (`/school/[stub]`)
- [ ] `http://localhost:3000/school/glen-park-elementary` (or any valid stub) loads without error
- [ ] School banner image, logo, header, about, volunteer, donation sections all render
- [ ] Student outcomes section shows only when metrics with category `outcome` exist
- [ ] Testimonial section shows only when `school.testimonial` is set
- [ ] Embedded YouTube video shows only when `school.noteable_video` is set
- [ ] `http://localhost:3000/school/does-not-exist` serves the custom 404 page
- [ ] Page `<title>` matches `"Support SF Schools - [School Name] Profile"`
- [ ] OG description populates from school data
- [ ] Loading spinner shows while server component is fetching (check with slow network)
- [ ] NavBar background is `bg-white drop-shadow` on school pages

### Sitemap
- [ ] `http://localhost:3000/sitemap.xml` returns valid XML
- [ ] School URLs in the sitemap use `/school/[stub]` format
- [ ] Static routes (`/`, `/map`, `/about`) are present in the sitemap

### Legacy routes cleaned up
- [ ] `/school?stub=...` no longer works (returns 404 — old query-param URL is gone)
- [ ] No remaining references to `pages/` files in `next build` output
- [ ] `npm run build` completes without errors
