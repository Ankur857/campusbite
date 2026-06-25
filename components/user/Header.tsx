import { UserProfile } from "@clerk/nextjs";
import {
  Bell,
  Search,
  Flame,
} from "lucide-react";
import LogoutButton from "../../components/admin/SignOutButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-orange-100 bg-[#FFF8F3]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg">
            <Flame size={18} />
          </div>

          <h1 className="text-2xl font-black tracking-tight">
            campus
            <span className="text-orange-600">
              BITE
            </span>
          </h1>
        </div>

        
        {/* Right */}
        <div className="flex items-center gap-3">
          <button className="relative grid h-10 w-10 place-items-center rounded-full border bg-white">
            <Bell size={18} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500" />
          </button>

          <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-orange-500 to-red-600 font-semibold text-white">
            A
          </div>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}