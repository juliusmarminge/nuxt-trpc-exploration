import type { Config } from "drizzle-kit";
import { fileURLToPath } from "url";

export default {
  schema: fileURLToPath(new URL("./schema.ts", import.meta.url)),
  out: "server/db/migrations",
  breakpoints: false,
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
} satisfies Config;
