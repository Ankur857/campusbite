import { relations } from "drizzle-orm";

import { users } from "./users";
import { categories } from "./categories";
import { foods } from "./foods";
import { cart } from "./cart";
import { cartItems } from "./cartItems";
import { orders } from "./orders";
import { orderItems } from "./orderItems";


//user
export const usersRelations = relations(users, ({ one, many }) => ({
  cart: one(cart),
  orders: many(orders),
}));



//cart
export const cartRelations = relations(cart, ({ one, many }) => ({
  user: one(users, {
    fields: [cart.userId],
    references: [users.id],
  }),

  items: many(cartItems),
}));


//cartitem
export const cartItemsRelations = relations(
  cartItems,
  ({ one }) => ({
    cart: one(cart, {
      fields: [cartItems.cartId],
      references: [cart.id],
    }),

    food: one(foods, {
      fields: [cartItems.foodId],
      references: [foods.id],
    }),
  })
);


//food
export const foodsRelations = relations(
  foods,
  ({ one, many }) => ({
    category: one(categories, {
      fields: [foods.categoryId],
      references: [categories.id],
    }),

    cartItems: many(cartItems),
    orderItems: many(orderItems),
  })
);


//category
export const categoriesRelations = relations(
  categories,
  ({ many }) => ({
    foods: many(foods),
  })
);

//orders
export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  items: many(orderItems),
}));

//orderItems
export const orderItemsRelations = relations(
  orderItems,
  ({ one }) => ({
    order: one(orders, {
      fields: [orderItems.orderId],
      references: [orders.id],
    }),
    food: one(foods, {
      fields: [orderItems.foodId],
      references: [foods.id],
    }),
  })
);