import {
    pgTable,
    uuid,
    varchar,
    timestamp,
    uniqueIndex
} from "drizzle-orm/pg-core";

export const categories = pgTable(
    "categories",
    {

        id: uuid("id")
            .defaultRandom()
            .primaryKey(),

        name: varchar("name", {
            length: 100
        }).notNull(),

        image: varchar("image", {
            length: 500
        }),

        createdAt: timestamp("created_at")
            .defaultNow()
            .notNull(),

    },

    (table) => ({

        categoryNameIdx:
            uniqueIndex("category_name_idx")
                .on(table.name),

    })
);

