import AdminLeftPanel from '../../../components/admin/AdminLeftPanel';
import LiveOrderDashboard from '../../../components/admin/LiveOrder';

export default function LiveOrderPage() {
    return (
        <div className="flex min-h-screen w-full bg-gray-50 dark:bg-zinc-950 text-foreground transition-colors duration-300">
            <AdminLeftPanel />
            <div className="flex-1 flex flex-col">
                <LiveOrderDashboard />
            </div>
        </div>
    )
}