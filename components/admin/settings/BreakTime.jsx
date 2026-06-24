export default function BreakTimes() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between mb-5">
        <h2 className="font-semibold text-lg">
          Break Times
        </h2>

        <button className="text-orange-600">
          + Add Slot
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          Morning Cleaning
          <p className="text-sm text-gray-500">
            11:00 AM - 11:30 AM
          </p>
        </div>

        <div className="border rounded-lg p-4">
          Staff Shift Change
          <p className="text-sm text-gray-500">
            04:00 PM - 04:45 PM
          </p>
        </div>
      </div>
    </div>
  );
}