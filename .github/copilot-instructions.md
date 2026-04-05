# AI Coding Agent Instructions for Support SF Schools

## Project Overview
Support SF Schools is a Next.js volunteer and donation platform connecting SF Bay Area volunteers/donors to SFUSD schools. The site showcases individual schools with their programs, metrics, volunteer opportunities, and donation options via an interactive map and list view.

## Architecture & Data Flow

### Core Stack
- **Frontend**: Next.js 15 (React 19), TypeScript, Tailwind CSS, Mapbox GL
- **Backend**: Next.js API routes + Prisma ORM
- **Database**: PostgreSQL (via Vercel Postgres)
- **External APIs**: Google Sheets (data sync), Google Drive (image sync), Mapbox (mapping), PostHog (analytics), EmailJS (contact forms)

### Database Schema (`prisma/schema.prisma`)
**Core entities**:
- `School`: Primary entity with `stub` ID, name, address, coordinates, about text, programs, metrics, testimonials
- `Metric`: Student outcomes/statistics linked to schools (categories: "about", "outcome")
- `Program`: Volunteer/donation/enrichment opportunities (categories: "volunteer", "donate", "enrichment")
- `SchoolType`: Enum (elementary, middle, high school)

Key fields using string IDs: `latitude`/`longitude` stored as strings (not numbers) - convert when needed.

### Data Synchronization Pipeline
1. **`prisma/data-sync.ts`**: Syncs school data from Google Sheets → Prisma database
   - Transforms flat sheet arrays to nested objects using `arrayToGroupedObjects()`
   - Handles "NULL" strings as empty values
2. **`prisma/image-sync.ts`**: Syncs images from Google Drive folder structure → `/public/school_img/`
   - Uses Google Drive API with OAuth credentials
   - Converts images using `sharp` library (resizing, format conversion)
   - Filenames encode conversion options: `image_w300_h200_t.webp`
3. **`prisma/seed.ts`**: Seeds database from `prisma/schools.json`
   - Uses `djb2Hash()` utility to generate school stubs from names
   - Creates nested metrics and programs in one transaction

### Frontend Data Flow
1. **Map Page** (`src/pages/map.tsx`): Static props from `getStaticProps` fetch all schools with metrics/programs
2. **MapContext** (`src/contexts/MapContext.tsx`): Manages map/list view toggle and selected school state
3. **School Detail Page** (`src/pages/school.tsx`): Client-side fetch of individual school via `/api/school/[stub].ts`
4. **Search API** (`src/pages/api/searchSchools.ts`): Case-insensitive school name search with metrics

## Developer Workflows

### Local Development
```bash
npm run dev          # Runs migrate-check → generate-sitemap → next dev
npm run dbpush       # Apply schema changes (use for prototyping)
npm run seed         # Seed database with school data
```

### Database Changes
When modifying `prisma/schema.prisma`:
1. Edit schema file
2. Run `npm run dbpush` to apply changes (accepts data loss)
3. Update `prisma/seed.ts` if adding new fields
4. Run `npm run seed` to repopulate data
5. Test API routes against new schema

### Data Management
- **Sync data from Google Sheets**: `npm run data-sync` (requires `GOOGLE_APPLICATION_CREDENTIALS`)
- **Sync images from Google Drive**: `npm run image-sync` (same auth)
- Both use OAuth via `src/lib/googleDriveApi.ts` and `src/lib/sheetsApi.ts`

### Build & Deployment
```bash
npm run build        # Resets database + generates sitemap + builds Next.js
npm run lint         # Run ESLint
npm run format       # Format with Prettier (includes Tailwind class sorting)
```

## Project-Specific Patterns

### Component Structure
- **Page-level components** use TypeScript `Props` interface pattern
- **School detail cards** are composed into `src/components/schoolPageComponents/`
- **Shared UI components** (`Button`, `Card`, `Modal`, `Tag`) in `src/components/`
- **All components use default exports**: `export default ComponentName`

### Type Conventions
- Prisma schema types: Import from `@prisma/client` (e.g., `import { School } from "@prisma/client"`)
- App types: Store in `src/types/school.ts` (e.g., `School`, `Metric`, `Program`, `SchoolMapList`)
- Note type mismatches: Prisma `latitude`/`longitude` are strings; app layer may need conversion to `number`

### Styling
- Tailwind CSS with custom fonts: `--font-fredoka` and `--font-lato` (defined in `_app.tsx`)
- Prettier configured with `prettier-plugin-tailwindcss` (auto-sorts classes)
- SVG files loaded via `@svgr/webpack` (configured in `next.config.js`)

### Analytics & Monitoring
- PostHog integration in `_app.tsx` for event tracking
- Debug mode enabled in development (`process.env.NODE_ENV === "development"`)
- Configure via `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` (currently using https://us.posthog.com)
- Error capture enabled with `capture_exceptions: true` - PostHog automatically tracks client-side errors

### State Management
- **Global state**: MapContext (map/list toggle, selected school), ToastContext (notifications)
- **Page state**: React hooks (`useState`, `useEffect`)
- **Context usage**: Wrap providers in order: `MapProvider` → `ToastProvider` → `PostHogProvider` (in `_app.tsx`)
- **Redux toolkit** is in dependencies but not actively used - avoid adding new Redux logic

## Key Files & Responsibilities

| File | Purpose |
|------|---------|
| `src/lib/prisma.ts` | Singleton Prisma client (handles dev/prod difference) |
| `src/contexts/MapContext.tsx` | Global state for map view + selected school |
| `src/components/Toast/ToastContext.tsx` | Global toast notifications system |
| `src/pages/api/school/[stub].ts` | Fetch individual school details |
| `src/pages/api/searchSchools.ts` | Search schools by name |
| `prisma/schema.prisma` | Database schema (source of truth) |
| `src/types/school.ts` | Frontend type definitions (note: `latitude`/`longitude` are `number` here, unlike Prisma strings) |
| `tailwind.config.ts` | Tailwind customization (fonts, colors) |

## Critical Considerations

1. **Database URL dual-config**: Prisma uses `POSTGRES_PRISMA_URL` (pooled) for ORM, `POSTGRES_URL_NON_POOLING` for migrations
2. **Type mismatch gotcha**: DB schema stores latitude/longitude as strings, but `src/types/school.ts` defines them as `number`. API responses must convert: `parseFloat(school.latitude)`
3. **Static generation**: Map page uses `getStaticProps` (all schools pre-rendered at build time), not on-demand
4. **Image optimization**: Set `unoptimized: true` in `next.config.js` (custom image handling via Google Drive sync)
5. **Node version**: Project requires Node 22.x (`package.json` engines field)
6. **TypeScript path alias**: `@/*` maps to `src/` (configured in `tsconfig.json`)
7. **PostHog error tracking**: Enabled with `capture_exceptions: true` - watch for error monitoring in development

## Common Tasks

**Add a new school field**:
1. Update schema in `prisma/schema.prisma`
2. Run `npm run dbpush`
3. Add field to `src/types/school.ts` interface
4. Update `prisma/seed.ts` if it's a core field
5. Update affected components/pages

**Create a new school detail card**:
1. Create component in `src/components/schoolPageComponents/`
2. Import `School` type from `@/types/school`
3. Use pattern: `interface Props { school: School }` + default export
4. Import in `src/pages/school.tsx` and render in JSX

**Add a new API endpoint**:
1. Create file in `src/pages/api/` (route filename determines endpoint)
2. Use `NextApiRequest`/`NextApiResponse` types
3. Access Prisma client via `import prisma from "@/lib/prisma"`
4. Example: `src/pages/api/school/[stub].ts` → `/api/school/:stub`

**Debug database issues**:
1. Check schema in `prisma/schema.prisma`
2. Verify `.env` has `POSTGRES_PRISMA_URL` and `POSTGRES_URL_NON_POOLING`
3. Run `npm run seed` to ensure test data exists
4. Use Prisma Studio: `npx prisma studio` (starts UI at http://localhost:5555)

## Important Notes

- **School stubs**: Generated from school names using `djb2Hash()` utility in seed—used as primary key throughout
- **Current work context**: Actively enhancing error tracking/monitoring via PostHog integration
- **Google APIs**: Always check `GOOGLE_APPLICATION_CREDENTIALS` env var for data/image sync operations
- **Vercel Postgres**: Project uses connection pooling for ORM queries; direct connection only for migrations
