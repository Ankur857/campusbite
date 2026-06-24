import Navbar from "@/components/landingpage/Navbar";
import HeroSection from "@/components/landingpage/HeroSection";
import FeaturesSection from "@/components/landingpage/FeaturesSection";
import HowItWorksSection from "@/components/landingpage/HowItWorksSection";
import TestimonialsSection from "@/components/landingpage/TestimonialsSection";
import Footer from "@/components/landingpage/Footer";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { syncUser } from "@/lib/sync-user";

export default async function HomePage() {
  const { userId } = await auth();

  if (userId) {
    const user = await syncUser();

    if (user?.role === "admin") {
      redirect("/admin");
    }

    redirect("/dashboard");
  }

  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
      </main>

      <Footer />
    </>
  );
}