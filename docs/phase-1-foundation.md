# Phase 1 – Foundation

**Goal:** Stand up the `app/` directory alongside the existing `pages/` directory. Replace the shared app shell (`_app.tsx`, `_document.tsx`), migrate all non-data-driven routes, and convert shared components to App Router conventions. The map and school pages remain on `pages/` and are untouched until Phase 2.

---

## Overview of changes

| Action | File |
|--------|------|
| CREATE | `src/app/layout.tsx` |
| CREATE | `src/app/providers.tsx` |
| CREATE | `src/app/page.tsx` |
| CREATE | `src/app/HomeClient.tsx` |
| CREATE | `src/app/about/page.tsx` |
| CREATE | `src/app/about/AboutClient.tsx` |
| CREATE | `src/app/image-preview/page.tsx` |
| CREATE | `src/app/api/searchSchools/route.ts` |
| CREATE | `src/app/api/school/[stub]/route.ts` |
| MODIFY | `src/layouts/RootLayout.tsx` |
| MODIFY | `src/components/NavBar.tsx` |
| DELETE | `src/pages/index.tsx` *(after app/ version verified)* |
| DELETE | `src/pages/about.tsx` *(after app/ version verified)* |
| DELETE | `src/pages/image-preview.tsx` *(after app/ version verified)* |
| DELETE | `src/pages/review.tsx` *(removed entirely, no replacement)* |

**Keep untouched until Phase 2:**
`src/pages/_app.tsx`, `src/pages/_document.tsx`, `src/pages/map.tsx`, `src/pages/school.tsx`, `src/pages/api/searchSchools.ts`, `src/pages/api/school/[stub].ts`

---

## Files to create

### `src/app/layout.tsx`

Replaces both `pages/_document.tsx` (html/body/head structure) and `pages/_app.tsx` (global CSS, fonts, providers). This is a **server component**.

**Notes:**
- Fonts moved here from `_app.tsx` (Fredoka, Lato) and `RootLayout.tsx` (Inter)
- Duplicate Google Fonts `<link>` tags from `_document.tsx` removed (next/font handles this)
- Plausible script moved here from `_document.tsx`
- Favicon set via the `metadata.icons` API

```tsx
import type { Metadata } from "next";
import { Fredoka, Inter, Lato } from "next/font/google";
import "@/styles/globals.css";
import Providers from "./providers";
import RootLayout from "@/layouts/RootLayout";

const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka" });
const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Support SF Schools",
  description:
    "Find public schools near you that need support from the local community.",
  icons: {
    icon: "https://www.supportsfschools.org/logo_icon.ico",
  },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${fredoka.variable} ${lato.variable} ${inter.variable}`}
    >
      <head>
        {/* Plausible Analytics – moved from _document.tsx */}
        <script
          defer
          data-domain="supportsfschools.org"
          src="https://plausible.io/js/script.pageview-props.tagged-events.outbound-links.js"
        />
      </head>
      <body className={`scroll-smooth ${inter.className}`}>
        <Providers>
          <RootLayout>{children}</RootLayout>
        </Providers>
      </body>
    </html>
  );
}
```

---

### `src/app/providers.tsx`

A `"use client"` wrapper that consolidates all the providers and PostHog initialisation currently spread across `_app.tsx`. By isolating this in a client component, `app/layout.tsx` stays a server component and the RSC boundary is kept as narrow as possible.

**Note:** `children` passed through a client component wrapper is still rendered as RSC – Next.js preserves the server/client boundary via composition.

```tsx
"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";
import { MapProvider } from "@/contexts/MapContext";
import { ToastProvider } from "@/components/Toast/ToastContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host: "https://us.posthog.com",
      ui_host: "https://us.posthog.com",
      defaults: "2025-05-24",
      capture_exceptions: true,
      debug: process.env.NODE_ENV === "development",
    });
  }, []);

  return (
    <PostHogProvider client={posthog}>
      <MapProvider>
        <ToastProvider>{children}</ToastProvider>
      </MapProvider>
    </PostHogProvider>
  );
}
```

---

### `src/app/page.tsx`

Server component shell for the home route. Exports `metadata` (can't be exported from a `"use client"` component) and delegates rendering to `HomeClient`.

```tsx
import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Support SF Schools - Home",
};

export default function HomePage() {
  return <HomeClient />;
}
```

---

### `src/app/HomeClient.tsx`

The interactive part of the home page, extracted from `pages/index.tsx`. The only changes from the original are:
- `"use client"` directive added
- `useRouter` import changed from `next/router` → `next/navigation`
- `<SEO>` component removed (metadata is now in `page.tsx`)

```tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";

export default function HomeClient() {
  const router = useRouter();
  const posthog = usePostHog();

  const handleClick = () => {
    posthog?.capture("explore_schools_clicked");
    router.push("/map");
  };

  if (posthog) {
    posthog.capture("pageview", { page: "home" });
  }

  return (
    <>
      <main className="relative flex h-full flex-row justify-between p-4">
        <section className="md:mt-50 mt-8 flex flex-1 flex-col items-center gap-8 md:justify-start lg:gap-11">
          <header className="text-center">
            <h1 className="text-3xl font-medium tracking-wider xl:text-5xl xl:leading-normal">
              Get <span className="text-[#F15437]">Involved</span> with <br />
              <span className="text-[#F15437]">
                San Francisco Public Schools
              </span>
            </h1>
          </header>

          <div className="max-w-[400px] text-center text-sm tracking-wide text-black sm:text-base md:text-lg lg:text-xl lg:leading-8">
            Find public schools near you that need support from the local
            community.
          </div>

          <button
            className="flex items-center justify-center gap-3 rounded-lg bg-amber-400 px-4 py-4 lg:px-8"
            onClick={handleClick}
          >
            <span className="text-sm font-medium leading-7 tracking-wide text-zinc-950 sm:text-base md:text-lg lg:text-xl">
              Explore Schools
            </span>
            <div className="flex items-center justify-center rounded-full bg-orange-200 p-1">
              <Image
                src="/right-arrow.png"
                alt="Arrow Icon"
                width={20}
                height={20}
              />
            </div>
          </button>
        </section>
      </main>
      {/* Image Container */}
      <div className="fixed inset-x-0 bottom-0 z-[-1] h-full bg-gradient-to-b from-[#7CE0ED] to-[#E3FCFF]">
        <Image
          src="/homepage-background.png"
          alt="Homepage Background"
          className="fixed bottom-0 w-full"
          width={2000}
          height={2000}
          priority={true}
        />
      </div>
    </>
  );
}
```

---

### `src/app/about/page.tsx`

Server component shell for `/about`. Exports static `metadata` and delegates to `AboutClient`.

```tsx
import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "Support SF Schools - About",
  description:
    "Support SF Schools is a diverse group of teachers, designers, engineers, researchers, and curious community members dedicated to making it easier for people who live, work, and hang out in San Francisco to support our public schools.",
};

export default function AboutPage() {
  return <AboutClient />;
}
```

---

### `src/app/about/AboutClient.tsx`

The about page component, migrated from `pages/about.tsx`. Changes from the original:
- `"use client"` directive added
- `<SEO>` import and usage removed

Everything else (team list, partner list, contact form state, JSX) is unchanged – copy the body of the existing `About` component verbatim.

```tsx
"use client";

import React from "react";
import Image from "next/image";
import ContactUs from "@/components/ContactUs";
import { useState } from "react";
import { blurDataURL } from "@/lib/imageConfig";

const member_list = [ /* ... same as pages/about.tsx ... */ ];
const pastContributors = [ /* ... same as pages/about.tsx ... */ ];
const partnerList = [ /* ... same as pages/about.tsx ... */ ];

export default function AboutClient() {
  const [showContactForm, setShowContactForm] = useState(false);
  const handleOpen = () => setShowContactForm(true);
  const handleClose = () => setShowContactForm(false);

  return (
    <main>
      {/* JSX unchanged from pages/about.tsx — copy verbatim, omitting <SEO> */}
      ...
      {showContactForm && <ContactUs handleClose={handleClose} />}
    </main>
  );
}
```

---

### `src/app/image-preview/page.tsx`

The image cropping tool, migrated from `pages/image-preview.tsx`. The original already has `"use client"` at the top, so this migration is a near-verbatim copy. Copy the full file content and adjust the import path if needed.

```tsx
"use client";

// Copy full content of src/pages/image-preview.tsx here.
// No other changes required.
```

---

### `src/app/api/searchSchools/route.ts`

Route Handler replacing `pages/api/searchSchools.ts`. The Prisma query is identical; only the request/response interface changes.

**Before (`pages/api/searchSchools.ts`):**
```ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const schools = await prisma.school.findMany({
    where: { name: { contains: req.query.searchTerm as string, mode: "insensitive" } },
    include: { metrics: true },
  });
  res.status(200).json({ schools });
}
```

**After (`src/app/api/searchSchools/route.ts`):**
```ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchTerm = request.nextUrl.searchParams.get("searchTerm") ?? "";

  const schools = await prisma.school.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
    include: {
      metrics: true,
    },
  });

  return NextResponse.json({ schools });
}
```

---

### `src/app/api/school/[stub]/route.ts`

Route Handler replacing `pages/api/school/[stub].ts`. Note that in Next.js 16 the `params` argument is a **Promise** and must be awaited.

**Before (`pages/api/school/[stub].ts`):**
```ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { stub } = req.query;
  const school = await prisma.school.findUnique({ where: { stub }, include: { metrics: true, programs: true } });
  if (!school) return res.status(404).json({ error: "School not found" });
  res.status(200).json({ school });
}
```

**After (`src/app/api/school/[stub]/route.ts`):**
```ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ stub: string }> },
) {
  try {
    const { stub } = await params;

    const school = await prisma.school.findUnique({
      where: { stub },
      include: {
        metrics: true,
        programs: true,
      },
    });

    if (!school) {
      return NextResponse.json({ error: "School not found" }, { status: 404 });
    }

    return NextResponse.json({ school });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
```

---

## Files to modify

### `src/layouts/RootLayout.tsx`

**Changes:**
1. Add `"use client"` (required – uses hooks and browser APIs)
2. Replace `import { useRouter } from "next/router"` → `import { usePathname } from "next/navigation"`
3. Replace `const router = useRouter(); const { pathname } = router;` → `const pathname = usePathname();`
4. Update the banner condition from `pathname.includes("/school")` → `pathname?.startsWith("/school")` so it still matches `/school/[stub]` in Phase 2

```diff
+"use client";
+
 import React, { useState } from "react";
 import { Inter } from "next/font/google";
 import Navbar from "@/components/NavBar";
 import Banner from "@/components/Banner";
-import { useRouter } from "next/router";
+import { usePathname } from "next/navigation";
 import ContactUs from "@/components/ContactUs";
 import { useMapContext } from "@/contexts/MapContext";
 import BackToTop from "@/components/BackToTop";
 import { usePostHog } from "posthog-js/react";

 const inter = Inter({ subsets: ["latin"] });

 function RootLayout({ children }: { children: React.ReactNode }) {
-  const router = useRouter();
-  const { pathname } = router;
+  const pathname = usePathname();
   const { isMapView } = useMapContext();
   const posthog = usePostHog();

   // ... (rest of state and handlers unchanged) ...

   return (
     <div
       id="root"
       className={`${inter.className} flex flex-col px-0 ${(isMapView && pathname === "/map") || pathname === "/" ? "h-dvh-with-fallback" : "h-auto"}`}
     >
-      {(pathname.includes("/school") || pathname === "/") &&
+      {(pathname?.startsWith("/school") || pathname === "/") &&
         isBannerShowing && (
```

---

### `src/components/NavBar.tsx`

**Changes:**
1. Add `"use client"` (required – uses hooks and event handlers)
2. Replace `import { useRouter } from "next/router"` → `import { usePathname } from "next/navigation"`
3. Replace the `router.events.on("routeChangeComplete", ...)` pattern: the route-change listener is replaced by a `useEffect` that re-runs whenever `pathname` changes, achieving the same result
4. Update the `/school` case to `pathname?.startsWith("/school")` so it matches `/school/[stub]` after Phase 2

```diff
+"use client";
+
 import React, { useEffect, useState } from "react";
 import Link from "next/link";
 import Image from "next/image";
-import { useRouter } from "next/router";
+import { usePathname } from "next/navigation";

 const Navbar = () => {
   const [isOpen, setOpen] = useState(false);
-  const router = useRouter();
+  const pathname = usePathname();
   const [bg, setBg] = useState("");

   useEffect(() => {
-    const handleRouteChange = (url: any) => {
-      setOpen(false);
-    };
-
-    const { route } = router;
-
-    switch (route) {
-      case "/map":
-        setBg("bg-[#D7F1FF]");
-        break;
-      case "/school":
-      case "/about":
-        setBg("bg-white drop-shadow");
-        break;
-      case "/":
-        setBg("");
-        break;
-      default:
-        setBg("");
-        break;
-    }
-
-    router.events.on("routeChangeComplete", handleRouteChange);
-  }, [router]);
+    setOpen(false);
+
+    if (pathname === "/map") {
+      setBg("bg-[#D7F1FF]");
+    } else if (pathname?.startsWith("/school") || pathname === "/about") {
+      setBg("bg-white drop-shadow");
+    } else {
+      setBg("");
+    }
+  }, [pathname]);

   return (
     // ... JSX unchanged ...
   );
 };
```

---

## Files to delete

Once the corresponding `app/` routes are verified working:

| File | Replacement |
|------|-------------|
| `src/pages/index.tsx` | `src/app/page.tsx` + `src/app/HomeClient.tsx` |
| `src/pages/about.tsx` | `src/app/about/page.tsx` + `src/app/about/AboutClient.tsx` |
| `src/pages/image-preview.tsx` | `src/app/image-preview/page.tsx` |
| `src/pages/review.tsx` | **None** – the `/review` route is removed entirely |

**Do not yet delete:**
`_app.tsx`, `_document.tsx`, `map.tsx`, `school.tsx`, and both API files under `pages/api/`. These are still actively serving the pages/map and pages/school routes.

---

## Verification checklist

- [ ] `http://localhost:3000/` renders home page with correct fonts, background gradient, and "Explore Schools" button
- [ ] Clicking "Explore Schools" navigates to `/map` and fires `explore_schools_clicked` PostHog event
- [ ] `http://localhost:3000/about` renders team, partners, and past contributors; Contact Us modal opens/closes
- [ ] `http://localhost:3000/image-preview` renders the image cropping tool
- [ ] `/review` returns a 404 (route removed)
- [ ] NavBar background changes correctly on `/`, `/about`, `/map`, `/school` routes
- [ ] Banner appears on `/` and on `/school/...` (will be testable properly in Phase 2)
- [ ] `GET /api/searchSchools?searchTerm=glen` returns schools matching the search term
- [ ] `GET /api/school/glen-park-elementary` returns the correct school JSON
- [ ] PostHog and Plausible are initialised (check Network tab for outbound calls)
- [ ] Fonts (Fredoka, Lato, Inter) load correctly with no FOUT
- [ ] Favicon shows in browser tab
- [ ] `pages/map` and `pages/school` still work (smoke test both)
- [ ] No TypeScript errors (`npm run build`)
