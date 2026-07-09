import { features } from "@/data/landingData";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-slate-50/30 dark:bg-zinc-950/10 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-black text-center text-gray-950 dark:text-white tracking-tight mb-12">
          Smart Dining Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  group
                  p-6
                  rounded-2xl
                  border
                  border-gray-150/40
                  dark:border-zinc-800/85
                  bg-white
                  dark:bg-zinc-900
                  shadow-sm
                  hover:shadow-xl
                  hover:-translate-y-2
                  transition-all
                  duration-300
                "
              >
                <div
                  className="
                    w-14 h-14
                    rounded-xl
                    bg-orange-100
                    dark:bg-orange-950/20
                    flex items-center justify-center
                    mb-4
                  "
                >
                  <Icon className="h-7 w-7 text-orange-800 dark:text-orange-400" />
                </div>

                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-650 dark:text-zinc-400 font-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}