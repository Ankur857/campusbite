export default function BreakTimes() {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 rounded-xl p-6 shadow-sm transition-colors duration-300">
      <div className="flex justify-between mb-5">
        <h2 className="font-bold text-lg text-gray-900 dark:text-white">
          Break Times
        </h2>

        <button className="text-orange-600 dark:text-orange-400 font-bold hover:underline cursor-pointer">
          + Add Slot
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="border border-gray-150/40 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 rounded-xl text-gray-800 dark:text-zinc-200 font-bold shadow-sm">
          Morning Cleaning
          <p className="text-sm text-gray-500 dark:text-zinc-500 font-semibold mt-0.5">
            11:00 AM - 11:30 AM
          </p>
        </div>

        <div className="border border-gray-150/40 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 rounded-xl text-gray-800 dark:text-zinc-200 font-bold shadow-sm">
          Staff Shift Change
          <p className="text-sm text-gray-500 dark:text-zinc-500 font-semibold mt-0.5">
            04:00 PM - 04:45 PM
          </p>
        </div>
      </div>
    </div>
  );
}