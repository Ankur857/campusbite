import AdminLeftPanel from '../../components/admin/AdminLeftPanel'
import DashBoard from "../../components/admin/DashBoard";

export default function AdminPage() {
    return (
        <div className="flex min-h-screen w-full bg-gray-50">
            <AdminLeftPanel />
            <div className="flex-1 flex flex-col">
                <DashBoard />
            </div>
        </div>
    )
}