const offers = [
  {
    title: "50% OFF",
    place: "Library Cafe",
    desc: "On all Espresso Drinks",
    bg: "bg-green-700",
  },
  {
    title: "BOGO FREE",
    place: "The Hub Burger",
    desc: "Every Tuesday",
    bg: "bg-yellow-800",
  },
];

export default function Offers() {
  return (
    <section>
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-bold">Campus Offers</h2>
        <a className="text-primary">View all</a>
      </div>

      <div className="flex gap-4 overflow-x-auto">
        {offers.map((offer, i) => (
          <div
            key={i}
            className={`w-64 h-32 rounded-xl p-4 text-white ${offer.bg}`}
          >
            <p className="opacity-80">{offer.place}</p>
            <h3 className="text-xl font-bold">{offer.title}</h3>
            <p className="text-sm opacity-90">{offer.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}