export default function SettingsHeader() {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Settings</h1>
        <p className="text-gray-500 dark:text-zinc-450 text-sm font-medium mt-1">
          Manage your cafeteria profile and preferences.
        </p>
      </div>

      <button className="bg-orange-600 hover:bg-orange-700 hover:scale-[1.02] text-white font-bold px-5 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer">
        Save All Changes
      </button>
    </div>
  );
}