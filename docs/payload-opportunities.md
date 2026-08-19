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
   for schema operations. When it is omitted, Payload falls back to
   `POSTGRES_URL_NON_POOLING`.

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
`payload` schema. The existing Vercel build command now runs
`payload migrate` after its existing Prisma preparation step and before
`next build`, so committed Payload migrations are applied on ordinary branch
deployments. `npm run payload:migrate` remains available for running them
independently.

## Access behavior

- Anyone can read Opportunities and Media through Payload's generated API.
- Only authenticated Payload users can create, update, or delete Opportunities
  and Media.
- Payload Users are not publicly registrable. The unauthenticated
  `first-register` flow works only while the Users collection is empty; later
  users are created by an authenticated admin.

## Media limitation

Uploads currently use the local `media/` directory. This is suitable for local
development only. Vercel filesystems are ephemeral, so uploaded files in branch
previews or production are not persistent.

TODO: add Payload's Vercel Blob storage adapter before relying on uploaded media
in persistent deployments. That change is intentionally separate from this
initial integration.
