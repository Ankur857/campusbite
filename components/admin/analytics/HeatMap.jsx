const data = [
  [1, 2, 3, 4, 5, 4, 3, 2, 1, 1, 2],
  [1, 2, 4, 5, 5, 5, 4, 3, 2, 1, 2],
  [2, 2, 3, 5, 5, 5, 4, 3, 4, 4, 4],
  [1, 2, 2, 3, 5, 5, 4, 3, 2, 2, 1],
  [4, 3, 4, 5, 5, 5, 5, 4, 4, 3, 2],
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const hours = [
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
];

export default function TrafficHeatmap() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="font-semibold text-lg mb-6">
        Traffic Heatmap (Peak Hours)
      </h2>

      <div className="overflow-x-auto">
        <div className="grid gap-2">
          <div className="grid grid-cols-12 gap-2">
            <div />
            {hours.map((hour) => (
              <div
                key={hour}
                className="text-xs text-center"
              >
                {hour}:00
              </div>
            ))}
          </div>

          {days.map((day, rowIndex) => (
            <div
              key={day}
              className="grid grid-cols-12 gap-2 items-center"
            >
              <div className="text-sm font-medium">
                {day}
              </div>

              {data[rowIndex].map((value, colIndex) => (
                <div
                  key={colIndex}
                  className={`h-8 rounded ${
                    value === 1
                      ? "bg-orange-100"
                      : value === 2
                      ? "bg-orange-200"
                      : value === 3
                      ? "bg-orange-300"
                      : value === 4
                      ? "bg-orange-500"
                      : "bg-orange-700"
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}