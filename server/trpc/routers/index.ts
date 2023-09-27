import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../trpc";
import { db } from "~/server/db";
import { post } from "~/server/db/schema";
import { eq } from "drizzle-orm";

const postRouter = createTRPCRouter({
  byId: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      return db
        .select()
        .from(post)
        .where(eq(post.id, input.id))
        .then((rows) => rows[0]);
    }),

  list: publicProcedure.query(async () => {
    return db.select().from(post);
  }),
});

export const appRouter = createTRPCRouter({
  post: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
