const trending = [
  {
    name: "Spicy Ramen Bowl",
    place: "North Hall Pantry",
    rating: 4.8,
  },
  {
    name: "Pepperoni Pizza",
    place: "Quad Pizza Co.",
    rating: 4.5,
  },
  {
    name: "Berry Bliss Acai",
    place: "Green Fuel",
    rating: 4.9,
  },
];

export default function Trending() {
  return (
    <section>
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-bold">Trending Today</h2>
        <span className="text-primary">🔥 Hot Now</span>
      </div>

      <div className="flex gap-4 overflow-x-auto">
        {trending.map((item, i) => (
          <div key={i} className="w-44">
            <div className="h-44 bg-gray-200 rounded-xl mb-2" />
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-500">{item.place}</p>
            <p className="text-xs">⭐ {item.rating}</p>
          </div>
        ))}
      </div>
    </section>
  );
}