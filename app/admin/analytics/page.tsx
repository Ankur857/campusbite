import AdminLeftPanel from '../../../components/admin/AdminLeftPanel';
import AnalyticsManagement from '../../../components/admin/analytics/AnalyticsManagement';
export default function Analytics(){
    return (
        <div className="flex min-h-screen w-full bg-gray-50">
            <AdminLeftPanel />
            <div className="flex-1 flex flex-col">
                <AnalyticsManagement />
                </div>
        </div>
    )
}