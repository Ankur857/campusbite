import React from "react";
import {
  LayoutDashboard,
  Users,
  ChartLine,
  Settings,
} from "lucide-react";

const AdminLeftPanel = () => {
  const menuClass =
    "flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-red-500 transition-all duration-300 group";

  const textClass =
    "text-sm font-medium text-[#59413A] group-hover:text-white";

  const iconClass =
    "text-[#59413A] group-hover:text-white";

  return (
    <div className="w-56 border-r border-gray-300 p-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          src="/logo.svg"
          alt="logo"
          className="w-9 h-9"
        />

        <div>
          <h1 className="text-xl font-bold text-orange-800">
            CampusBite
          </h1>
          <p className="text-xs text-gray-500">
            Admin Portal
          </p>
        </div>
      </div>

      {/* Menu */}
      <div className="mt-6 flex flex-col gap-2">
        <div className={menuClass}>
          <LayoutDashboard className={iconClass} size={18} />
          <h1 className={textClass}>Dashboard</h1>
        </div>

        <div className={menuClass}>
          <img
            src="/live-order.svg"
            alt="live-order"
            className="w-4 h-4"
          />
          <h1 className={textClass}>Live Order</h1>
        </div>

        <div className={menuClass}>
          <img
            src="/menu.svg"
            alt="menu"
            className="w-4 h-4"
          />
          <h1 className={textClass}>Menu</h1>
        </div>

        <div className={menuClass}>
          <Users className={iconClass} size={18} />
          <h1 className={textClass}>Students</h1>
        </div>

        <div className={menuClass}>
          <ChartLine className={iconClass} size={18} />
          <h1 className={textClass}>Analytics</h1>
        </div>

        <div className={menuClass}>
          <Settings className={iconClass} size={18} />
          <h1 className={textClass}>Settings</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminLeftPanel;