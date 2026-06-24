const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

export default function BusinessHours() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="font-semibold text-lg mb-5">
        Business Hours
      </h2>

      <div className="space-y-4">
        {days.map((day) => (
          <div
            key={day}
            className="grid grid-cols-4 gap-4 items-center"
          >
            <span>{day}</span>

            <input
              type="time"
              className="border rounded-lg p-2"
            />

            <input
              type="time"
              className="border rounded-lg p-2"
            />

            <input type="checkbox" defaultChecked />
          </div>
        ))}
      </div>
    </div>
  );
}