import { relations } from "drizzle-orm";
import { integer, jsonb, pgTable, serial, varchar } from "drizzle-orm/pg-core";

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
  profileInfo: one(profileInfo),
}));

export const profileInfo = pgTable("profile_info", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => usersTable.id),
  metadata: jsonb("metadata"),
});

export const profileInfoRelations = relations(profileInfo, ({ one }) => ({
  user: one(usersTable, {
    fields: [profileInfo.userId],
    references: [usersTable.id],
  }),
}));
