import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems, users, foods } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

// Get all orders (for admin) or user orders
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");

    let query = db
      .select({
        order: orders,
        user: users,
      })
      .from(orders)
      .leftJoin(users, eq(orders.userId, users.id))
      .orderBy(desc(orders.createdAt));

    if (userId) {
      // If userId is a Clerk ID (not a UUID), look it up
      if (!userId.includes('-')) {
        const user = await db
          .select()
          .from(users)
          .where(eq(users.clerkId, userId))
          .limit(1);
        if (user.length > 0) {
          query = query.where(eq(orders.userId, user[0].id));
        }
      } else {
        query = query.where(eq(orders.userId, userId));
      }
    }

    if (status) {
      query = query.where(eq(orders.status, status as any));
    }

    const results = await query;

    // Get order items for each order
    const ordersWithItems = await Promise.all(
      results.map(async (result) => {
        const items = await db
          .select({
            id: orderItems.id,
            foodId: orderItems.foodId,
            quantity: orderItems.quantity,
            price: orderItems.price,
            food: foods,
          })
          .from(orderItems)
          .leftJoin(foods, eq(orderItems.foodId, foods.id))
          .where(eq(orderItems.orderId, result.order.id));
        return {
          ...result.order,
          user: result.user,
          items,
        };
      })
    );

    return NextResponse.json(ordersWithItems);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// Create a new order
export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { userId, totalAmount, items } = body;

    console.log("Creating order - userId:", userId, "totalAmount:", totalAmount, "items:", items.length);

    if (!userId || !totalAmount || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert Clerk userId to internal user UUID
    let internalUserId = userId;
    if (!userId.includes('-')) {
      // It's a Clerk ID (string), look it up
      const user = await db
        .select()
        .from(users)
        .where(eq(users.clerkId, userId))
        .limit(1);

      if (user.length === 0) {
        console.error("User not found for clerkId:", userId);
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }
      internalUserId = user[0].id;
      console.log("Converted clerkId to internal userId:", internalUserId);
    }

    // Convert totalAmount to decimal string if needed
    const amount = typeof totalAmount === 'number' ? totalAmount.toString() : totalAmount;

    // Create order
    const [newOrder] = await db
      .insert(orders)
      .values({
        userId: internalUserId,
        totalAmount: amount,
        status: "pending",
      })
      .returning();

    console.log("Order created:", newOrder.id);

    // Create order items
    const orderItemsData = items.map((item: any) => ({
      orderId: newOrder.id,
      foodId: item.foodId,
      quantity: item.quantity,
      price: typeof item.price === 'number' ? item.price.toString() : item.price,
    }));

    await db.insert(orderItems).values(orderItemsData);

    console.log("Order items created:", orderItemsData.length);

    return NextResponse.json({
      success: true,
      order: newOrder,
      itemCount: orderItemsData.length,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order", details: String(error) },
      { status: 500 }
    );
  }
}

// Update order status
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { orderId, status, tokenNumber, pickupDetails } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    const updateData: any = {
      updatedAt: new Date(),
    };

    if (status) {
      updateData.status = status;
    }

    if (tokenNumber !== undefined) {
      updateData.tokenNumber = tokenNumber;
    }

    if (pickupDetails) {
      updateData.pickupDetails = pickupDetails;
    }

    const [updatedOrder] = await db
      .update(orders)
      .set(updateData)
      .where(eq(orders.id, orderId))
      .returning();

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
