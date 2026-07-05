"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";

import { users } from "@/db/schema/users";
import { cart } from "@/db/schema/cart";
import { cartItems } from "@/db/schema/cartItems";
import { foods } from "@/db/schema/foods";

import { eq } from "drizzle-orm";

async function getCurrentDBUser() {

    const { userId } = await auth();

    if (!userId) {

        throw new Error("Unauthorized");

    }

    const user = await db.query.users.findFirst({

        where: eq(users.clerkId, userId)

    });

    if (!user) {

        throw new Error("User not found");

    }

    return user;

}


export async function getOrCreateCart() {

    const user = await getCurrentDBUser();

    const existingCart = await db.query.cart.findFirst({

        where: eq(cart.userId, user.id)

    });

    if (existingCart) {

        return existingCart;

    }

    const inserted = await db
        .insert(cart)
        .values({

            userId: user.id

        })
        .returning();

    return inserted[0];

}


export async function getCart() {

    const currentCart = await getOrCreateCart();

    const items = await db.query.cartItems.findMany({

        where: eq(cartItems.cartId, currentCart.id),

        with: {

            food: {

                with: {

                    category: true

                }

            }

        }

    });

    return items;

}

export async function getCartCount() {

    const items = await getCart();

    return items.reduce(

        (acc: number, item: any) => acc + item.quantity,

        0

    );

}

export async function getCartTotal() {

    const items = await getCart();

    return items.reduce(

        (total: number, item: any) =>

        total +

        Number(item.priceAtAddition)

        *

        item.quantity,

        0

    );

}