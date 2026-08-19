# Task: Introduce Payload CMS and build the Opportunities backend

You are working in the `sfbrigade/support-sfusd` repository.

The local working branch is:

`feature/payload-opportunities`

It was created from:

`develop-v2`

Your job is to introduce Payload CMS into the existing Next.js application and use it to implement one small, self-contained feature: a backend/admin system for managing opportunities that will eventually populate a "Featured Opportunities" section on the public site.

This is intentionally a narrow first Payload integration.

The larger goal is for the engineering team to learn how Payload fits into this existing application before considering any broader backend migration.

## Important working style

Work autonomously through the implementation.

Follow this general cycle:

1. Inspect the existing repository carefully.
2. Form a short implementation plan.
3. Implement incrementally.
4. Run the application/build/typechecking/linting as appropriate.
5. Diagnose and fix problems.
6. Repeat until the integration is working.
7. Review the final diff for unnecessary changes.

Do not stop merely because the first implementation attempt produces build, TypeScript, routing, database, or configuration errors. Investigate and resolve them.

However, stay strictly within the scope described below.

If you encounter a decision that would require significantly altering existing application behavior, existing Prisma models, deployment architecture, or unrelated code, do not make that change casually. Prefer the least-invasive solution and document any unresolved issue.

---

# Existing application

This is an established Next.js application that has been in development for several years.

Before modifying anything, inspect:

- `package.json`
- `src/`
- the existing App Router structure
- `next.config.*`
- `tsconfig.json`
- `.env.example`
- `prisma/`
- database utilities
- authentication-related code, if any
- build/lint scripts
- existing Vercel-specific configuration

Do not assume the application exactly matches a fresh Next.js or Payload template.

Preserve existing functionality.

## Current database architecture

The existing application uses:

- PostgreSQL
- Neon in production
- Prisma for the existing application data

Prisma must remain intact.

Payload should use the SAME PostgreSQL database, but Payload and Prisma must remain logically separate.

Specifically:

- Do not convert existing Prisma models to Payload.
- Do not modify Prisma to manage Payload tables.
- Do not add Payload-created tables to the Prisma schema.
- Do not migrate existing application data.
- Do not replace existing Prisma database access.
- Payload should manage its own tables/schema/migrations using its supported PostgreSQL adapter and tooling.

The objective is for Prisma and Payload to coexist against the same Postgres database.

Inspect the existing environment variable conventions and reuse existing database connection information where sensible, but introduce clearly named Payload-specific environment variables if doing so produces a cleaner or safer boundary.

Do not expose database credentials to the browser.

---

# Desired Payload / Next.js architecture

Payload should be integrated INTO the existing Next.js application.

Do NOT create:

- a second Next.js application
- an `/admin` workspace
- an npm monorepo
- separate frontend and backend packages
- multiple `package.json` files

There should continue to be one Next.js application and one root `package.json`.

Use Payload's standard Next.js App Router integration pattern.

The intended conceptual structure is:

```text
app/
  (frontend)/
    ...existing public application routes...

  (payload)/
    admin/
    api/
    graphql/
    ...Payload routes...
```

The actual repository currently uses `src`, so adapt this structure appropriately to the application's existing layout and to current Payload conventions.

For example, if appropriate:

```text
src/
  app/
    (frontend)/
      ...

    (payload)/
      ...
```

Do not blindly impose this exact tree if the current version of Payload requires slightly different generated files. Follow current Payload documentation and installed package conventions.

## Route groups

Moving the existing application beneath `(frontend)` MUST NOT change its public URLs.

Remember that Next.js route groups such as `(frontend)` do not contribute a URL segment.

For example, an existing public route:

```text
/about
```

must remain:

```text
/about
```

NOT:

```text
/frontend/about
```

The Payload admin should use Payload's normal admin route, expected to be approximately:

```text
/admin
```

unless current Payload conventions dictate otherwise.

---

# Keep the migration extremely conservative

This first integration should primarily consist of:

1. Reorganizing the Next.js App Router structure enough to allow Payload and the existing frontend to coexist.
2. Installing/configuring Payload.
3. Configuring Payload with PostgreSQL.
4. Adding minimal Payload authentication.
5. Adding media uploads.
6. Adding one domain collection: Opportunities.
7. Making Opportunities readable by the frontend.
8. Documenting local setup.

Do NOT:

- migrate existing Prisma models
- redesign existing APIs
- rewrite existing frontend components
- refactor unrelated code
- introduce a generalized CMS architecture
- implement school management in Payload
- implement volunteer matching in Payload
- implement role/permission systems beyond what is needed here
- redesign the Featured Opportunities React UI
- rebuild the homepage
- add live preview
- add email authentication
- add an SMTP provider
- add Vercel Blob yet
- add elaborate seed infrastructure unless it is genuinely necessary
- perform unrelated cleanup simply because you notice technical debt

Avoid opportunistic refactors.

Small bites.

---

# Payload configuration

Install a current version of Payload that is compatible with the repository's installed Next.js / React versions.

Use Payload's current supported Next.js integration rather than copying patterns from outdated Payload versions.

Configure the appropriate Payload Next.js plugin in the existing Next.js configuration.

Create a normal root-level Payload configuration such as:

```text
payload.config.ts
```

or the equivalent recommended by the installed Payload version.

Configure TypeScript aliases such as `@payload-config` if Payload requires them.

Do not unnecessarily alter existing TypeScript behavior.

---

# PostgreSQL

Use Payload's supported PostgreSQL database adapter.

The application already uses Neon/Postgres.

Payload should coexist with Prisma in the same database.

During local development, use Payload's recommended development workflow for keeping its schema synchronized.

Also establish the beginning of a production-safe migration workflow rather than relying exclusively on development-time schema push behavior.

Do not run destructive operations against existing Prisma-managed tables.

Pay particular attention to this boundary.

After database setup, verify that:

- existing Prisma functionality still works
- Payload can create its own tables
- Payload can query its own collections
- Payload operations do not require Prisma schema changes

---

# Authentication

Create a minimal Payload authentication collection.

Call it something simple and conventional, preferably:

```text
Users
```

Requirements:

- authentication enabled
- users can access the Payload admin
- unauthenticated users cannot create, edit, or delete Opportunities
- unauthenticated users cannot create, edit, or delete Media
- public frontend consumers do NOT need Payload authentication to read published Opportunities

Do not build:

- public registration
- passwordless authentication
- email verification workflows
- SMTP integration
- elaborate role management

Payload's ordinary email/password login is sufficient for this phase.

Document how a developer creates the first admin user locally.

---

# Media

Create a Payload upload collection:

```text
Media
```

The Opportunities collection will reference Media for its image.

For this phase, support local filesystem uploads for local development.

Do NOT implement Vercel Blob yet.

However:

- keep the Media collection cleanly structured so that a Payload storage adapter can be added later
- do not introduce assumptions that would make Vercel Blob difficult to adopt
- document clearly that local filesystem uploads are NOT intended as persistent production/Vercel storage

Add a short TODO or documentation note explaining that persistent Vercel deployments should eventually use Payload's Vercel Blob storage adapter.

Do not allow this deferred storage issue to block the local Payload implementation.

---

# Opportunities collection

Create a Payload collection called:

```text
Opportunities
```

Use the slug:

```text
opportunities
```

This collection is initially being created specifically to support the site's "Featured Opportunities" UI.

Keep the schema deliberately small.

Each Opportunity should support approximately:

```text
title
description
date
location
source
image
url
```

Implement sensible Payload field types and validation.

A reasonable interpretation is:

### `title`

- text
- required

### `description`

- textarea or similarly lightweight text field
- required
- do NOT introduce rich text unless there is a compelling reason

### `date`

This should support the basic display needs of the current design.

Keep it simple.

A single text field may actually be acceptable for this first version because current designs include human-friendly values such as:

- `Fri, Aug 14, 2026 · 9AM–4PM`
- `Jun 23–Jul 30, 2026 · 4–6PM`
- `Year-round`

If you believe a structured date model is clearly superior without substantially expanding scope, you may implement something modest such as optional start/end dates plus display text.

Do NOT build a full event recurrence/calendar system.

Favor simplicity and editor usability.

### `location`

- text
- required unless there is a strong reason otherwise
- must comfortably support values such as:
  - `City-wide`
  - `329 Bryant St. SF`
  - `Remote`

Do not build geocoding or Maps integration.

### `source`

- short text
- represents the originating organization/project
- examples from the design include labels analogous to:
  - `SF Ed Fund`
  - `Mission Bit`
  - `Good Neighbor Lab`

### `image`

- relationship/upload to the `Media` collection
- allow editors/designers to upload/select images in Payload

### `url`

- URL/text field
- intended for the eventual "Get Started" link
- validate reasonably as a URL if Payload supports doing so cleanly

Do not add additional fields unless they solve a concrete implementation requirement.

In particular, do NOT add categories, tags, schools, volunteer types, matching metadata, recurrence, geographic coordinates, analytics, etc.

We can add those later.

---

# Publishing / public access

We want the frontend to retrieve Opportunities.

Set up access so that public users can READ Opportunities through Payload's generated API.

Only authenticated Payload users should be able to:

- create
- update
- delete

For this first iteration, avoid building a sophisticated editorial workflow.

If Payload drafts/versioning can be enabled with negligible complexity and clearly improves safety, it is acceptable, but do not allow drafts/versioning to significantly expand the implementation.

If you enable drafts, public API responses must only expose published records.

Otherwise keep this simple and document the chosen behavior.

---

# Frontend integration boundary

Do NOT build the Featured Opportunities cards or recreate the Figma UI.

However, prove that the frontend can consume the data.

Implement a small, typed data-access layer appropriate for the existing application.

Prefer server-side access where appropriate.

Possible approaches include:

- Payload Local API from Next.js server components/server code
- Payload REST API
- another current Payload-recommended approach

Choose the simplest approach that works naturally when Payload and the Next.js frontend are part of the same application.

The abstraction should make it easy for a future frontend task to do something conceptually like:

```ts
const opportunities = await getOpportunities();
```

Do not wire it into the production homepage yet.

The helper should:

- return public/readable Opportunities
- use generated Payload TypeScript types where practical
- correctly resolve/populate the referenced Media data needed by the eventual UI
- avoid browser-side database access

Add a minimal test, development-only demonstration, or other low-impact verification if useful, but do not create user-facing UI just to demonstrate it.

---

# Generated Payload types

Use Payload's generated TypeScript types if supported by the installed version.

Make sure generated files are handled according to Payload conventions.

Avoid hand-maintaining duplicate TypeScript interfaces when Payload can generate them.

---

# Environment variables

Inspect the repository's existing `.env.example`.

Add only the environment variables required for Payload.

At minimum, Payload will likely need something equivalent to:

```text
PAYLOAD_SECRET=
```

Determine the appropriate database URL arrangement based on the existing Neon/Postgres setup.

Do not hardcode secrets.

Update `.env.example` with explanatory placeholders.

Do not put real credentials into the repository.

---

# Existing Prisma system

Treat Prisma as legacy infrastructure that must remain fully functional.

Do not modify its domain models for this feature.

Do not make Opportunities a Prisma model.

Do not make Media a Prisma model.

Do not make Payload Users a Prisma model.

Payload owns all three.

The two persistence systems should coexist.

It is acceptable for both Prisma and Payload to connect to the same Postgres database as long as they manage independent tables.

---

# Vercel behavior

The project already uses Vercel and currently deploys branches for preview/testing.

Do not redesign the Vercel deployment process.

Do not create a separate Vercel app.

Do not create a special admin deployment.

The Payload-enabled branch should remain one ordinary Next.js deployment.

The existing branch-preview behavior should continue working as before.

The Payload admin and APIs should simply exist as routes within that same deployment.

Persistent uploaded media on Vercel is explicitly NOT part of this task.

Document the limitation of local file storage for deployed previews.

---

# Package management

Use the package manager already used by the repository.

Do not convert package managers.

Update:

- `package.json`
- lockfile

normally as required.

Avoid adding dependencies that are not actually needed.

---

# Documentation

Update the README or add a focused document explaining the minimal Payload workflow.

Keep documentation concise and practical.

Include:

## Running locally

How to:

1. install dependencies
2. configure environment variables
3. run Postgres if applicable
4. prepare the Prisma side if already required
5. prepare the Payload database/schema
6. run the Next.js development server
7. open the existing frontend
8. open `/admin`
9. create/login as an admin
10. create an Opportunity
11. upload/select Media
12. verify that the Opportunity can be retrieved

## Database ownership

Explicitly explain:

```text
Prisma -> existing legacy application tables
Payload -> Payload Users, Media, Opportunities, and Payload metadata
```

Make it very clear that developers should not add Payload tables to the Prisma schema.

## Media limitation

Explain that local disk uploads are suitable for local development only and persistent Vercel storage will be implemented separately, likely using Payload's Vercel Blob adapter.

---

# Testing and verification

Before finishing, perform as much of the following as the repository supports:

1. Install dependencies successfully.
2. Generate Payload types.
3. Run TypeScript checking if available.
4. Run linting.
5. Run existing tests if present.
6. Run the production Next.js build.
7. Start the application locally.
8. Verify an existing frontend route still loads.
9. Verify `/admin` loads.
10. Verify a Payload user can authenticate.
11. Verify an Opportunity can be created.
12. Verify an image can be uploaded/attached locally.
13. Verify an Opportunity can be read through the appropriate Payload API/data helper.
14. Verify unauthenticated writes are rejected.
15. Verify existing Prisma code still builds and remains intact.

Do not claim a check passed unless you actually ran it.

If some checks cannot be completed because credentials or external infrastructure are unavailable, clearly say so.

---

# Preserve application behavior

A major acceptance criterion is:

**Existing application behavior should remain unchanged except for the addition of Payload functionality.**

Pay special attention when moving existing files into `(frontend)`.

Check for issues involving:

- layouts
- metadata
- providers
- CSS imports
- Tailwind
- route handlers
- middleware
- server/client boundaries
- path aliases
- static assets
- API routes
- loading/error/not-found files
- Prisma initialization
- environment variables

Do not assume that simply moving the directory is sufficient.

---

# Acceptance criteria

The task is complete when:

- [ ] The repository remains one Next.js application.
- [ ] Existing frontend routes live cleanly alongside Payload using Next.js route groups.
- [ ] Existing public URLs have not changed.
- [ ] Payload Admin is accessible at `/admin`.
- [ ] Payload uses the existing Postgres/Neon database infrastructure.
- [ ] Existing Prisma models and application behavior remain intact.
- [ ] Prisma does not manage Payload tables.
- [ ] Payload authentication works with a minimal Users collection.
- [ ] A Media upload collection exists.
- [ ] Local image uploads work during local development.
- [ ] An Opportunities collection exists.
- [ ] Opportunities contain the requested simple fields.
- [ ] Opportunity images reference Media.
- [ ] Public reads of Opportunities are supported.
- [ ] Opportunity writes require Payload authentication.
- [ ] A small typed server-side frontend data-access mechanism exists.
- [ ] No Featured Opportunities React UI has been implemented.
- [ ] No unrelated backend features have been migrated to Payload.
- [ ] The application builds successfully, or any blocker is clearly documented.
- [ ] Setup/documentation has been updated.
- [ ] The final diff remains narrow enough to review as an introductory Payload integration.

---

# Final review

Before concluding:

Run:

```bash
git status
git diff --stat
git diff
```

Review your own changes carefully.

Look specifically for:

- accidental unrelated formatting changes
- unrelated refactors
- deleted functionality
- changed URLs
- duplicate configuration
- unused dependencies
- secrets
- unnecessary abstractions
- Prisma/Payload schema overlap
- generated files that should or should not be committed
- assumptions that would break Vercel deployment

Fix those issues before finishing.

Do NOT commit or push unless explicitly asked.

---

# Final response

At completion, give me a concise engineering handoff containing:

1. **Architecture**
   - how Payload was integrated into the existing Next.js app
   - resulting `app/(frontend)` / `app/(payload)` structure

2. **Files changed**
   - important files added/moved/modified

3. **Payload**
   - collections created
   - access-control behavior
   - database adapter used

4. **Database**
   - how Payload and Prisma coexist
   - migrations/schema steps required

5. **Environment**
   - new environment variables

6. **How to test**
   - exact commands
   - `/admin` URL
   - how to create a first user/opportunity

7. **Verification performed**
   - build
   - lint
   - typechecking
   - runtime tests
   - anything that could not be verified

8. **Deferred intentionally**
   - Vercel Blob/persistent media
   - frontend Featured Opportunities components
   - broader migration from Prisma to Payload
   - SMTP/email work

9. **Potential follow-up issues**
   - only genuine issues discovered during implementation

Keep the implementation conservative, working, understandable, and easy for another engineer to review.

---

**Prompt design:** Matt Gianni + ChatGPT (GPT-5.6 Sol), August 2026

**Context:** Developed collaboratively for the SF Brigade `support-sfusd` project to introduce Payload CMS conservatively through the initial Opportunities feature. The prompt reflects decisions made around the existing Next.js/Prisma/Neon architecture, Payload route-group integration, and incremental migration strategy.
