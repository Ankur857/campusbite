export default function SettingsHeader() {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500">
          Manage your cafeteria profile and preferences.
        </p>
      </div>

      <button className="bg-orange-600 text-white px-5 py-2 rounded-lg">
        Save All Changes
      </button>
    </div>
  );
}