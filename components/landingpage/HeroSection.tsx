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
        <section className="min-h-screen flex items-center pt-16 bg-gradient-to-l from-orange-100/80 via-orange-50/50 to-orange-50/20 dark:from-zinc-950 dark:via-zinc-900/40 dark:to-zinc-950 transition-colors duration-300">
            <div className="container mx-auto grid lg:grid-cols-2 gap-10 px-4">
                <div className="flex flex-col justify-center">
                    <span className="text-orange-800 dark:text-orange-400 font-bold bg-orange-200/80 dark:bg-orange-950/20 border border-orange-300 dark:border-orange-900/30 rounded-2xl w-fit py-1 px-3 text-sm shadow-sm">
                        Solving Campus Hunger
                    </span>

                    <h1 className="text-5xl lg:text-6xl font-black mt-4 text-gray-950 dark:text-white tracking-tight leading-tight">
                        Skip The Queue.
                        <br />
                        <span className="text-orange-800 dark:text-orange-400">Grab Your Food</span>
                        <br />
                        <span className="whitespace-nowrap">
                            Before Break Starts.
                        </span>
                    </h1>

                    <p className="mt-6 text-lg text-gray-600 dark:text-zinc-400 font-medium">
                        Order food directly from your classroom and pick it up instantly
                        when ready. No more waiting, just eating.
                    </p>

                    <div className="flex gap-4 mt-8">
                        <button className="bg-orange-800 dark:bg-orange-700 hover:bg-orange-750 dark:hover:bg-orange-600 text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-300 hover:scale-105 shadow-md cursor-pointer">
                            Order Now
                        </button>

                        <button className="border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 hover:border-orange-800 dark:hover:border-orange-400 font-semibold px-6 py-3.5 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                            Watch Demo
                        </button>
                    </div>

                    {/* Line after buttons */}
                    <div className="w-full max-w-md h-px bg-orange-800/30 dark:bg-zinc-850 my-8" />

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-2xl w-full">
                        {stats.map((stat) => (
                            <StatsCard key={stat.title} {...stat} />
                        ))}
                    </div>
                </div>

                <div className="relative mt-16 lg:mt-0 flex justify-center items-center">
                    {/* Main Image */}
                    <div className="rounded-3xl overflow-hidden shadow-2xl rotate-3 scale-100 border-4 border-white dark:border-zinc-900">
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
                        className="absolute -top-4 -right-4 bg-white/90 dark:bg-zinc-900/90 border border-gray-150/40 dark:border-zinc-800 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce"
                        style={{ animationDuration: "3s" }}
                    >
                        <div className="bg-green-100 dark:bg-green-950/30 w-10 h-10 rounded-full flex items-center justify-center">
                            <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>

                        <div>
                            <p className="text-xs text-gray-500 dark:text-zinc-500 font-bold">Your order is</p>
                            <p className="font-bold text-sm text-gray-900 dark:text-white">Ready for Pickup!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}