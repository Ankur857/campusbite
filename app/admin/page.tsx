import AdminLeftPanel from '../../components/admin/AdminLeftPanel'
import DashBoard from "../../components/admin/DashBoard";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";

export default async function AdminPage() {
    const { userId } = await auth();

    if (!userId) redirect("/");

    const user = await db.query.users.findFirst({
        where: eq(users.clerkId, userId),
    });

    if (!user || user.role !== "ADMIN") {
        redirect("/dashboard");
    }
    return (
        <div className="flex min-h-screen w-full bg-gray-50">
            <AdminLeftPanel />
            <div className="flex-1 flex flex-col">
                <DashBoard />
            </div>
        </div>
    )
}