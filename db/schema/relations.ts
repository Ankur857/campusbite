import { relations } from "drizzle-orm";

import { users } from "./users";
import { categories } from "./categories";
import { foods } from "./foods";
import { cart } from "./cart";
import { cartItems } from "./cartItems";


//user
export const usersRelations = relations(users, ({ one }) => ({
  cart: one(cart),
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
  })
);


//category
export const categoriesRelations = relations(
  categories,
  ({ many }) => ({
    foods: many(foods),
  })
);