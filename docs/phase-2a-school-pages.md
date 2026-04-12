# Phase 2a – School Pages

**Goal:** Migrate the school detail route to the App Router at `/school/[stub]`, update all internal links to the new URL scheme, wire up the dynamic sitemap, and remove the legacy sitemap build script.

**Merge order:** Phase 2a should merge **before** Phase 2b (Map Page). The link updates in map-related components depend on the new `/school/[stub]` route existing.

---

## Overview of changes

| Action | File |
|--------|------|
| CREATE | `src/app/school/[stub]/page.tsx` |
| CREATE | `src/app/school/[stub]/loading.tsx` |
| CREATE | `src/app/not-found.tsx` |
| CREATE | `src/components/SchoolPageClient.tsx` |
| CREATE | `src/app/sitemap.ts` |
| MODIFY | `src/components/SchoolCardMap.tsx` *(update school links)* |
| MODIFY | `src/components/MapListCard.tsx` *(update school links)* |
| MODIFY | `src/pages/map.tsx` *(update school link on line 301)* |
| MODIFY | `package.json` *(remove sitemap generation from build/dev scripts)* |
| DELETE | `src/pages/school.tsx` *(replaced by app/ version)* |

---

## Files to create

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

### `src/components/SchoolCardMap.tsx` — update school links

Two occurrences of the old URL pattern (lines 91 and 132):

```diff
 <Link
-  href={
-    "/school?name=" +
-    encodeURIComponent(school.name) +
-    "&stub=" +
-    school.stub
-  }
+  href={`/school/${school.stub}`}
   className="hidden md:inline"
 >
```

```diff
 <Link
   className=" md:block"
-  href={
-    "/school?name=" +
-    encodeURIComponent(school.name) +
-    "&stub=" +
-    school.stub
-  }
+  href={`/school/${school.stub}`}
   onClick={() =>
```

---

### `src/components/MapListCard.tsx` — update school link

One occurrence (line 77):

```diff
-const schoolUrl = "/school?name=" + encodeURIComponent(school.name) + "&stub=" + school.stub;
+const schoolUrl = `/school/${school.stub}`;
```

---

### `src/pages/map.tsx` — update school link

One occurrence (line 299–305). This change lands in 2a so that Phase 2b can copy already-correct code into `MapPageClient.tsx`.

```diff
 <Link
-  href={
-    "/school?name=" +
-    encodeURIComponent(selectedSchool.name) +
-    "&stub=" +
-    selectedSchool.stub
-  }
+  href={`/school/${selectedSchool.stub}`}
   className="block md:hidden"
 >
```

---

### `package.json` — remove sitemap generation from build/dev scripts

```diff
-"dev": "npm run migrate-check && npm run generate-sitemap && next dev",
+"dev": "npm run migrate-check && next dev",
```

```diff
-"build": "prisma migrate reset --force && npm run generate-sitemap && next build",
+"build": "prisma migrate reset --force && next build",
```

---

## Files to delete

| File | Replacement |
|------|-------------|
| `src/pages/school.tsx` | `src/app/school/[stub]/page.tsx` + `src/components/SchoolPageClient.tsx` |

**Do NOT delete** `src/pages/_app.tsx` or `src/pages/_document.tsx` in this phase — `pages/map.tsx` still needs them.

---

## Verification checklist

### School page (`/school/[stub]`)
- [ ] `http://localhost:3000/school/willie-l-brown-jr-middle-school` (or any valid stub) loads without error
- [ ] School banner image, logo, header, about, volunteer, donation sections all render
- [ ] Student outcomes section shows only when metrics with category `outcome` exist
- [ ] Testimonial section shows only when `school.testimonial` is set
- [ ] Embedded YouTube video shows only when `school.noteable_video` is set
- [ ] `http://localhost:3000/school/does-not-exist` serves the custom 404 page
- [ ] Page `<title>` matches `"Support SF Schools - [School Name] Profile"`
- [ ] OG description populates from school data
- [ ] Loading spinner shows while server component is fetching (check with slow network)
- [ ] NavBar background is `bg-white drop-shadow` on school pages

### Updated links on map page
- [ ] Clicking "Learn More" in `MapListCard` navigates to `/school/[stub]` (not old query-param URL)
- [ ] Clicking the school image in `SchoolCardMap` (desktop) navigates to `/school/[stub]`
- [ ] Clicking the "Learn more" button in `SchoolCardMap` navigates to `/school/[stub]`
- [ ] Clicking the mobile school card wrapper in `pages/map.tsx` navigates to `/school/[stub]`

### Sitemap
- [ ] `http://localhost:3000/sitemap.xml` returns valid XML
- [ ] School URLs in the sitemap use `/school/[stub]` format
- [ ] Static routes (`/`, `/map`, `/about`) are present in the sitemap

### Legacy route removed
- [ ] `/school?stub=...` no longer works (returns 404 — old query-param URL is gone)
- [ ] `npm run build` completes without errors