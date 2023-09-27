import { sql } from "drizzle-orm";
import {
  serial,
  pgTable,
  timestamp,
  varchar,
  index,
  integer,
} from "drizzle-orm/pg-core";

export const post = pgTable(
  "post",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 128 }).notNull(),
    content: varchar("content", { length: 1024 }).notNull(),
    likes: integer("likes").notNull().default(0),
    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`NOW()`),
  },
  (table) => ({
    titleIndex: index("title_idx").on(table.title),
  })
);
