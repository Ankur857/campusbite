import {
  Search,
  Bell,
  CircleHelp,
} from "lucide-react";

export default function NavBar() {
  return (
    <nav className="h-18 px-8 border-b mt-[-20px] bg-white flex items-center justify-between rounded-4xl">
      <div className="flex items-center gap-12">
        <h1 className="text-4xl font-bold text-orange-800 ml-[30px]">
          CampusBite
        </h1>

        <div className="flex items-center gap-10">
          <button className="text-orange-800 font-semibold border-b-2 border-orange-800 pb-1">
            Home
          </button>

          <button className="text-gray-700 font-medium hover:text-orange-800">
            Search
          </button>

          <button className="text-gray-700 font-medium hover:text-orange-800">
            Orders
          </button>

          <button className="text-gray-700 font-medium hover:text-orange-800 ">
            Profile
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative ml-10">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search menu, venues..."
            className="w-60 h-12 bg-gray-100 rounded-full pl-12 pr-4 outline-none text-gray-700 placeholder:text-gray-500"
          />
        </div>
        <Bell
          size={22}
          className="text-gray-700 cursor-pointer"
        />

        <CircleHelp
          size={22}
          className="text-gray-700 cursor-pointer"
        />

        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
        />
      </div>
    </nav>
  );
}