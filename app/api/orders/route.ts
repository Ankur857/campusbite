import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems, users } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";

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
      query = query.where(eq(orders.userId, userId));
    }

    if (status) {
      query = query.where(eq(orders.status, status as any));
    }

    const results = await query;

    // Get order items for each order
    const ordersWithItems = await Promise.all(
      results.map(async (result) => {
        const items = await db
          .select()
          .from(orderItems)
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
    const { userId, totalAmount, items } = body;

    if (!userId || !totalAmount || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create order
    const [newOrder] = await db
      .insert(orders)
      .values({
        userId,
        totalAmount,
        status: "pending",
      })
      .returning();

    // Create order items
    const orderItemsData = items.map((item: any) => ({
      orderId: newOrder.id,
      foodId: item.foodId,
      quantity: item.quantity,
      price: item.price,
    }));

    await db.insert(orderItems).values(orderItemsData);

    return NextResponse.json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
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
