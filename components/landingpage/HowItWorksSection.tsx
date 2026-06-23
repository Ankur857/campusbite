import {
  MenuSquare,
  CreditCard,
  MapPinned,
  ShoppingBag,
  CheckCircle,
} from "lucide-react";

const steps = [
  {
    title: "Browse Menu",
    icon: MenuSquare,
  },
  {
    title: "Order & Pay",
    icon: CreditCard,
  },
  {
    title: "Track Live",
    icon: MapPinned,
  },
  {
    title: "Grab & Go",
    icon: ShoppingBag,
  },
];

export default function HowItWorksSection() {
  return (
    <section id="tracking" className="py-24 bg-orange-50">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="text-orange-800 font-semibold">
            SIMPLE PROCESS
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-2">
            Order In Seconds,
            <span className="text-orange-800"> Pick Up In Minutes</span>
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Skip long cafeteria queues and track your food from preparation
            to pickup in real time.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="
                  relative
                  p-6
                  rounded-2xl
                  border
                  bg-white
                  shadow-sm
                  hover:shadow-xl
                  hover:-translate-y-2
                  transition-all
                  duration-300
                  text-center
                "
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-orange-800" />
                </div>

                <h3 className="font-semibold text-lg">
                  {step.title}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Tracking Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 shadow-xl border">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h3 className="font-bold text-xl">
                Order #CB1024
              </h3>

              <p className="text-gray-500">
                Estimated pickup: 5 min
              </p>
            </div>

            <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-800 text-sm font-medium">
              Preparing
            </span>
          </div>

          <div className="flex justify-between text-sm text-gray-600 mb-3">
            <span>Preparing</span>
            <span>Cooking</span>
            <span>Ready</span>
          </div>

          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="w-2/3 h-full bg-orange-800 rounded-full transition-all duration-500" />
          </div>

          <div className="mt-8 flex items-center gap-3">
            <CheckCircle className="text-green-500 w-5 h-5" />

            <p className="text-gray-700">
              Chef has started preparing your meal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}