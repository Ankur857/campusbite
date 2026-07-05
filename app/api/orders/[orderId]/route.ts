import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db";
import { orders, orderItems, foods, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;

    const [orderResult] = await db
      .select({
        order: orders,
        user: users,
      })
      .from(orders)
      .leftJoin(users, eq(orders.userId, users.id))
      .where(eq(orders.id, orderId));

    if (!orderResult) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const items = await db
      .select({
        orderItem: orderItems,
        food: foods,
      })
      .from(orderItems)
      .leftJoin(foods, eq(orderItems.foodId, foods.id))
      .where(eq(orderItems.orderId, orderId));

    return NextResponse.json({
      ...orderResult.order,
      user: orderResult.user,
      items: items.map((i: any) => ({
        ...i.orderItem,
        food: i.food,
      })),
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}
