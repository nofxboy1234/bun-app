import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  invitedBy: integer("invited_by"),
});

export const usersRelations = relations(usersTable, ({ one }) => ({
  invitee: one(usersTable, {
    fields: [usersTable.invitedBy],
    references: [usersTable.id],
  }),
}));
