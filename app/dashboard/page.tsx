import Header from "@/components/user/Header";
import HeroSection from "@/components/user/HeroSection";
import QuickReorder from "@/components/user/QuickReorder";
import TrendingSection from "@/components/user/TrendingSection";

export default function DashboardPage() {
  return (
    <>
      <Header />

      <main className="mx-auto px-4 py-6 lg:px-8">
        <HeroSection />

        <QuickReorder />

        <TrendingSection />
      </main>

      <footer className="border-t border-orange-100 py-8">
        <div className="text-center text-sm text-gray-500">
          Green Chilli Cafe · Built for hungry students,
          by hungry students.
        </div>
      </footer>
    </>
  );
}