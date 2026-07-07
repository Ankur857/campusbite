import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems, users, foods } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
config();

const sql = neon(process.env.DATABASE_URL!);

// Get all orders (for admin) or user orders
export async function GET(req: Request) {
  let retries = 0;
  const maxRetries = 3;
  
  while (retries < maxRetries) {
    try {
      const { searchParams } = new URL(req.url);
      const userId = searchParams.get("userId");
      const status = searchParams.get("status");
      const orderId = searchParams.get("orderId");

      let query = db
        .select({
          order: orders,
          user: users,
        })
        .from(orders)
        .leftJoin(users, eq(orders.userId, users.id))
        .orderBy(desc(orders.createdAt));

      if (orderId) {
        query = query.where(eq(orders.id, orderId));
      }

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

      // Get order items for each order (with retry logic for transient errors)
      const ordersWithItems = await Promise.all(
        results.map(async (result: any) => {
          let itemRetries = 0;
          const maxItemRetries = 3;
          
          while (itemRetries < maxItemRetries) {
            try {
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
            } catch (error: any) {
              itemRetries++;
              if (itemRetries >= maxItemRetries) {
                console.error(`Failed to fetch items for order ${result.order.id} after ${maxItemRetries} retries:`, error);
                return {
                  ...result.order,
                  user: result.user,
                  items: [],
                };
              }
              // Wait before retrying (exponential backoff)
              await new Promise(resolve => setTimeout(resolve, Math.pow(2, itemRetries) * 100));
            }
          }
          
          return {
            ...result.order,
            user: result.user,
            items: [],
          };
        })
      );

      return NextResponse.json(ordersWithItems);
    } catch (error: any) {
      retries++;
      if (retries >= maxRetries) {
        console.error("Error fetching orders after retries:", error);
        return NextResponse.json(
          { error: "Failed to fetch orders", details: error.message },
          { status: 500 }
        );
      }
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, retries) * 100));
    }
  }
  
  return NextResponse.json(
    { error: "Failed to fetch orders" },
    { status: 500 }
  );
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
    let userData = null;
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
      userData = user[0];
      console.log("Converted clerkId to internal userId:", internalUserId);
    } else {
      // It's already a UUID, fetch user data
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);
      if (user.length > 0) {
        userData = user[0];
      }
    }

    // Convert totalAmount to decimal string if needed
    const amount = typeof totalAmount === 'number' ? totalAmount.toString() : totalAmount;

    // Generate daily order ID (resets to 1 each day)
    let nextDailyOrderId = 1;
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayStart = today.toISOString();

      // Use raw SQL to get max dailyOrderId for today
      const result = await sql`
        SELECT COALESCE(MAX(daily_order_id), 0) as max_id
        FROM orders
        WHERE created_at >= ${todayStart}
      `;

      nextDailyOrderId = (result[0]?.max_id || 0) + 1;
      console.log("Daily order ID:", nextDailyOrderId);
    } catch (error) {
      console.error("Error getting daily order ID:", error);
      // Fallback to simple increment
      const allOrders = await db
        .select()
        .from(orders)
        .orderBy(desc(orders.dailyOrderId))
        .limit(1);
      nextDailyOrderId = allOrders.length > 0 && allOrders[0].dailyOrderId 
        ? allOrders[0].dailyOrderId + 1 
        : 1;
      console.log("Fallback daily order ID:", nextDailyOrderId);
    }

    const orderItemsData = items.map((item: any) => ({
      foodId: item.foodId,
      quantity: item.quantity,
      price: typeof item.price === 'number' ? item.price.toString() : item.price,
    }));

    // Validate that food IDs exist before creating the order
    for (const item of orderItemsData) {
      const foodExists = await db
        .select()
        .from(foods)
        .where(eq(foods.id, item.foodId))
        .limit(1);

      if (foodExists.length === 0) {
        console.error("Food not found:", item.foodId);
        return NextResponse.json(
          { error: `Food item not found: ${item.foodId}. Please clear your cart and try again.` },
          { status: 400 }
        );
      }
    }

    // Create order
    console.log("Creating order with:", { internalUserId, amount, nextDailyOrderId });
    const [newOrder] = await db
      .insert(orders)
      .values({
        userId: internalUserId,
        totalAmount: amount,
        status: "pending",
        dailyOrderId: nextDailyOrderId,
      })
      .returning();

    console.log("Order created:", newOrder.id);

    const orderItemsWithOrderId = orderItemsData.map((item:any) => ({
      ...item,
      orderId: newOrder.id,
    }));

    console.log("Creating order items:", orderItemsWithOrderId);

    try {
      await db.insert(orderItems).values(orderItemsWithOrderId);
    } catch (itemError) {
      console.error("Order items insert failed, rolling back order:", itemError);
      await db.delete(orders).where(eq(orders.id, newOrder.id));
      throw itemError;
    }

    console.log("Order items created:", orderItemsWithOrderId.length);

    return NextResponse.json({
      success: true,
      order: {
        ...newOrder,
        userName: userData?.name || '',
        userEmail: userData?.email || '',
      },
      itemCount: orderItemsWithOrderId.length,
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
