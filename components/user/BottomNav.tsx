import Link from "next/link";
import { Button } from "../ui/button";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-white shadow-md">
      <Button variant="ghost" className="hover:text-orange-500" asChild>
        <Link href="/dashboard">Home</Link>
      </Button>

      <Button variant="ghost" className="hover:text-orange-500" asChild>
        <Link href="/dashboard/menu">Menu</Link>
      </Button>

      <Button
        asChild
        className="h-12 w-12 rounded-full bg-orange-500 text-black hover:text-white"
      >
        <Link href="/dashboard/cart">🛒</Link>
      </Button>

      <Button variant="ghost" className="hover:text-orange-500" asChild>
        <Link href="/dashboard/orders">Orders</Link>
      </Button>

      <Button variant="ghost" className="hover:text-orange-500" asChild>
        <Link href="/dashboard/profile">Profile</Link>
      </Button>
    </nav>
  );
}