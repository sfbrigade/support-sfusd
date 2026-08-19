# Payload implementation details

## Overview

Payload CMS has been added to the existing Next.js application as a small,
self-contained backend for managing opportunities. It runs in the same Next.js
deployment as the public site and adds an admin interface and generated APIs
without migrating or replacing the application's existing Prisma-backed
features.

## Application structure

- The existing App Router pages and API routes now live under
  `src/app/(frontend)`. Because route groups do not affect URLs, the public site
  retains its existing routes and behavior.
- Payload's routes live under `src/app/(payload)`. This adds the admin interface
  at `/admin`, the REST API under `/api`, and GraphQL endpoints at `/graphql`
  and `/graphql-playground`.
- The Next.js configuration is wrapped with Payload's supported Next.js plugin.
  Next.js and its related lint dependencies were updated to versions compatible
  with the installed Payload 3.88 packages.

## Payload configuration and data model

The central configuration is `src/payload.config.ts`. It registers three
Payload-owned collections:

- **Users** provides Payload's email/password authentication and controls access
  to the admin interface.
- **Media** accepts image uploads with required alternative text. Media can be
  read publicly, while uploads and changes require an authenticated Payload
  user.
- **Opportunities** stores a title, description, display date, location, source,
  required image, and validated HTTP(S) destination URL. Opportunities are
  immediately public because drafts are not enabled in this initial phase.

Public clients may read Media and Opportunities through Payload's generated
API. Creating, updating, and deleting those records requires an authenticated
Payload user. User records are also restricted to authenticated users, apart
from Payload's one-time first-user setup when the collection is empty.

Generated Payload TypeScript definitions are stored in
`src/payload-types.ts`. The server-only `getOpportunities` helper in
`src/lib/opportunities.ts` uses Payload's Local API, applies collection access
rules, resolves related media, and returns generated-type-backed results for a
future public Opportunities UI.

## Database separation

Payload and Prisma connect to the same PostgreSQL/Neon database but remain
independent:

- Prisma continues to own the existing tables and migration history in the
  `public` schema.
- Payload owns its collections, metadata tables, and migration history in the
  dedicated `payload` schema.

The initial Payload migration is committed under `src/migrations`. Payload
tables must not be added to `prisma/schema.prisma`, and Prisma should not be
used to migrate them.

Payload reads its server-only connection from `PAYLOAD_DATABASE_URL`, falling
back to `POSTGRES_URL_NON_POOLING`, and uses `PAYLOAD_SECRET` for authentication
and cryptographic operations. The required variables are documented in
`.env.example`.

## Development and deployment support

Package scripts were added for generating Payload types and the admin import
map, creating and applying migrations, and running TypeScript checks. The build
workflow applies committed Payload migrations before the Next.js production
build. Setup and day-to-day commands are documented in
`docs/payload-opportunities.md`.

Local uploads are written to the ignored `media/` directory. This works for
development, but it is not durable on Vercel's ephemeral filesystem.

The integration has been checked with type generation, import-map generation,
TypeScript validation, Prisma schema validation, Payload migrations, a
production Next.js build, and runtime checks covering admin access,
authentication, media upload, Opportunity creation, public reads, and blocked
anonymous writes.

## Recommended next steps

1. Add a persistent storage adapter, such as Payload's Vercel Blob adapter,
   before relying on uploaded media in preview or production deployments.
2. Build the public Featured Opportunities component using
   `getOpportunities`, including loading, empty, and error states.
3. Review the production migration process so database migrations run safely
   and separately from any destructive Prisma reset behavior.
4. Add automated access-control and API tests for public reads, authenticated
   writes, media relationships, and URL validation.
5. Revisit editorial workflow needs after real usage; add drafts, publishing,
   roles, or more detailed dates only when requirements justify them.
