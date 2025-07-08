import { serve, SQL } from "bun";
import index from "./index.html";
import { drizzle } from "drizzle-orm/bun-sql";
import { eq } from "drizzle-orm";
import { usersTable } from "./db/schema";

const client = new SQL(process.env.DATABASE_URL!);
const db = drizzle({ client });

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async (req) => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);

async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: "John",
    age: 30,
    email: "john@example.com",
  };

  await db.insert(usersTable).values(user);
  console.log("New user created!");

  const users = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users);

  await db
    .update(usersTable)
    .set({
      age: 31,
    })
    .where(eq(usersTable.email, user.email));
  console.log("User info updated!");

  const users2 = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users2);

  await db.delete(usersTable).where(eq(usersTable.email, user.email));
  console.log("User deleted!");

  const users3 = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users3);
}

main();
