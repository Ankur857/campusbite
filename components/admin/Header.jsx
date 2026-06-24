
import { Moon, Bell, Search } from "lucide-react";

export default function Header({ title = "Dashboard" }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-bold text-orange-800">
        {title}
      </h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 border border-gray-200 rounded-full px-5 py-2.5 w-80 bg-white shadow-sm">
          <Search size={18} className="text-gray-400" />
          <input
            type="search"
            placeholder="Search orders, items..."
            className="outline-none w-full text-sm text-gray-700"
          />
        </div>

        <button className="p-2.5 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
          <Moon size={20} className="text-gray-600" />
        </button>

        <button className="p-2.5 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm relative">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </div>
  );
}