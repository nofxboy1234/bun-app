import { users } from "./users";

const user1 = {
  name: "John",
  email: "john@example.com",
};

const user2 = {
  name: "John",
  email: "john2@example.com",
};

await users.deleteAll();
await users.insert(user1);
await users.insert(user2);
await users.update(user1, { name: "Dylan", email: "dylan@example.com" });
await users.selectAll();
await users.deleteOne({ name: "Dylan", email: "dylan@example.com" });
await users.selectAll();
