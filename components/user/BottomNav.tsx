import { Button } from "../ui/button";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-white border-t shadow-md flex justify-around items-center ">
      
      <Button variant="ghost" className="hover:text-orange-600">Home</Button>
      <Button variant="ghost" className="hover:text-orange-600">Menu</Button>

      <Button className="bg-orange-500 text-white w-12 h-12 rounded-full">
        🛒
      </Button>

      <Button variant="ghost"  className="hover:text-orange-600">Orders</Button>
      <Button variant="ghost" className="hover:text-orange-600">Profile</Button>

    </nav>
  );
}