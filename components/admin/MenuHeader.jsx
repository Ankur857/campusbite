"use client";

export default function MenuHeader({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}) {
  const categories = [
    "All Items",
    "Breakfast",
    "Main Course",
    "Snacks",
    "Beverages",
    "Desserts",
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Menu Management
          </h1>
          <p className="text-gray-500">
            Configure your daily offerings and meal availability
          </p>
        </div>

        <input
          type="text"
          placeholder="Search menu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-72 border rounded-xl px-4 py-2 outline-none"
        />
      </div>

      <div className="flex gap-3 flex-wrap">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setSelectedCategory(item)}
            className={`px-5 py-2 rounded-full text-sm transition ${
              selectedCategory === item
                ? "bg-orange-700 text-white"
                : "bg-white border hover:bg-orange-50"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}