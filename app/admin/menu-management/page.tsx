import AdminLeftPanel from '../../../components/admin/AdminLeftPanel';
import MenuManagement from '../../../components/admin/MenuManagement';

export default function MenuManagementPage(){
    return (
       <div className="flex min-h-screen w-full bg-gray-50">
            <AdminLeftPanel />
            <div className="flex-1 flex flex-col">
            <MenuManagement />
        </div>
        </div>
    )
}