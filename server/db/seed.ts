import { db } from ".";
import { post } from "./schema";

async function seed() {
  await db.insert(post).values([
    {
      title: "Hello World",
      content: "This is my first post",
      createdAt: new Date("2023-09-27T14:00:00Z"),
    },
    {
      title: "Hello Again",
      content: "This is my second post",
      createdAt: new Date("2020-02-27T21:00:00Z"),
    },
  ]);
}

seed()
  .then(() => {
    console.log("🚀 Seed complete");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Seed failed", err);
    process.exit(1);
  });
