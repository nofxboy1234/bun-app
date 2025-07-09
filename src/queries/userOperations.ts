import { users } from "./users";

const alice = {
  name: "Alice",
  email: "alice@example.com",
};

const bob = {
  name: "Bob",
  email: "bob@example.com",
};

// await users.deleteAll();
// await users.insert(alice);
// await users.insert(bob);

// await users.update(bob, {
//   name: "Bob",
//   email: "bob@example.com",
//   invitedBy: 24,
// });

// await users.selectAll();
// await users.deleteOne({ name: "Dylan", email: "dylan@example.com" });

// await users.selectAll();

// const bobRecord = await users.selectOne(25);
// console.log(bobRecord);
// console.log(bobRecord?.invitee);

// await users.deleteAll();
// await users.seedData();

await users.resetData();
await users.seedData();
