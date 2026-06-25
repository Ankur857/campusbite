"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLeftPanel from '../../../components/admin/AdminLeftPanel'
import { useCart } from '../../../contexts/CartContext'
import { useOrders } from '../../../contexts/OrdersContext'

export default function Payment(){
    const { cart, getCartTotal, clearCart } = useCart();
    const { addOrder } = useOrders();
    const router = useRouter();
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const totalAmount = getCartTotal();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => setScriptLoaded(true);
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const createOrder=async()=>{
        if (!scriptLoaded) {
            alert('Payment script loading, please wait');
            return;
        }

        if (totalAmount <= 0) {
            alert('Cart is empty!');
            return;
        }

        try {
            console.log("Creating order for amount:", totalAmount, "INR (", totalAmount * 100, "paise)");
            
            const res=await fetch("/admin/api/payment",{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    amount: totalAmount * 100, // Convert to paise
                    cartItems: cart
                }),
            });
            
            const data=await res.json();
            
            if (!res.ok) {
                console.error("API Error:", data);
                const errorMessage = data.details ? `${data.error}: ${data.details}` : (data.error || "Unknown error");
                alert(`Failed to create order: ${errorMessage}`);
                return;
            }
            
            console.log("Order created:", data);
            
            const foodNames = cart.map(item => item.name).join(', ');
            const paymentData={
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_1234567890",
                order_id: data.id,
                handler:async function (response:any){
                    console.log("Payment Success:", response);
                    
                    // Create order in OrdersContext
                    addOrder({
                        id: Date.now().toString(),
                        orderId: data.id,
                        customerName: "Student " + Math.floor(Math.random() * 100),
                        foodItem: foodNames,
                        amount: totalAmount,
                        status: "new",
                        time: new Date().toLocaleTimeString()
                    });

                    clearCart();
                    alert("Payment Successful! Order Placed!");
                    router.push("/admin/live-order");
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
            }

            console.log("Opening Razorpay with:", paymentData);
            const payment=new (window as any).Razorpay(paymentData);
            payment.on('payment.failed', function (response:any){
                console.error("Payment Failed:", response);
                alert(`Payment Failed: ${response.error?.description || "Unknown error"}`);
            });
            payment.open();
        } catch (error: any) {
            console.error("Error in createOrder:", error);
            alert(`Error: ${error.message || "Something went wrong"}`);
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-gray-50">
            <AdminLeftPanel />
            <div className="flex-1 p-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Confirm Payment</h1>
                    
                    {/* Order Summary */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        {cart.length === 0 ? (
                            <p className="text-gray-500">Your cart is empty!</p>
                        ) : (
                            <>
                                {cart.map(item => (
                                    <div key={item.id} className="flex justify-between py-2 border-b border-gray-100">
                                        <div>
                                            <p className="font-semibold">{item.name}</p>
                                            <p className="text-sm text-gray-500">x{item.quantity}</p>
                                        </div>
                                        <p className="font-semibold">₹{item.price * item.quantity}</p>
                                    </div>
                                ))}
                                <div className="flex justify-between py-4 font-bold text-lg">
                                    <span>Total</span>
                                    <span className="text-orange-700">₹{totalAmount}</span>
                                </div>
                            </>
                        )}
                    </div>

                    <button 
                        disabled={cart.length === 0}
                        className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                            cart.length > 0 
                                ? "bg-orange-700 hover:bg-orange-800 text-white" 
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                        onClick={createOrder}
                    >
                        Pay Now - ₹{totalAmount}
                    </button>
                </div>
            </div>
        </div>
    );
}