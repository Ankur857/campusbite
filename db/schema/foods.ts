import {
    pgTable,
    uuid,
    varchar,
    text,
    integer,
    decimal,
    boolean,
    timestamp,
    index
} from "drizzle-orm/pg-core";

import { categories } from "./categories";
import { relations } from "drizzle-orm";

export const foods = pgTable(

    "foods",

    {

        id: uuid("id")
            .defaultRandom()
            .primaryKey(),

        categoryId: uuid("category_id")
            .references(() => categories.id, {
                onDelete: "cascade",
            })
            .notNull(),

        name: varchar("name", {
            length: 255
        }).notNull(),

        description: text("description")
            .notNull(),

        image: varchar("image", {
            length: 500
        }).notNull(),

        price: decimal("price", {
            precision: 10,
            scale: 2,
        }).notNull(),

        rating: decimal("rating", {
            precision: 2,
            scale: 1,
        })
            .default("0"),

        ratingCount: integer("rating_count")
            .default(0),

        stock: integer("stock")
            .default(100),

        prepTime: integer("prep_time")
            .default(10),

        isVeg: boolean("is_veg")
            .default(true),

        isTrending: boolean("is_trending")
            .default(false),

        isPopular: boolean("is_popular")
            .default(false),

        available: boolean("available")
            .default(true),

        createdAt: timestamp("created_at")
            .defaultNow(),

        updatedAt: timestamp("updated_at")
            .defaultNow(),

    },

    (table) => ({

        categoryIdx:
            index("food_category_idx")
                .on(table.categoryId),

        trendingIdx:
            index("food_trending_idx")
                .on(table.isTrending),

        availableIdx:
            index("food_available_idx")
                .on(table.available),

    })
);


