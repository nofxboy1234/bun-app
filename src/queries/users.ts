import { SQL } from "bun";
import { drizzle } from "drizzle-orm/bun-sql";
import { eq } from "drizzle-orm";
import { usersTable } from "../db/schema";
import * as schema from "../db/schema";
import { seed } from "drizzle-seed";

type User = typeof usersTable.$inferInsert;

const client = new SQL(process.env.DATABASE_URL!);
const db = drizzle({ client, schema });

async function deleteAll() {
  await db.delete(usersTable);
  console.log("Deleted all users from the database");
}

async function resetData() {
  await seed(db, { usersTable });
  console.log("Seeded the db!");
}

async function selectAll() {
  const users = await db.select().from(usersTable).orderBy(usersTable.id);
  console.log("Getting all users from the database: ", users);
}

async function selectOne(id: number) {
  // const user = await db.select().from(usersTable).where(eq(usersTable.id, id));
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, id),
    with: {
      invitee: true,
    },
  });

  return user;
}

async function insert(user: User) {
  await db.insert(usersTable).values(user);
  console.log("New user created!");
}

async function update(user: User, data: User) {
  await db.update(usersTable).set(data).where(eq(usersTable.email, user.email));
  console.log("User info updated!");
}

async function deleteOne(user: User) {
  await db.delete(usersTable).where(eq(usersTable.email, user.email));
  console.log("User deleted!");
}

const users = {
  deleteAll,
  selectAll,
  insert,
  update,
  deleteOne,
  selectOne,
  resetData,
};

export { users };
