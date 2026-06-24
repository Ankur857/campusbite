const items = [
  {
    name: "Double Cheese Burger",
    sold: 428,
  },
  {
    name: "Veggie Poke Bowl",
    sold: 312,
  },
  {
    name: "Iced Caramel Latte",
    sold: 289,
  },
  {
    name: "Chicken Caesar Wrap",
    sold: 194,
  },
];

export default function TopItems() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm h-[400px]">
      <h2 className="font-semibold text-lg mb-6">
        Top Performing Items
      </h2>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.name}>
            <div className="flex justify-between text-sm mb-2">
              <span>{item.name}</span>
              <span>{item.sold} sold</span>
            </div>

            <div className="w-full bg-slate-200 h-2 rounded-full">
              <div
                className="bg-orange-600 h-2 rounded-full"
                style={{
                  width: `${item.sold / 5}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}