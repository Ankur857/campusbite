"use client";

import useTimer from "@/hooks/useTimer";

export default function HeroTimer() {
  const { formatted } = useTimer(42 * 60 + 15);

  return (
    <section className="mb-8">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#FF5722] via-[#E64A19] to-orange-600 p-6 text-white shadow-lg">

        {/* Content */}
        <div className="relative z-10">
          <p className="text-sm uppercase opacity-80 tracking-wide">
            Next Break Timer
          </p>

          <h1 className="text-2xl font-bold mt-2">
            Next Break at 11:10 AM
          </h1>

          <p className="mt-3 flex items-center gap-2 text-lg">
            ⏰ <span className="font-semibold">{formatted}</span> remaining
          </p>

          <button className="mt-5 bg-white text-orange-600 px-5 py-2 rounded-xl font-semibold hover:bg-gray-100 transition">
            Pre-order now →
          </button>
        </div>

        {/* Decorative blur circle */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
      </div>
    </section>
  );
}