import {
    pgTable,
    uuid,
    integer,
    decimal,
    index
} from "drizzle-orm/pg-core";

import { orders } from "./orders";
import { foods } from "./foods";

export const orderItems = pgTable(
    "order_items",
    {
        id: uuid("id")
            .defaultRandom()
            .primaryKey(),

        orderId: uuid("order_id")
            .references(() => orders.id, {
                onDelete: "cascade",
            })
            .notNull(),

        foodId: uuid("food_id")
            .references(() => foods.id, {
                onDelete: "cascade",
            })
            .notNull(),

        quantity: integer("quantity")
            .notNull(),

        price: decimal("price", {
            precision: 10,
            scale: 2,
        }).notNull(),
    },

    (table) => ({
        orderIdx:
            index("order_item_order_idx")
                .on(table.orderId),

        foodIdx:
            index("order_item_food_idx")
                .on(table.foodId),
    })
);
