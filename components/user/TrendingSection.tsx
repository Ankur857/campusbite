import Image from "next/image";
import { Plus, Star, TrendingUp } from "lucide-react";
import { trendingItems } from "@/data/dashboardData";

export default function TrendingSection() {
  return (
    <section className="mt-14 mb-16">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-orange-600">
            <TrendingUp size={18} />

            <span className="text-xs font-bold uppercase tracking-[0.15em]">
              Trending
            </span>
          </div>

          <h3 className="text-3xl font-black">
            Trending in Main Block
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            What students are ordering today.
          </p>
        </div>

        <button className="hidden font-semibold text-orange-600 sm:block">
          See All →
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {trendingItems.map((item) => (
          <article
            key={item.id}
            className="group overflow-hidden rounded-[28px] border border-orange-100 bg-white transition-all hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
              />

              <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-orange-600 shadow">
                {item.badge}
              </span>

              <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/80 px-2 py-1 text-xs text-white">
                <Star
                  size={12}
                  fill="orange"
                />
                {item.rating}
              </div>
            </div>

            <div className="flex items-center justify-between p-4">
              <div>
                <h4 className="font-semibold">
                  {item.name}
                </h4>

                <p className="font-bold text-orange-600">
                  ₹{item.price}
                </p>
              </div>

              <button className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white transition hover:scale-110">
                <Plus size={18} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}