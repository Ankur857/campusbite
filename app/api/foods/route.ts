import { NextResponse } from "next/server";
import { db } from "@/db";
import { foods, categories } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");
    const availableOnly = searchParams.get("availableOnly") === "true";

    let query = db
      .select({
        food: foods,
        category: categories,
      })
      .from(foods)
      .leftJoin(categories, eq(foods.categoryId, categories.id))
      .orderBy(desc(foods.createdAt));

    if (categoryId) {
      query = query.where(eq(foods.categoryId, categoryId));
    }

    if (availableOnly) {
      query = query.where(eq(foods.available, true));
    }

    const data = await query;

    return NextResponse.json(
      data.map((item: any) => ({
        ...item.food,
        category: item.category,
      }))
    );
  } catch (error) {
    console.error("Error fetching foods:", error);
    return NextResponse.json(
      { error: "Failed to fetch foods" },
      { status: 500 }
    );
  }
}
