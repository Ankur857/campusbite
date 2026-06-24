const items = [
  {
    name: "Caramel Macchiato",
    price: "$4.50",
  },
  {
    name: "Avocado Toast",
    price: "$8.20",
  },
];

export default function QuickReorder() {
  return (
    <section>
      <h2 className="text-lg font-bold mb-4">Quick Reorder</h2>

      <div className="grid grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="p-3 border rounded-xl flex justify-between"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}