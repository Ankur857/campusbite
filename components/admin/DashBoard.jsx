import StatsCard from "../admin/StatsCard";
import RecentOrders from "../admin/RecentOrders";
import TopItems from "../admin/TopItems";
import Header from "../admin/Header";
import LogOut from "../admin/SignOutButton";

export default function Dashboard(){
    return (
        <div className="flex-1 flex flex-col p-8 overflow-auto">
            <Header />
            
            <div className="mb-8">
                <StatsCard />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
                <div className="lg:col-span-2">
                    <RecentOrders />
                </div>
                <div className="lg:col-span-1">
                    <TopItems />
                </div>
                <div className="flex justify-end mb-4">
  <LogOut />
</div>
            </div>
        </div>
    )
}