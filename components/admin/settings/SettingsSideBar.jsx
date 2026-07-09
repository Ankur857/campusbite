import {
  Store,
  Clock,
  Coffee,
  CreditCard,
  Bell,
} from "lucide-react";

export default function SettingsSidebar() {
  const items = [
    { icon: Store, text: "Cafeteria Info" },
    { icon: Clock, text: "Business Hours" },
    { icon: Coffee, text: "Break Times" },
    { icon: CreditCard, text: "Payment & Gateway" },
    { icon: Bell, text: "Notifications" },
  ];

  return (
    <div className="w-64 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 rounded-xl p-4 shadow-sm h-fit transition-colors duration-300">
      {items.map((item) => (
        <button
          key={item.text}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-orange-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:text-orange-600 dark:hover:text-white font-semibold transition-all cursor-pointer"
        >
          <item.icon size={18} className="text-gray-400 dark:text-zinc-500 group-hover:text-orange-500" />
          <span>{item.text}</span>
        </button>
      ))}
    </div>
  );
}