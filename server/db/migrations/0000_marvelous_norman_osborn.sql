CREATE TABLE IF NOT EXISTS "post" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(128) NOT NULL,
	"content" varchar(1024) NOT NULL,
	"created_at" timestamp DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS "title_idx" ON "post" ("title");