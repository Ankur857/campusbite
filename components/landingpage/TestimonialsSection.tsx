import { testimonials } from "@/data/landingData";

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-24"
    >
      <div className="container mx-auto">

        <div className="flex flex-col items-center justify-center gap-1 mb-7">
          <h2 className="text-4xl font-bold text-center">
            Loved By Students
          </h2>

          <div className="text-gray-600">
            Real feedback from the campus community
          </div>
        </div>


        <div className="grid md:grid-cols-3 gap-6">

          {testimonials.map((item) => (
            <div
              key={item.name}
              className="border rounded-3xl p-6"
            >
              <p className="italic mb-4">
                "{item.review}"
              </p>

              <h4 className="font-semibold">
                {item.name}
              </h4>

              <p className="text-gray-500">
                {item.role}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}