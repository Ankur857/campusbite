import {
  pgTable,
  uuid,
  integer,
  decimal,
  timestamp,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { cart } from "./cart";
import { foods } from "./foods";

export const cartItems = pgTable(
  "cart_items",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    cartId: uuid("cart_id")
      .notNull()
      .references(() => cart.id, {
        onDelete: "cascade",
      }),

    foodId: uuid("food_id")
      .notNull()
      .references(() => foods.id, {
        onDelete: "cascade",
      }),

    quantity: integer("quantity")
      .default(1)
      .notNull(),

    priceAtAddition: decimal("price_at_addition", {
      precision: 10,
      scale: 2,
    }).notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  },

  (table) => ({
    cartIdx: index("cart_idx").on(table.cartId),

    foodIdx: index("food_idx").on(table.foodId),

    uniqueFoodPerCart: uniqueIndex("unique_food_per_cart").on(
      table.cartId,
      table.foodId
    ),
  })
);