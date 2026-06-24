import { Button } from "../ui/button";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-white border-t shadow-md flex justify-around items-center ">
      
      <Button variant="ghost">Home</Button>
      <Button variant="ghost">Menu</Button>

      <Button className="bg-primary text-white w-12 h-12 rounded-full">
        🛒
      </Button>

      <Button variant="ghost">Orders</Button>
      <Button variant="ghost">Profile</Button>

    </nav>
  );
}