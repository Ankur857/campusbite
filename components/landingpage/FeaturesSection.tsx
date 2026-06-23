import { features } from "@/data/landingData";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24">

      <div className="container mx-auto">

        <h2 className="text-4xl font-bold text-center mb-12">
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
          bg-white
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
            flex items-center justify-center
            mb-4
          "
                >
                  <Icon className="h-7 w-7 text-orange-800" />
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
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