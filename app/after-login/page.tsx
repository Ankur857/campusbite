// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import { db } from "@/db";
// import { users } from "@/db/schema";
// import { eq } from "drizzle-orm";

// export default async function AfterLoginPage() {
//   const { userId } = await auth();

//   if (!userId) {
//     redirect("/");
//   }

//   const user = await db.query.users.findFirst({
//     where: eq(users.clerkId, userId),
//   });

//   if (!user) {
//     redirect("/onboarding");
//   }

//   switch (user.role) {
//     case "admin":
//       redirect("/admin");

//     case "user":
//       redirect("/dashboard");

//     default:
//       redirect("/");
//   }
// }


import { UserButton } from '@clerk/nextjs'
import React from 'react'

const UserPage = () => {
  return (
    <div>
        <UserButton/>
    </div>
  )
}

export default UserPage