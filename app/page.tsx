import PortalCard from "./components/PortalCard";
import Image from "next/image";
import { Moon } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-orange-50 flex flex-col items-center px-6 py-10 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-200 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>
      
      {/* Header */}
      <div className="w-full max-w-5xl flex justify-between items-center relative z-10 ml-170">
        <div className="flex items-center gap-1">
          <Image 
            src="/icon.svg" 
            alt="CampusBite Logo" 
            width={48} 
            height={48} 
            className="w-18 h-18"
          />
          <h1 className="text-4xl font-bold text-orange-800">
            CampusBite
          </h1>
        </div>

        <button className="w-10 h-10 rounded-full bg-gray-100 shadow-sm flex items-center justify-center">
          <Moon size={20} className="text-gray-700" />
        </button>
      </div>

      {/* Tagline */}
      <div className="text-center mt-8 relative z-10">
        <h2 className="text-xl font-semibold text-gray-800">
          Skip the queue.
        </h2>

        <p className="text-lg font-semibold text-orange-700 mt-1">
          Order from class.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-10 w-full max-w-4xl relative z-10">
        <PortalCard
          title="Student Portal"
          description="Order food from your classroom and pick it up when it's ready."
          buttonText="Get Started"
          color="bg-amber-50 text-amber-600"
          icon={<Image src="/food.svg" alt="Student" width={28} height={28} />}
          extraIcon={<Image src="/student.png" alt="" width={80} height={80} className="opacity-10" />}
        />

        <PortalCard
          title="Admin Portal"
          description="Manage orders, inventory, and cafeteria operations in real-time."
          buttonText="Enterprise Login"
          color="bg-emerald-50 text-emerald-600"
          icon={<Image src="/admin2.svg" alt="Admin" width={28} height={28} />}
          extraIcon={<Image src="/admin.svg" alt="" width={80} height={80} className="opacity-10" />}
        />
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center relative z-10">
        <div className="flex gap-8 justify-center text-xs tracking-widest text-gray-400 uppercase">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Support</span>
        </div>

        <p className="mt-4 text-xs text-gray-400">
          © 2024 CampusBite Central. All rights reserved.
        </p>
      </footer>
    </main>
  );
}