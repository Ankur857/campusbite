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


  switch (user.role) {
    case "admin":
      redirect("/admin");

    case "user":
      redirect("/dashboard");

    default:
      redirect("/");
  }
}
