"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import SuggestCard from "@/components/cart/SuggestCard";
import CartItem from "@/components/cart/CartItem";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

// Helper to dynamically load the Razorpay checkout script
const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && (window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CartPage() {
  const { cart, getCartTotal, updateQuantity, removeFromCart, clearCart, loading } = useCart();
  const router = useRouter();
  const { userId } = useAuth();
  const { user } = useUser();
  
  const [profileName, setProfileName] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.name) {
          setProfileName(data.name.split(" ")[0]);
        }
      })
      .catch(err => console.error("Error fetching profile:", err));
  }, []);

  const displayName = profileName || user?.firstName || "Student";

  const subtotal = getCartTotal();
  const total = subtotal;

  const handlePlaceOrder = async () => {
    if (!userId) {
      toast.error("Please login to place an order");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setPlacingOrder(true);
    try {
      // 1. Fetch user profile to verify name and phone number
      const profileRes = await fetch("/api/profile");
      if (!profileRes.ok) {
        toast.error("Failed to verify profile. Please try again.");
        setPlacingOrder(false);
        return;
      }
      
      const profileData = await profileRes.json();
      if (!profileData || !profileData.name || !profileData.phone) {
        toast.error("Please complete your profile (name and phone number) before placing an order.");
        router.push("/dashboard/profile");
        setPlacingOrder(false);
        return;
      }

      // 2. Load Razorpay SDK
      const rzpLoaded = await loadRazorpay();
      if (!rzpLoaded) {
        toast.error("Failed to load payment gateway. Please check your internet connection.");
        setPlacingOrder(false);
        return;
      }

      // 3. Create Razorpay order on backend
      const amountPaise = Math.round(total * 100);
      const paymentRes = await fetch("/dashboard/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amountPaise }),
      });

      if (!paymentRes.ok) {
        const errData = await paymentRes.json();
        throw new Error(errData.error || "Failed to initialize payment");
      }

      const rzpOrder = await paymentRes.json();

      // 4. Open Razorpay Checkout modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_T5knzRZC3XzmIg",
        amount: rzpOrder.amount,
        currency: rzpOrder.currency || "INR",
        name: "Green Chilli Cafe",
        description: "Delicious Green Chilli Bites",
        order_id: rzpOrder.id,
        handler: async function (response: any) {
          try {
            setPlacingOrder(true);
            
            // 5. Place order directly in DB upon successful payment
            const orderRes = await fetch("/api/orders", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId,
                totalAmount: total.toString(),
                items: cart.map(item => ({
                  foodId: item.id,
                  quantity: item.quantity,
                  price: item.price.toString(),
                })),
              }),
            });

            const orderData = await orderRes.json();
            if (orderRes.ok) {
              await clearCart();
              toast.success("Order Placed Successfully!");
              router.push("/dashboard/orders");
            } else {
              toast.error(orderData.error || "Failed to place order");
            }
          } catch (err: any) {
            console.error("Error creating order after payment:", err);
            toast.error("Payment successful, but failed to save order to database.");
          } finally {
            setPlacingOrder(false);
          }
        },
        prefill: {
          name: profileData.name,
          contact: profileData.phone,
          email: user?.emailAddresses?.[0]?.emailAddress || "",
        },
        theme: {
          color: "#EA580C",
        },
        modal: {
          ondismiss: function () {
            setPlacingOrder(false);
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (error: any) {
      console.error("Error placing order:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center transition-colors duration-300">
        <p className="text-lg text-gray-500 dark:text-zinc-400 font-semibold animate-pulse">Loading cart...</p>
      </div>
    );
  }

  const initial = user?.firstName?.[0]?.toUpperCase() || user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() || "S";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-foreground transition-colors duration-300">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-orange-100 dark:border-zinc-800 bg-[#FFF8F3]/80 dark:bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <img
              src="/green-chilli-logo.png"
              alt="Green Chilli Cafe Logo"
              className="h-10 object-contain dark:brightness-110 dark:contrast-110"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="relative grid h-10 w-10 place-items-center rounded-full border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-850 cursor-pointer">
              🔔
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500" />
            </button>
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-white font-extrabold shadow-sm">
              {initial}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* TITLE */}
        <div className="mb-6">
          <p className="text-xs text-gray-450 dark:text-zinc-500 font-bold uppercase tracking-wider">Dashboard / Your cart</p>

          <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-orange-100 dark:border-orange-900/30 bg-white dark:bg-zinc-900 px-4 py-1.5 text-xs font-bold text-orange-600 dark:text-orange-400 shadow-sm">
            ⏱ Ready in ~12 minutes
          </div>

          <h1 className="mt-4 text-4xl font-black text-gray-950 dark:text-white tracking-tight">
            Your cart, <span className="text-orange-655 dark:text-orange-500">{displayName}!</span>
          </h1>

          <p className="text-gray-500 dark:text-zinc-450 text-sm font-semibold mt-1">{cart.length} bites</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* LEFT */}
          <div>
            <div className="rounded-3xl border border-gray-150/40 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 px-6 py-4">
                <h2 className="text-lg font-bold text-gray-950 dark:text-white">Items</h2>
                <span className="rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 px-3 py-1 text-xs font-bold">
                  {cart.length} items
                </span>
              </div>

              {cart.length === 0 ? (
                <div className="p-10 text-center text-gray-500 dark:text-zinc-450 font-medium">
                  Your cart is empty. Start adding delicious bites!
                </div>
              ) : (
                cart.map((item) => (
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
                ))
              )}
            </div>

          </div>

          {/* RIGHT */}
          <aside className="h-fit rounded-3xl border border-gray-150/40 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md">
            <div className="border-b border-gray-100 dark:border-zinc-800 px-6 py-4">
              <h2 className="text-lg font-bold text-gray-950 dark:text-white">Order summary</h2>
            </div>

            <div className="p-6">
              <div className="flex justify-between text-sm text-gray-500 dark:text-zinc-400 font-medium">
                <span>Subtotal</span>
                <span className="font-bold text-black dark:text-white">₹{subtotal}</span>
              </div>

              <div className="my-4 h-px bg-gray-200 dark:bg-zinc-800" />

              <div className="flex justify-between">
                <span className="font-bold text-gray-950 dark:text-white">Total</span>
                <span className="text-3xl font-black text-orange-600 dark:text-orange-400">
                  ₹{cart.length > 0 ? total : 0}
                </span>
              </div>

              <button 
                onClick={handlePlaceOrder}
                disabled={cart.length === 0 || placingOrder}
                className="mt-4 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 py-4 font-bold text-white shadow-lg disabled:from-gray-300 disabled:to-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
              >
                {placingOrder ? "Placing Order..." : `Place Order (₹${cart.length > 0 ? total : 0})`}
              </button>

            </div>
          </aside>
        </div>
      </main>

      <footer className="border-t border-gray-100 dark:border-zinc-800 py-6 text-center text-xs text-gray-500 dark:text-zinc-450">
        Green Chilli Cafe · Built for hungry students, by hungry students.
      </footer>
    </div>
  );
}