# Payload Opportunities setup

Payload runs inside the existing Next.js application. It adds `/admin`, a
Payload catch-all under `/api`, `/graphql`, and `/graphql-playground` while the
existing public application and its specific API routes keep their current
URLs.

## Run locally

1. Install dependencies.

   ```sh
   npm install
   ```

2. Copy `.env.example` to `.env` and configure the existing Prisma variables
   plus the two Payload variables.

   ```dotenv
   POSTGRES_PRISMA_URL=postgresql://postgres:supersecret@localhost:5432/mydb
   POSTGRES_URL_NON_POOLING=postgresql://postgres:supersecret@localhost:5432/mydb
   PAYLOAD_DATABASE_URL=postgresql://postgres:supersecret@localhost:5432/mydb
   PAYLOAD_SECRET=replace_with_a_long_random_secret
   ```

   `PAYLOAD_DATABASE_URL` must be a server-only Postgres connection string for
   the same database Prisma uses. A direct/non-pooled connection is preferred
   for schema operations. When it is omitted, Payload falls back first to
   `POSTGRES_URL_NON_POOLING`, then to the existing pooled
   `POSTGRES_PRISMA_URL`.

   For Vercel Preview and Production, configure at least
   `POSTGRES_PRISMA_URL`, `PAYLOAD_SECRET`, and `BLOB_READ_WRITE_TOKEN` in the
   corresponding deployment environments. Prefer also configuring
   `POSTGRES_URL_NON_POOLING` or `PAYLOAD_DATABASE_URL` with Neon's direct
   connection URL. Do not use a `localhost` URL on Vercel.

3. Start local Postgres using the existing instructions in
   [`docker/README.md`](../docker/README.md), then prepare the existing Prisma
   data if needed.

   ```sh
   npx prisma db push
   npx prisma db seed
   ```

4. Apply committed Payload migrations.

   ```sh
   npm run payload:migrate
   ```

5. Generate Payload artifacts after changing a collection.

   ```sh
   npm run payload:types
   npm run payload:importmap
   ```

6. Start the combined application.

   ```sh
   npm run dev
   ```

7. Open the existing frontend at <http://localhost:3000> and Payload Admin at
   <http://localhost:3000/admin>. On an empty Payload schema, `/admin` displays
   the create-first-user form. Enter an email and password; that user can then
   log in and manage content.

8. In Payload Admin, upload an image in **Media**, then create an
   **Opportunity** and select that image. Opportunities are public immediately;
   this first integration intentionally does not enable drafts.

9. Verify the generated public REST response, including populated media.

   ```sh
   curl "http://localhost:3000/api/opportunities?depth=1"
   ```

   Server components and other server code can instead call the typed helper:

   ```ts
   import { getOpportunities } from "@/lib/opportunities";

   const opportunities = await getOpportunities();
   ```

## Database ownership and migrations

- Prisma owns the existing legacy application tables in PostgreSQL's `public`
  schema.
- Payload owns the `users`, `media`, `opportunities`, and Payload metadata
  tables in PostgreSQL's `payload` schema.

Both systems connect to the same Postgres/Neon database, but their schemas and
migration histories are independent. Do not add Payload tables to
`prisma/schema.prisma` and do not use Prisma to migrate them.

During development, Payload can synchronize changes within its dedicated
`payload` schema. Before deploying a collection change, generate and review a
migration, commit it, and apply it to the target database before the new app
version starts:

```sh
npm run payload:migrate:create -- descriptive-name
npm run payload:migrate
```

Review generated migrations to confirm every statement remains inside the
`payload` schema. The Vercel build command runs the production-safe
`prisma migrate deploy`, followed by `payload migrate` and `next build`, so both
sets of committed migrations are applied on ordinary branch deployments.
Neither migration step resets existing data. `npm run payload:migrate` remains
available for running Payload migrations independently.

## Access behavior

- Anyone can read Opportunities and Media through Payload's generated API.
- Only authenticated Payload users can create, update, or delete Opportunities
  and Media.
- Payload Users are not publicly registrable. The unauthenticated
  `first-register` flow works only while the Users collection is empty; later
  users are created by an authenticated admin.

## Media storage

Storage is selected automatically by the runtime environment:

- Ordinary local development (including `vercel dev`) writes uploads to the
  ignored `media/` directory.
- Vercel preview and production deployments (`VERCEL=1`) use the official
  Payload Vercel Blob adapter. Local disk writes are disabled in those
  deployments.

To prepare a Vercel project, create a **public** Blob store in the project's
Storage settings and connect it to the environments that host this application.
Vercel then supplies `BLOB_READ_WRITE_TOKEN`; redeploy after connecting the
store. A Vercel build fails early when this token is missing so a deployment
cannot silently fall back to its ephemeral filesystem.

Uploads from Payload Admin go directly from the browser to Blob storage. This
avoids Vercel's server upload-size limit, still requires an authenticated
Payload user, and adds a random filename suffix to prevent collisions. Public
Blob URLs are also allowlisted for Next.js image optimization.

This change does not copy existing local files into Blob storage. Any Media
records that must work on Vercel need their files uploaded to the connected
Blob store (re-uploading through Payload Admin is the simplest option).
