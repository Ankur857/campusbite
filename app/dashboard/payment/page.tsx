"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@clerk/nextjs";

export default function UserPaymentPage() {
  const { cart, getCartTotal, clearCart } = useCart();
  const { userId } = useAuth();
  const router = useRouter();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const totalAmount = getCartTotal();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          setUserProfile(data);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const createOrder = async () => {
    if (!scriptLoaded) {
      alert('Payment script loading, please wait');
      return;
    }

    if (totalAmount <= 0) {
      alert('Cart is empty!');
      return;
    }

    if (!userId) {
      alert('Please login to place an order');
      return;
    }

    // Check if profile is completed
    if (!userProfile || !userProfile.name || !userProfile.phone) {
      alert('Please complete your profile (name and phone) before placing an order');
      router.push('/dashboard/profile');
      return;
    }

    try {
      console.log("Creating order for amount:", totalAmount, "INR (", totalAmount * 100, "paise)");
      
      // Create Razorpay order first
      const razorpayRes = await fetch("/dashboard/api/payment", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: totalAmount * 100, // Convert to paise
        }),
      });
      
      const razorpayData = await razorpayRes.json();
      
      if (!razorpayRes.ok) {
        console.error("Razorpay API Error:", razorpayData);
        const errorMessage = razorpayData.details ? `${razorpayData.error}: ${razorpayData.details}` : (razorpayData.error || "Unknown error");
        alert(`Failed to create payment order: ${errorMessage}`);
        return;
      }
      
      console.log("Razorpay order created:", razorpayData);
      
      const foodNames = cart.map(item => item.name).join(', ');
      const paymentData = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_1234567890",
        order_id: razorpayData.id,
        handler: async function (response: any) {
          console.log("Payment Success:", response);
          
          // Create order in database
          const orderRes = await fetch("/api/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId,
              totalAmount: totalAmount.toString(),
              items: cart.map(item => ({
                foodId: item.id,
                quantity: item.quantity,
                price: item.price.toString(),
              })),
            }),
          });

          const orderData = await orderRes.json();
          console.log("Order response:", orderData);

          if (orderRes.ok && orderData.success) {
            clearCart();
            alert("Payment Successful! Order Placed!");
            router.push("/dashboard/orders");
          } else {
            console.error("Order creation failed:", orderData);
            alert(`Order creation failed: ${orderData.error || "Unknown error"}. Please contact support.`);
          }
        },
        theme: {
          color: "#C2410C"
        },
        notes: {
          order_description: foodNames,
          items: JSON.stringify(cart)
        },
        prefill: {
          upi_vpa: "success@razorpay"
        }
      };

      console.log("Opening Razorpay with:", paymentData);
      const payment = new (window as any).Razorpay(paymentData);
      payment.on('payment.failed', function (response: any) {
        console.error("Payment Failed:", response);
        alert(`Payment Failed: ${response.error?.description || "Unknown error"}`);
      });
      payment.open();
    } catch (error: any) {
      console.error("Error in createOrder:", error);
      alert(`Error: ${error.message || "Something went wrong"}`);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#fcfaf5] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty!</h1>
          <button 
            onClick={() => router.push('/dashboard/menu')}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfaf5]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b bg-[#fcfaf5]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            ← Back to Cart
          </button>
          <div className="text-xl font-extrabold">
            campus<span className="text-orange-600">BITE</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        <h1 className="text-3xl font-extrabold mb-6">Confirm Payment</h1>
        
        {/* Order Summary */}
        <div className="bg-white rounded-3xl border p-6 shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">x{item.quantity}</p>
                </div>
                <p className="font-bold text-orange-700">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center py-4 border-t border-gray-200">
            <span className="text-xl font-bold">Total</span>
            <span className="text-3xl font-extrabold text-orange-700">₹{totalAmount}</span>
          </div>
        </div>

        <button
          disabled={cart.length === 0}
          className={`w-full py-4 rounded-2xl font-extrabold text-lg shadow-lg ${
            cart.length > 0
              ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={createOrder}
        >
          Pay Now - ₹{totalAmount}
        </button>
      </main>
    </div>
  );
}
