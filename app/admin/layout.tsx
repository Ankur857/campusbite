import { OrdersProvider } from "@/contexts/OrdersContext";
import { CartProvider } from "@/contexts/CartContext";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) redirect("/");

  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, userId),
  });

  if (!user || user.role !== "ADMIN") redirect("/dashboard");

  return (
    <CartProvider>
      <OrdersProvider>{children}</OrdersProvider>
    </CartProvider>
  );
}
