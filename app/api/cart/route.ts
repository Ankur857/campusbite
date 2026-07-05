import { NextResponse } from "next/server";
import { db } from "@/db";
import { cart, cartItems, foods, users } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

// Get user's cart
export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    console.log("Cart GET request - userId:", userId);
    if (!userId) {
      console.log("Cart GET: No userId found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get internal user ID from Clerk ID
    const user = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId))
      .limit(1);

    if (user.length === 0) {
      console.log("User not found in database");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const internalUserId = user[0].id;

    // Get user's cart
    const userCart = await db
      .select()
      .from(cart)
      .where(eq(cart.userId, internalUserId))
      .limit(1);

    console.log("User cart:", userCart);

    if (userCart.length === 0) {
      console.log("No cart found for user");
      return NextResponse.json([]);
    }

    const cartId = userCart[0].id;
    console.log("Cart ID:", cartId);

    // Get cart items with food details
    const items = await db
      .select({
        cartItem: cartItems,
        food: foods,
      })
      .from(cartItems)
      .leftJoin(foods, eq(cartItems.foodId, foods.id))
      .where(eq(cartItems.cartId, cartId));

    console.log("Cart items:", items);

    const result = items.map((item: any) => ({
      ...item.food,
      quantity: item.cartItem.quantity,
      cartItemId: item.cartItem.id,
    }));

    console.log("Returning cart items:", result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

// Add item to cart
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      console.log("Cart POST: No userId found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { foodId, quantity = 1 } = body;

    console.log("Cart POST request:", { userId, foodId, quantity });

    if (!foodId) {
      return NextResponse.json({ error: "Food ID is required" }, { status: 400 });
    }

    // Get internal user ID from Clerk ID
    const user = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId))
      .limit(1);

    if (user.length === 0) {
      console.log("User not found in database");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const internalUserId = user[0].id;

    // Get or create user's cart
    let userCart = await db
      .select()
      .from(cart)
      .where(eq(cart.userId, internalUserId))
      .limit(1);

    let cartId: string;
    if (userCart.length === 0) {
      console.log("Creating new cart for user:", internalUserId);
      const [newCart] = await db
        .insert(cart)
        .values({ userId: internalUserId })
        .returning();
      cartId = newCart.id;
      console.log("New cart created:", cartId);
    } else {
      cartId = userCart[0].id;
      console.log("Using existing cart:", cartId);
    }

    // Get food price
    const food = await db
      .select()
      .from(foods)
      .where(eq(foods.id, foodId))
      .limit(1);

    if (food.length === 0) {
      console.log("Food not found:", foodId);
      return NextResponse.json({ error: "Food not found" }, { status: 404 });
    }

    console.log("Food found:", food[0].name);

    // Check if item already exists in cart
    const existingItem = await db
      .select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.cartId, cartId),
          eq(cartItems.foodId, foodId)
        )
      )
      .limit(1);

    if (existingItem.length > 0) {
      console.log("Updating existing item quantity");
      // Update quantity
      const [updated] = await db
        .update(cartItems)
        .set({
          quantity: existingItem[0].quantity + quantity,
        })
        .where(eq(cartItems.id, existingItem[0].id))
        .returning();
      console.log("Item updated:", updated);
      return NextResponse.json(updated);
    } else {
      console.log("Adding new item to cart");
      // Add new item
      const [newItem] = await db
        .insert(cartItems)
        .values({
          cartId,
          foodId,
          quantity,
          priceAtAddition: food[0].price,
        })
        .returning();
      console.log("New item added:", newItem);
      return NextResponse.json(newItem);
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 });
  }
}

// Update cart item quantity
export async function PATCH(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { cartItemId, quantity } = body;

    if (!cartItemId || quantity === undefined) {
      return NextResponse.json(
        { error: "Cart item ID and quantity are required" },
        { status: 400 }
      );
    }

    if (quantity <= 0) {
      // Remove item
      await db
        .delete(cartItems)
        .where(eq(cartItems.id, cartItemId));
      return NextResponse.json({ success: true });
    }

    const [updated] = await db
      .update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, cartItemId))
      .returning();

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
}

// Remove item from cart
export async function DELETE(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const cartItemId = searchParams.get("cartItemId");

    if (!cartItemId) {
      return NextResponse.json(
        { error: "Cart item ID is required" },
        { status: 400 }
      );
    }

    await db
      .delete(cartItems)
      .where(eq(cartItems.id, cartItemId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing from cart:", error);
    return NextResponse.json({ error: "Failed to remove from cart" }, { status: 500 });
  }
}

// Clear entire cart
export async function PUT(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's cart
    const userCart = await db
      .select()
      .from(cart)
      .where(eq(cart.userId, userId))
      .limit(1);

    if (userCart.length > 0) {
      await db
        .delete(cartItems)
        .where(eq(cartItems.cartId, userCart[0].id));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return NextResponse.json({ error: "Failed to clear cart" }, { status: 500 });
  }
}
