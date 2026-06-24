import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { syncUser } from "@/lib/sync-user";

export default async function AfterLoginPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const user = await syncUser();

  if (!user) {
    redirect("/");
  }


  if (user.role === "admin") {
    redirect("/admin");
  }

  redirect("/dashboard");
  
}
