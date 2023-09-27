import { createNuxtApiHandler } from "trpc-nuxt";
import { appRouter } from "~~/server/trpc/routers";

/**
 * Expose tRPC router to the world
 */
export default createNuxtApiHandler({
  router: appRouter,
});
