import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

// Get user profile
export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let user = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId))
      .limit(1);

    // If user doesn't exist in database, create them
    if (user.length === 0) {
      console.log("User not found in database, creating...");

      const [newUser] = await db
        .insert(users)
        .values({
          clerkId: userId,
          email: '',
          name: '',
          phone: '',
          role: 'USER',
          bitePoints: 0,
        })
        .returning();

      console.log("User created:", newUser);
      user = [newUser];
    }

    return NextResponse.json(user[0]);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

// Update user profile
export async function PATCH(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, phone, bio } = body;

    const [updatedUser] = await db
      .update(users)
      .set({
        name,
        phone,
        ...(bio && { bio }),
        updatedAt: new Date(),
      })
      .where(eq(users.clerkId, userId))
      .returning();

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
