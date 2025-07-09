import { SQL } from "bun";
import { drizzle } from "drizzle-orm/bun-sql";
import { eq } from "drizzle-orm";
import { usersTable } from "../db/schema";

const client = new SQL(process.env.DATABASE_URL!);
const db = drizzle({ client });

async function main() {
  // await db.delete(usersTable);

  const user: typeof usersTable.$inferInsert = {
    name: "John",
    email: "john@example.com",
  };

  await db.insert(usersTable).values(user);
  console.log("New user created!");

  const users = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users);

  await db
    .update(usersTable)
    .set({ name: "Johnny" })
    .where(eq(usersTable.email, user.email));
  console.log("User info updated!");

  const users2 = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users2);

  await db.delete(usersTable).where(eq(usersTable.email, user.email));
  console.log("User deleted!");

  const users3 = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users3);
}

export default main;
