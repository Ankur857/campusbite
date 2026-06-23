import Link from "next/link";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b z-50">
      <div className="container mx-auto h-16 flex items-center justify-between">

        <Link
          href="/"
          className="font-bold text-2xl text-orange-800"
        >
          CampusBite
        </Link>

        <div className="hidden md:flex gap-8">
          <Link href="#features" className="hover:text-orange-800">Features</Link>
          <Link href="#tracking" className="hover:text-orange-800">Tracking</Link>
          <Link href="#testimonials" className="hover:text-orange-800">Reviews</Link>
          <Link href="#partners" className="hover:text-orange-800">Contact Us</Link>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="rounded-xl px-5 hover:bg-orange-50 hover:border-orange-800 hover:text-orange-800"
          >
            Sign In
          </Button>

          <Button
            className="rounded-xl px-5 bg-orange-800 hover:bg-orange-700 text-white"
          >
            Sign Up
          </Button>
        </div>

      </div>
    </nav>
  );
}