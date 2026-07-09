export default function CafeteriaInfo() {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 rounded-xl p-6 shadow-sm transition-colors duration-300">
      <h2 className="font-bold text-lg mb-5 text-gray-900 dark:text-white">
        Cafeteria Info
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          placeholder="Business Name"
          className="border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white transition-all"
        />

        <input
          placeholder="Support Email"
          className="border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white transition-all"
        />
      </div>

      <textarea
        rows={4}
        placeholder="Location Description"
        className="border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white transition-all w-full mt-4"
      />
    </div>
  );
}