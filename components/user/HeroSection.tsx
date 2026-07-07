// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";
// import {
//     Clock3,
//     MapPin,
//     ArrowRight,
// } from "lucide-react";
// import useTimer from "@/hooks/useTimer";

// export default function HeroSection() {
//     const { formatted } = useTimer(42 * 60 + 15);

//     return (
//         <section className="relative overflow-hidden rounded-[32px] border border-orange-100 bg-gradient-to-br from-orange-50 via-orange-100 to-amber-100 shadow-xl ">

//             <div className="grid items-center gap-10 p-6 md:grid-cols-2 md:p-10">

//                 {/* Left */}
//                 <div className="space-y-6">

//                     <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-600">
//                         <Clock3 size={14} />
//                         Next Break • 12:30 PM
//                     </div>

//                     <h2 className="text-5xl font-black leading-tight lg:text-6xl">
//                         Hungry,
//                         <span className="text-orange-600">
//                             {" "}Aarav?
//                         </span>
//                         <br />
//                         Skip the Queue.
//                     </h2>

//                     <p className="max-w-md text-lg text-gray-600">
//                         Order now and pick up hot food the moment your break starts.
//                     </p>

//                     <div className="flex flex-wrap gap-3">

//                         <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105">
//                             Order For Break
//                             <ArrowRight size={18} />
//                         </button>

//                         <div className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-3 text-sm text-gray-600">
//                             <MapPin
//                                 size={16}
//                                 className="text-orange-600"
//                             />
//                             Main Block • 2 min walk
//                         </div>
//                     </div>
//                 </div>

//                 {/* Right */}
//                 <div className="relative flex justify-center">

//                     <div className="absolute h-72 w-72 rounded-full bg-orange-300/30 blur-3xl" />

//                     <motion.div
//                         initial={{
//                             opacity: 0,
//                             x: 60,
//                             scale: 0.8,
//                         }}
//                         animate={{
//                             opacity: 1,
//                             x: 0,
//                             scale: 1,
//                             y: [0, -10, 0],
//                         }}
//                         transition={{
//                             duration: 1,
//                             y: {
//                                 duration: 4,
//                                 repeat: Infinity,
//                                 ease: "easeInOut",
//                             },
//                         }}
//                         className="relative"
//                     >
//                         <Image
//                             src="/pizza-new.jpg"
//                             alt="Pizza"
//                             width={750}
//                             height={750}
//                             priority
//                             className="rounded-[40px]object-coverdrop-shadow-[0_35px_60px_rgba(0,0,0,0.4)]"
//                         />



//                         <motion.div
//                             animate={{
//                                 y: [0, -8, 0],
//                             }}
//                             transition={{
//                                 duration: 2,
//                                 repeat: Infinity,
//                             }}
//                             className="absolute left-0 top-10 rounded-full bg-white px-4 py-2 font-semibold text-orange-600 shadow-lg"
//                         >
//                             🔥 2.3k orders today
//                         </motion.div>
//                     </motion.div>
//                 </div>
//             </div>
//         </section>
//     );
// }

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock3, MapPin, ArrowRight, Flame } from "lucide-react";
import { useEffect, useState } from "react";
import useTimer from "@/hooks/useTimer";
import { useUser } from "@clerk/nextjs";

export default function HeroSection() {
  const { user: clerkUser } = useUser();
  const [profileName, setProfileName] = useState("");
  const [stats, setStats] = useState({ ordersToday: 0, avgPrepTime: 10, rating: "4.8" });
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);

  useEffect(() => {
    // Fetch profile to get user name
    fetch("/api/profile")
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.name) {
          setProfileName(data.name.split(" ")[0]); // Get first name
        }
      })
      .catch(err => console.error("Error fetching profile name:", err));

    // Fetch dashboard stats
    fetch("/api/dashboard-stats")
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          setStats(data);
        }
      })
      .catch(err => console.error("Error fetching stats:", err));

    const breakTime = new Date();
    breakTime.setHours(12);
    breakTime.setMinutes(30);
    breakTime.setSeconds(0);

    const now = new Date();
    if (now > breakTime) {
      breakTime.setDate(breakTime.getDate() + 1);
    }

    const diff = Math.floor(
      (breakTime.getTime() - now.getTime()) / 1000
    );
    setRemainingSeconds(diff);
  }, []);

  const { formatted } = useTimer(remainingSeconds ?? 0);
  const displayName = profileName || clerkUser?.firstName || "Student";
  
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-orange-100 bg-gradient-to-br from-orange-50 via-orange-100 to-amber-100 shadow-xl">
        {/* Background Glow */}
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-yellow-300/20 blur-3xl" />

        <div className="relative z-10 grid items-center gap-10 p-6 md:grid-cols-2 md:p-10">
            {/* LEFT CONTENT */}
            <div className="space-y-6">
                {/* Break Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-600 shadow-sm">
                    <Clock3 size={14} />
                    Next Break • 12:30 PM

                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />

                    {formatted} left
                </div>

                {/* Heading */}
                <div>
                    <h1 className="text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
                        Hungry,
                        <span className="text-orange-600">
                            {" "}{displayName}?
                        </span>
                        <br />
                        Skip the Queue.
                    </h1>

                    <p className="mt-4 max-w-md text-base text-gray-600 md:text-lg">
                        Order now and pick up your meal exactly when your
                        break starts. No waiting, no long queues.
                    </p>
                </div>

                {/* CTA */}
                <div className="flex flex-wrap gap-3">
                    <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                        Order For Break
                        <ArrowRight size={18} />
                    </button>

                    <div className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-3 text-sm text-gray-600 shadow-sm">
                        <MapPin
                            size={16}
                            className="text-orange-600"
                        />
                        Main Block • 2 min walk
                    </div>
                </div>

                {/* Small Stats */}
                <div className="flex flex-wrap gap-3">
                    <div className="rounded-2xl bg-white px-4 py-3 shadow-md">
                        <p className="text-xs text-gray-500">
                            Orders Today
                        </p>
                        <p className="font-bold text-orange-600">
                            {stats.ordersToday}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white px-4 py-3 shadow-md">
                        <p className="text-xs text-gray-500">
                            Avg Pickup
                        </p>
                        <p className="font-bold text-green-600">
                            {stats.avgPrepTime} min
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white px-4 py-3 shadow-md">
                        <p className="text-xs text-gray-500">
                            Rating
                        </p>
                        <p className="font-bold text-orange-600">
                            {stats.rating}/5
                        </p>
                    </div>
                </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative flex justify-center">
                {/* Glow */}
                <div className="absolute h-72 w-72 rounded-full bg-orange-300/30 blur-3xl" />

                <motion.div
                    initial={{
                        opacity: 0,
                        x: 50,
                        scale: 0.9,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        y: [0, -12, 0],
                    }}
                    transition={{
                        duration: 1,
                        y: {
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        },
                    }}
                    className="relative"
                >
                    <Image
                        src="/pizza-new.jpg"
                        alt="Pizza"
                        width={700}
                        height={700}
                        priority
                        className=" h-auto w-[320px] md:w-[450px] lg:w-[550px] xl:w-[620px] rounded-[32px] object-cover shadow-2xl"
                    />

                    {/* Floating Order Card */}
                    <motion.div
                        animate={{
                            y: [0, -8, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                        className="
            absolute
            left-0
            top-10
            rounded-full
            bg-white
            px-4
            py-2
            font-semibold
            text-orange-600
            shadow-lg
          "
                    >
                        🔥 {stats.ordersToday} orders today
                    </motion.div>

                    {/* Floating Pickup Card */}
                    <motion.div
                        animate={{
                            y: [0, 8, 0],
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                        }}
                        className="
            absolute
            -bottom-2
            right-0
            rounded-2xl
            bg-white
            px-4
            py-3
            shadow-xl
          "
                    >
                        <p className="text-xs text-gray-500">
                            Avg Pickup Time
                        </p>

                        <p className="flex items-center gap-1 text-lg font-bold text-orange-600">
                            <Flame size={16} />
                            {stats.avgPrepTime} min
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    </section>
  );
}