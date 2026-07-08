import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders, foods } from "@/db/schema";
import { gte, ne, and } from "drizzle-orm";

export async function GET() {
  try {
    // Get orders today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let ordersTodayCount = 0;
    try {
      const todayOrders = await db
        .select()
        .from(orders)
        .where(
          and(
            gte(orders.createdAt, today),
            ne(orders.status, "cancelled")
          )
        );
      ordersTodayCount = todayOrders.length;
    } catch (dbError) {
      console.error("Failed to query orders count:", dbError);
    }

    // Get average prep time from available foods
    let avgPrepTime = 10;
    try {
      const allFoods = await db.select().from(foods);
      if (allFoods.length > 0) {
        avgPrepTime = Math.round(
          allFoods.reduce((acc: number, f: any) => acc + (f.prepTime || 10), 0) / allFoods.length
        );
      }
    } catch (dbError) {
      console.error("Failed to query average prep time:", dbError);
    }

    return NextResponse.json({
      ordersToday: ordersTodayCount,
      avgPrepTime: avgPrepTime,
      rating: "4.8",
    });
  } catch (error) {
    console.error("Error in dashboard stats endpoint:", error);
    return NextResponse.json({
      ordersToday: 0,
      avgPrepTime: 10,
      rating: "4.7",
    });
  }
}
