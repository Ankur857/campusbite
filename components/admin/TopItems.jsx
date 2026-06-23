export default function TopItems() {
  const items = [
    {
      name: "Double Smash Burger",
      orders: 245,
      width: "90%",
      color: "bg-orange-700",
    },
    {
      name: "Korean Fried Chicken",
      orders: 192,
      width: "65%",
      color: "bg-orange-700",
    },
    {
      name: "Garden Pesto Pasta",
      orders: 156,
      width: "48%",
      color: "bg-green-700",
    },
    {
      name: "Miso Salmon Bowl",
      orders: 120,
      width: "40%",
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 h-fit">
      <h2 className="text-xl font-bold mb-6">
        Top Items
      </h2>

      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm font-medium mb-2">
              <span>{item.name}</span>
              <span>{item.orders} orders</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${item.color} h-2 rounded-full`}
                style={{ width: item.width }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-orange-50 rounded-xl p-4">
        <p className="text-sm text-gray-700">
          🔥 <strong>"Double Smash Burger"</strong>
          <br />
          trending 20% higher than last week.
        </p>
      </div>
    </div>
  );
}