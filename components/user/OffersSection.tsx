import Image from "next/image";

export default function OffersSection() {
  return (
    <section className="mt-14">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-orange-600">
            Campus
          </p>

          <h3 className="text-3xl font-black">
            Campus Offers
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Student-only deals from your canteen.
          </p>
        </div>

        <button className="hidden font-semibold text-orange-600 sm:block">
          See All →
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {/* Main Offer */}
        <div className="relative overflow-hidden rounded-[28px] md:col-span-2">
          <Image
            src="/offer-banner.jpg"
            alt="Offer"
            width={1200}
            height={800}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent p-6">
            <div className="flex h-full flex-col justify-between">
              <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-bold text-orange-600">
                Flat 30% Off
              </span>

              <div>
                <h3 className="text-4xl font-black text-white">
                  Combo Tuesdays
                </h3>

                <p className="mt-2 max-w-sm text-white/90">
                  Burger + Fries + Drink under ₹150 till 4 PM.
                </p>

                <button className="mt-4 rounded-full bg-white px-5 py-3 font-semibold">
                  Grab Combo →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Side Offers */}
        <div className="space-y-5">
          {/* Offer 1 */}
          <div className="group relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#FF6B4A] to-[#FF8A65] p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-sm" />

            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/80">
                Code • BITE50
              </p>

              <h4 className="mt-2 text-3xl font-black">
                ₹50 OFF
              </h4>

              <p className="mt-2 text-sm text-white/90">
                On orders above ₹199
              </p>

              <div className="mt-4 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                Limited Time
              </div>
            </div>
          </div>

          {/* Offer 2 */}
          <div className="group relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-sm" />

            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/80">
                Code • CHAI10
              </p>

              <h4 className="mt-2 text-3xl font-black">
                ₹10 Chai
              </h4>

              <p className="mt-2 text-sm text-white/90">
                Every evening 4 PM – 6 PM
              </p>

              <div className="mt-4 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                Evening Special ☕
              </div>
            </div>
          </div>

          {/* Offer 3 */}
          <div className="group relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0EA5E9] to-[#14B8A6] p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-sm" />

            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/80">
                Code • WRAP40
              </p>

              <h4 className="mt-2 text-3xl font-black">
                40% OFF
              </h4>

              <p className="mt-2 text-sm text-white/90">
                Every Wednesday & Friday
              </p>

              <div className="mt-4 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                Healthy Choice 🌯
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}