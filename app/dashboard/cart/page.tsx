"use client";

import { useRouter } from "next/navigation";
import SuggestCard from "@/components/cart/SuggestCard";
import CartItem from "@/components/cart/CartItem";
import { useCart } from "@/contexts/CartContext";

export default function CartPage() {
  const { cart, getCartTotal, addToCart, updateQuantity, removeFromCart, loading } = useCart();
  const router = useRouter();

  const subtotal = getCartTotal();
  const packing = 10;
  const gst = Math.round(subtotal * 0.05);
  const discount = 0;
  const total = subtotal + packing + gst - discount;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfaf5] flex items-center justify-center">
        <p className="text-lg text-gray-500">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfaf5]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b bg-[#fcfaf5]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg">
              🍔
            </div>
            <div className="text-xl font-extrabold">
              campus<span className="text-orange-600">BITE</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative grid h-10 w-10 place-items-center rounded-full border bg-white">
              🔔
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500" />
            </button>
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-white font-bold">
              A
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* TITLE */}
        <div className="mb-6">
          <p className="text-sm text-gray-500">Dashboard / Your cart</p>

          <div className="mt-2 inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-semibold text-orange-600">
            ⏱ Ready in ~12 minutes
          </div>

          <h1 className="mt-4 text-4xl font-extrabold">
            Your cart, <span className="text-orange-600">Shivangi!</span>
          </h1>

          <p className="text-gray-500">{cart.length} bites · Pickup at Main Block Canteen</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* LEFT */}
          <div>
            <div className="rounded-3xl border bg-white shadow-md">
              <div className="flex items-center justify-between border-b px-6 py-4">
                <h2 className="text-lg font-bold">Items</h2>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
                  {cart.length} items
                </span>
              </div>

              {cart.map((item) => (
                <CartItem
                  key={item.cartItemId || item.id}
                  title={item.name}
                  tag={`${item.category} · ${item.veg ? "Veg" : "Non-Veg"}`}
                  price={`₹${item.price}`}
                  qty={item.quantity}
                  image={item.image}
                  onUpdateQty={(newQty: number) => {
                    if (newQty <= 0 && item.cartItemId) {
                      removeFromCart(item.cartItemId);
                    } else if (item.cartItemId) {
                      updateQuantity(item.cartItemId, newQty);
                    }
                  }}
                />
              ))}
            </div>

            {/* COUPON */}
            <div className="mt-5 flex items-center gap-3 rounded-2xl border bg-gradient-to-br from-orange-50 to-orange-100 p-4">
              <input
                className="flex-1 rounded-full bg-white px-4 py-2 text-sm outline-none"
                placeholder="Got a code? Try BITE50"
              />
              <button className="rounded-full border bg-white px-4 py-2 text-sm font-semibold">
                Apply
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <aside className="h-fit rounded-3xl border bg-white shadow-md">
            <div className="border-b px-6 py-4">
              <h2 className="text-lg font-bold">Order summary</h2>
            </div>

            <div className="p-6">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span className="font-semibold text-black">₹{subtotal}</span>
              </div>


              <div className="mt-2 flex justify-between text-sm text-gray-500">
                <span>Packing</span>
                <span className="font-semibold text-black">₹{packing}</span>
              </div>

              <div className="mt-2 flex justify-between text-sm text-gray-500">
                <span>GST</span>
                <span className="font-semibold text-black">₹{gst}</span>
              </div>

              <div className="my-4 h-px bg-gray-200" />

              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="text-3xl font-extrabold text-orange-600">
                  ₹{total}
                </span>
              </div>

              <button 
                onClick={() => router.push('/dashboard/payment')}
                className="mt-4 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 py-4 font-bold text-white shadow-lg"
              >
                Proceed To Pay →
              </button>

              <div className="mt-4 rounded-2xl bg-gray-100 p-4">
                <p className="font-semibold">Main Block Canteen</p>
                <p className="text-xs text-gray-500">
                  Pickup ready by 12:45 PM · 2 min walk
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* SUGGESTIONS */}
        <div className="mt-10">
          <h2 className="text-2xl font-extrabold">Pair it with</h2>
          <p className="mb-4 text-gray-500">
            Hand-picked add-ons students grab with this order.
          </p>

        </div>
      </main>

      <footer className="border-t py-6 text-center text-xs text-gray-500">
        campusBITE · Built for hungry students, by hungry students.
      </footer>
    </div>
  );
}