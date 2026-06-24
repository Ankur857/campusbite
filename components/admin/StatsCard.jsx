import Image from "next/image";

export default function StatsCard() {
  const cards = [
    {
      title: "Total Orders",
      value: "1,284",
      change: "+12%",
      icon: "/orders.svg",
      color: "bg-orange-50 text-orange-700",
      positive: true,
    },
    {
      title: "Pending Orders",
      value: "42",
      change: "-4%",
      icon: "/porders.svg",
      color: "bg-amber-50 text-amber-700",
      positive: false,
    },
    {
      title: "Revenue (Today)",
      value: "₹3,429.50",
      change: "+8.2%",
      icon: "/revenue.svg",
      color: "bg-emerald-50 text-emerald-700",
      positive: true,
    },
    {
      title: "Avg Prep Time",
      value: "12.4 min",
      change: "3 optimal",
      icon: "/atime.svg",
      color: "bg-blue-50 text-blue-700",
      positive: null,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-6">
            <div className={`p-3.5 rounded-xl ${card.color}`}>
              <Image 
                src={card.icon} 
                alt={card.title} 
                width={24} 
                height={24} 
              />
            </div>

            <span
              className={`px-3.5 py-1 rounded-full text-xs font-medium ${
                card.positive === true
                  ? "bg-green-100 text-green-700"
                  : card.positive === false
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {card.change}
            </span>
          </div>

          <p className="text-sm text-gray-500 mb-1.5">{card.title}</p>

          <h2 className="text-3xl font-bold text-gray-800">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}