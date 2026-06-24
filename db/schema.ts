import {
  pgTable,
  uuid,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  clerkId: text("clerk_id")
    .notNull()
    .unique(),

  name: text("name"),

  email: text("email")
    .notNull()
    .unique(),

  role: text("role")
    .notNull()
    .default("user"),

  imageUrl: text("image_url"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});