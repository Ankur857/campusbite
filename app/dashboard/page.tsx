import Header from "@/components/user/Header";
import HeroTimer from "@/components/user/HeroTimer";
import Offers from "@/components/user/Offers";
import QuickReorder from "@/components/user/QuickReorder";
import Trending from "@/components/user/Trending";

export default function DashboardPage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen font-body-md">
      <Header />

      <main className="pt-20 pb-32 px-container-margin space-y-10">
        <HeroTimer />
        <Offers />
        <QuickReorder />
        <Trending />
      </main>

    </div>
  );
}