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
  CreditCard,
} from "lucide-react";

const AdminLeftPanel = () => {
  const pathname = usePathname();
  const activeMenuClass = "flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-500 transition-all duration-300";
  const menuClass = "flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-900 transition-all duration-300 text-gray-600 dark:text-zinc-400";

  return (
    <div className="w-64 sticky top-0 h-screen bg-white dark:bg-zinc-950 border-r border-gray-200 dark:border-zinc-800 p-5 flex flex-col transition-all duration-300">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <Image
          src="/green-chilli-logo.png"
          alt="Green Chilli Cafe Logo"
          width={50}
          height={50}
          className="object-contain dark:brightness-110"
        />
        <div>
          <h1 className="text-lg font-bold text-green-700 dark:text-green-500">
            Green Chilli
          </h1>
          <p className="text-xs text-gray-500 dark:text-zinc-500">
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
            className="dark:invert dark:opacity-75"
          />
          <span className="text-sm font-medium">Live Orders</span>
        </Link>


        <Link href="/admin/students" className={pathname === "/admin/students" ? activeMenuClass : menuClass}>
          <Users size={20} />
          <span className="text-sm font-medium">Students</span>
        </Link>

        <Link href="/admin/analytics" className={pathname === "/admin/analytics" ? activeMenuClass : menuClass}>
          <ChartLine size={20} />
          <span className="text-sm font-medium">Analytics</span>
        </Link>


        <Link href="/admin/settings" className={pathname === "/admin/settings" ? activeMenuClass : menuClass}>
          <Settings size={20} />
          <span className="text-sm font-medium">Settings</span>
        </Link>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-5 border-t border-gray-100 dark:border-zinc-800">
        <p className="text-xs text-center text-gray-400 dark:text-zinc-500">
          Managed by
        </p>
        <p className="text-sm font-semibold text-center text-orange-700 dark:text-orange-500">
          Cafeteria
        </p>
      </div>
    </div>
  );
};

export default AdminLeftPanel;