import { testimonials } from "@/data/landingData";

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-24 bg-slate-50/30 dark:bg-zinc-950/10 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">

        <div className="flex flex-col items-center justify-center gap-1 mb-10">
          <h2 className="text-4xl font-black text-center text-gray-950 dark:text-white tracking-tight">
            Loved By Students
          </h2>

          <div className="text-gray-600 dark:text-zinc-400 font-medium mt-1">
            Real feedback from the campus community
          </div>
        </div>


        <div className="grid md:grid-cols-3 gap-6">

          {testimonials.map((item) => (
            <div
              key={item.name}
              className="border border-gray-150/40 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <p className="italic text-gray-700 dark:text-zinc-300 font-medium mb-4">
                "{item.review}"
              </p>

              <h4 className="font-extrabold text-gray-900 dark:text-white text-base">
                {item.name}
              </h4>

              <p className="text-gray-500 dark:text-zinc-500 font-bold text-xs mt-0.5">
                {item.role}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}