import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

const ADMIN_EMAILS = [
  "shivangi.2428csit201@kiet.edu",
  "ankverma72@gmail.com",
];

export async function syncUser() {
  // 1. Clerk se user lo
  const clerkUser = await currentUser();

  if (!clerkUser) return null;

  const clerkId = clerkUser.id;

  const email =
    clerkUser.emailAddresses?.[0]?.emailAddress || "";

  const fullName =
    `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim();

  const imageUrl = clerkUser.imageUrl || null;

  // 2. DB me check karo
  const existingUser = await db.query.users.findFirst({
    where: eq(users.clerkId, clerkId),
  });

  // 3. Agar user already hai → return it
  if (existingUser) {
    const newRole = ADMIN_EMAILS.includes(email) ? "ADMIN" : "USER";

    if (existingUser.role !== newRole) {
      await db
        .update(users)
        .set({ role: newRole })
        .where(eq(users.clerkId, clerkId));

      return { ...existingUser, role: newRole };
    }

    return existingUser;
  }

  // 4. Role decide karo (IMPORTANT CHANGE 👇)
  const role = ADMIN_EMAILS.includes(email) ? "ADMIN" : "USER";

  // 5. Agar user nahi hai → create karo
  const newUser = await db
    .insert(users)
    .values({
      clerkId,
      email,
      name: fullName,
      image: imageUrl,
      role, // 👈 dynamic role now
    })
    .returning();

  return newUser[0];
}