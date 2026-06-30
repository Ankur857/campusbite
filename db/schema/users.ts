import {
    pgTable,
    uuid,
    varchar,
    integer,
    timestamp,
    pgEnum,
    index
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", [
    "USER",
    "ADMIN"
]);

export const users = pgTable(
    "users",
    {

        id: uuid("id").defaultRandom().primaryKey(),

        clerkId: varchar("clerk_id", {
            length: 255
        }).notNull().unique(),

        name: varchar("name", {
            length: 255
        }).notNull(),

        email: varchar("email", {
            length: 255
        }).notNull().unique(),

        image: varchar("image", {
            length: 500
        }),

        phone: varchar("phone", {
            length: 20
        }),

        role: roleEnum("role")
            .default("USER")
            .notNull(),

        bitePoints: integer("bite_points")
            .default(0)
            .notNull(),

        createdAt: timestamp("created_at")
            .defaultNow()
            .notNull(),

        updatedAt: timestamp("updated_at")
            .defaultNow()
            .notNull(),

    },

    (table) => ({

        clerkIdx: index("clerk_idx")
            .on(table.clerkId),

        emailIdx: index("email_idx")
            .on(table.email),

    })
);

