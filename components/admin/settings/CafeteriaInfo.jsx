export default function CafeteriaInfo() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="font-semibold text-lg mb-5">
        Cafeteria Info
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          placeholder="Business Name"
          className="border rounded-lg p-3"
        />

        <input
          placeholder="Support Email"
          className="border rounded-lg p-3"
        />
      </div>

      <textarea
        rows={4}
        placeholder="Location Description"
        className="border rounded-lg p-3 w-full mt-4"
      />
    </div>
  );
}