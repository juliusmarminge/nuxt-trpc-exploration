import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { fileURLToPath } from "url";

await migrate(
  drizzle(
    postgres(process.env.POSTGRES_URL!, {
      // Limit to 1 connection when running migrations
      max: 1,
    })
  ),
  { migrationsFolder: fileURLToPath(new URL("migrations", import.meta.url)) }
)
  .then(() => {
    console.log("🚀 Migrations complete");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Migrations failed", error);
    process.exit(1);
  });
