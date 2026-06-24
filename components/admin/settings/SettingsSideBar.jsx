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
    <div className="w-64 bg-white rounded-xl p-4 shadow-sm h-fit">
      {items.map((item) => (
        <button
          key={item.text}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-orange-50"
        >
          <item.icon size={18} />
          {item.text}
        </button>
      ))}
    </div>
  );
}