import AdminLeftPanel from "../../../components/admin/AdminLeftPanel";

import SettingsSidebar from "../../../components/admin/settings/SettingsSideBar";
import SettingsHeader from "../../../components/admin/settings/SettingsHeader";
import CafeteriaInfo from "../../../components/admin/settings/CafeteriaInfo";
import BusinessHours from "../../../components/admin/settings/BusinessHour";
import BreakTimes from "../../../components/admin/settings/BreakTime";
import PaymentGateway from "../../../components/admin/settings/PaymentGateway";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-950 text-foreground transition-colors duration-300">
      {/* Main Admin Sidebar */}
      <AdminLeftPanel />

      {/* Settings Section */}
      <div className="flex flex-1 p-6 gap-6">
        
        {/* Settings Sidebar */}
        <SettingsSidebar />

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          <SettingsHeader />
          <CafeteriaInfo />
          <BusinessHours />
          <BreakTimes />
          <PaymentGateway />
        </div>

      </div>
    </div>
  );
}