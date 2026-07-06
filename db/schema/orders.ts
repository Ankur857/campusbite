import {
    pgTable,
    uuid,
    varchar,
    integer,
    decimal,
    timestamp,
    pgEnum,
    index
} from "drizzle-orm/pg-core";

import { users } from "./users";
import { relations } from "drizzle-orm";

export const orderStatusEnum = pgEnum("order_status", [
    "pending",
    "confirmed",
    "preparing",
    "ready",
    "delivered",
    "cancelled"
]);

export const orders = pgTable(
    "orders",
    {
        id: uuid("id")
            .defaultRandom()
            .primaryKey(),

        userId: uuid("user_id")
            .references(() => users.id, {
                onDelete: "cascade",
            })
            .notNull(),

        totalAmount: decimal("total_amount", {
            precision: 10,
            scale: 2,
        }).notNull(),

        status: orderStatusEnum("status")
            .default("pending")
            .notNull(),

        tokenNumber: integer("token_number"),

        prepTime: integer("prep_time"),

        pickupDetails: varchar("pickup_details", { length: 255 }),

        dailyOrderId: integer("daily_order_id"),

        createdAt: timestamp("created_at")
            .defaultNow()
            .notNull(),

        updatedAt: timestamp("updated_at")
            .defaultNow()
            .notNull(),
    },

    (table) => ({
        userIdx:
            index("order_user_idx")
                .on(table.userId),

        statusIdx:
            index("order_status_idx")
                .on(table.status),

        createdAtIdx:
            index("order_created_at_idx")
                .on(table.createdAt),
    })
);
