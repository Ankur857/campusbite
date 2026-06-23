import Navbar from "@/components/landingpage/Navbar";
import HeroSection from "@/components/landingpage/HeroSection";
import FeaturesSection from "@/components/landingpage/FeaturesSection";
import HowItWorksSection from "@/components/landingpage/HowItWorksSection";
import TestimonialsSection from "@/components/landingpage/TestimonialsSection";
import Footer from "@/components/landingpage/Footer";

export default function HomePage() {
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