const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

export default function BusinessHours() {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 rounded-xl p-6 shadow-sm transition-colors duration-300">
      <h2 className="font-bold text-lg mb-5 text-gray-900 dark:text-white">
        Business Hours
      </h2>

      <div className="space-y-4">
        {days.map((day) => (
          <div
            key={day}
            className="grid grid-cols-4 gap-4 items-center"
          >
            <span className="font-semibold text-gray-700 dark:text-zinc-300">{day}</span>

            <input
              type="time"
              className="border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-2 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />

            <input
              type="time"
              className="border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-2 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />

            <div className="flex items-center">
              <input type="checkbox" defaultChecked className="accent-orange-655 w-4 h-4 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}