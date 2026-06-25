import Image from "next/image";
import StatsCard from "../common/stats-card";
import { CheckCircleIcon } from "lucide-react";


const stats = [
    { title: "12K+", description: "Daily Meals" },
    { title: "5min", description: "Avg. Pickup" },
    { title: "4.9/5", description: "Student Rating" },
];

export default function HeroSection() {
    return (
        <section className="min-h-screen flex items-center pt-16 bg-gradient-to-l from-orange-100 to-orange-50">
            <div className="container mx-auto grid lg:grid-cols-2 gap-10">
                <div className="flex flex-col justify-center">
                    <span className="text-orange-800 font-semibold bg-orange-200 rounded-2xl w-fit py-1 px-2">
                        Solving Campus Hunger
                    </span>

                    <h1 className="text-5xl lg:text-6xl font-bold mt-4">
                        Skip The Queue.
                        <br />
                        <span className="text-orange-800">Grab Your Food</span>
                        <br />
                        <span className="whitespace-nowrap">
                            Before Break Starts.
                        </span>
                    </h1>

                    <p className="mt-6 text-lg text-gray-600">
                        Order food directly from your classroom and pick it up instantly
                        when ready. No more waiting, just eating.
                    </p>

                    <div className="flex gap-4 mt-8">
                        <button className="bg-orange-800 text-white px-6 py-3 rounded-xl transition-transform duration-300 hover:scale-105">
                            Order Now
                        </button>

                        <button className="border px-6 py-3 rounded-xl transition-transform duration-300 hover:scale-105 hover:border-orange-800 hover:text-orange-800">
                            Watch Demo
                        </button>
                    </div>

                    {/* Line after buttons */}
                    <div className="w-full max-w-md h-px bg-orange-800 my-8" />

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-2xl w-full">
                        {stats.map((stat) => (
                            <StatsCard key={stat.title} {...stat} />
                        ))}
                    </div>
                </div>

                <div className="relative mt-16 flex justify-center">
                    {/* Main Image */}
                    <div className="rounded-3xl overflow-hidden shadow-2xl rotate-3 scale-110 border-4 border-white">
                        <Image
                            src="/hero-food.jpg"
                            alt="Campus Food"
                            width={1000}
                            height={700}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Floating Glass Card */}
                    <div
                        className="absolute -top-4 -right-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce"
                        style={{ animationDuration: "3s" }}
                    >
                        <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center">
                            <CheckCircleIcon className="w-5 h-5 text-green-600" />
                        </div>

                        <div>
                            <p className="text-xs text-gray-500">Your order is</p>
                            <p className="font-bold text-sm">Ready for Pickup!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}