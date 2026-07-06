import Image from "next/image";
import { Plus, Repeat } from "lucide-react";
import { quickReorders } from "@/data/dashboardData";

export default function QuickReorder() {
    return (
        <section className="mt-12">
            <div className="mb-5 flex items-end justify-between">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-orange-600">
                        <Repeat size={18} />
                        <span className="text-xs font-bold uppercase tracking-[0.15em]">
                            Quick
                        </span>
                    </div>

                    <h3 className="text-3xl font-black">
                        Quick Reorder
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        One tap. Same bite as last time.
                    </p>
                </div>

                <button className="hidden font-semibold text-orange-600 sm:block">
                    See All →
                </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {quickReorders.map((item) => (
                    <div
                        key={item.id}
                        className="
    group
    flex
    items-center
    gap-5
    rounded-3xl
    border
    border-orange-100
    bg-white
    p-5
    lg:p-6
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-2xl
  "
                    >
                        <div className="relative h-28 w-28 lg:h-32 lg:w-32 overflow-hidden rounded-3xl">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover
    transition-all
    duration-500
    group-hover:scale-110"
                            />
                        </div>

                        <div className="flex-1">
                            <p className="text-xs text-gray-500">
                                Last ordered • {item.lastOrdered}
                            </p>

                            <h4 className="text-lg font-bold">
                                {item.name}
                            </h4>

                            <p className="mt-1 text-lg font-extrabold text-orange-600">
                                ₹{item.price}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}