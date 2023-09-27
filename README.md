# Nuxt - tRPC - Tailwind - Drizzle

This repo holds a [Nuxt 3](https://nuxt.com/) app built using:

- [tRPC](https://trpc.io) for fully typesafe client-server communication (think REST but better)
- [Drizzle ORM](https://orm.drizzle.team/docs/overview) for database querying
- [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview) for managing database migrations
- [Tailwind CSS](https://tailwindcss.com/) for styling

## Setup

### Prerequisites

#### Node.js

Install Node.js 20 from [nodejs.org](https://nodejs.org/en), or use a version manager such as [nvm](https://github.com/nvm-sh/nvm#install--update-script) or [fnm](https://github.com/Schniz/fnm#installation). If you have nvm or fnm installed, use `nvm use 20` / `fnm use 20`.

#### PNPM

Install pnpm, preferably [using corepack](https://pnpm.io/installation#using-corepack). That will make sure your version aligns with what is set under `packageJson.packageManager`.

```bash
# Some combination of these scripts iirc
corepack prepare pnpm
corepack enable
```

#### Docker

Install something you can run docker containers with using `docker compose`. [OrbStack](https://docs.orbstack.dev/) is nice if you're on MacOS.

Verify that your Docker daemon is running:

```bash
docker compose # or `docker-compose` for older linux setups
```

---

Now that you've got your environment set up, install the dependencies:

```bash
pnpm install
```

Then, create an `.env` file from the example:

```bash
cp .env.example .env
```

Start up the database and run migrations:

```bash
pnpm db:up

# (Optional), fill the db with some seed data
pnpm db:seed

# (Optional), browse the db with Drizzle Studio (http://0.0.0.0:4983)
pnpm db:studio
```

If you need to reset the database, use `pnpm db:nuke` to remove the container and volumes, then `pnpm db:up` again to recreate it.

## Development

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

### Making changes

#### Database

When changing the database, first change the [schema](./server/db/schema.ts) and add/alter/remove tables or columns as needed. Then, run `pnpm db:migrate` to generate and run a migration.

Be aware that if your changes are destructive (e.g. you make a nullable field required without a default value), you might have to manually change the migration to first backfill any null values before making the field required. To generate a migration without automatically running it, use `pnpm db:generate`.

For example, the following migration might fail if `ended_at` contains null values:

```sql
ALTER TABLE "meeting" ALTER COLUMN "ended_at" SET NOT NULL;
```

In that case, you can first backfill the null values and set a sane default, before making the field required:

```sql
UPDATE "meeting" SET "ended_at" = NOW() WHERE "ended_at" IS NULL;
ALTER TABLE "meeting" ALTER COLUMN "ended_at" SET NOT NULL;
```

#### API

When using tRPC, any API endpoint is just a normal function. You can add and remove endpoints/routers as you please, and the frontend client will automatically infer the types of your new endpoints.

Let's create a `create` endpoint for our `meetings` router:

```ts
// server/trpc/routers/index.ts
const meetingsRouter = createTRPCRouter({
  // ...
  create: publicProcedure
    /** @see https://trpc.io/docs/server/validators */
    .input(
      z.object({
        attendeeCount: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      await db.insert(meeting).values({
        startedAt: new Date(),
        attendeeCount: input.attendeeCount,
      });
    }),
});
```

The procedure will now be exposed as `POST /api/trpc/meetings.create`. The frontend client will automatically infer the types of the input and output of the procedure:

```vue
// pages/index.vue
<script setup lang="ts">
const { $client } = useNuxtApp();

// ...
await $client.meetings.create.mutate({ attendeeCount: 10 });
</script>

<template>
  <!-- ... -->
</template>
```
