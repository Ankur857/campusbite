"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ChartLine,
  Settings,
  DollarSign,
} from "lucide-react";

const AdminLeftPanel = () => {
  const pathname = usePathname();
  const activeMenuClass = "flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer bg-orange-50 text-orange-700 transition-all duration-300";
  const menuClass = "flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-100 transition-all duration-300 text-gray-600";

  return (
    <div className="w-64 sticky top-0 h-screen bg-white border-r border-gray-200 p-5 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <Image
          src="/logo.svg"
          alt="CampusBite Logo"
          width={40}
          height={40}
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
      <div className="flex flex-col gap-1.5">
        <Link href="/admin" className={pathname === "/admin" ? activeMenuClass : menuClass}>
          <LayoutDashboard size={20} />
          <span className="text-sm font-medium">Dashboard</span>
        </Link>

        <Link href="/admin/live-order" className={pathname === "/admin/live-order" ? activeMenuClass : menuClass}>
          <Image
            src="/live-order.svg"
            alt="Live Orders"
            width={20}
            height={20}
          />
          <span className="text-sm font-medium">Live Orders</span>
        </Link>

        <div className={menuClass}>
          <Image
            src="/menu.svg"
            alt="Menu"
            width={20}
            height={20}
          />
          <span className="text-sm font-medium">Menu</span>
        </div>

        <div className={menuClass}>
          <Users size={20} />
          <span className="text-sm font-medium">Students</span>
        </div>

        <div className={menuClass}>
          <ChartLine size={20} />
          <span className="text-sm font-medium">Analytics</span>
        </div>

        <div className={menuClass}>
          <Settings size={20} />
          <span className="text-sm font-medium">Settings</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-5 border-t border-gray-100">
        <p className="text-xs text-center text-gray-400">
          Managed by
        </p>
        <p className="text-sm font-semibold text-center text-orange-700">
          Cafeteria
        </p>
      </div>
    </div>
  );
};

export default AdminLeftPanel;