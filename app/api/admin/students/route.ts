import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, orders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify user is ADMIN
    const currentUser = await db.query.users.findFirst({
      where: eq(users.clerkId, clerkId),
    });

    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Fetch all users with their orders and items
    const allUsers = await db.query.users.findMany({
      where: eq(users.role, "USER"),
      with: {
        orders: {
          with: {
            items: {
              with: {
                food: true,
              },
            },
          },
        },
      },
    });

    // Map to student stats format
    const studentsData = allUsers.map((user: any) => {
      const userOrders = user.orders || [];
      const totalOrders = userOrders.length;
      
      const totalSpent = userOrders
        .filter((o: any) => o.status !== "cancelled")
        .reduce((sum: number, o: any) => sum + parseFloat(o.totalAmount || "0"), 0);

      const totalItems = userOrders.reduce((sum: number, o: any) => {
        return sum + (o.items || []).reduce((itemSum: number, item: any) => itemSum + item.quantity, 0);
      }, 0);

      // Find most ordered item
      const itemCounts: Record<string, number> = {};
      userOrders.forEach((o: any) => {
        (o.items || []).forEach((item: any) => {
          if (item.food) {
            itemCounts[item.food.name] = (itemCounts[item.food.name] || 0) + item.quantity;
          }
        });
      });

      const sortedItems = Object.entries(itemCounts).sort((a, b) => b[1] - a[1]);
      const mostOrderedItem = sortedItems.length > 0 ? sortedItems[0][0] : "None";

      // Format order history
      const orderHistory = userOrders.map((o: any) => ({
        id: o.id,
        dailyOrderId: o.dailyOrderId,
        createdAt: o.createdAt,
        status: o.status,
        totalAmount: o.totalAmount,
        items: (o.items || []).map((item: any) => ({
          name: item.food?.name || "Unknown Item",
          quantity: item.quantity,
          price: item.price,
        })),
      }));

      return {
        id: user.id,
        name: user.name || "Unnamed Student",
        email: user.email || "No email",
        phone: user.phone || "No phone",
        bitePoints: user.bitePoints || 0,
        createdAt: user.createdAt,
        totalOrders,
        totalSpent,
        totalItems,
        mostOrderedItem,
        orderHistory,
      };
    });

    return NextResponse.json(studentsData);
  } catch (error) {
    console.error("Error in admin students GET API:", error);
    return NextResponse.json({ error: "Failed to fetch student details" }, { status: 500 });
  }
}
