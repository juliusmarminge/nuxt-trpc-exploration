/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 */
import { initTRPC } from "@trpc/server";
import superjson from "superjson";

const t = initTRPC.create({
  /**
   * Superjson is a JSON serializer that supports Dates, Maps, Sets, and more.
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});

/**
 * Unprotected procedure, accessible by anyone
 * @see https://trpc.io/docs/procedures
 **/
export const publicProcedure = t.procedure;

/**
 * Helper to create a new router
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;
