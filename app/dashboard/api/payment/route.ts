import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

console.log("Razorpay Keys - Key ID:", process.env.RAZORPAY_KEY_ID ? "Loaded" : "NOT loaded");
console.log("Razorpay Keys - Key Secret:", process.env.RAZORPAY_KEY_SECRET ? "Loaded" : "NOT loaded");

let razorpayInstance: any = null;

try {
    razorpayInstance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_1234567890",
        key_secret: process.env.RAZORPAY_KEY_SECRET || "rzp_test_secret_1234567890",
    });
    console.log("Razorpay instance created successfully");
} catch (error: any) {
    console.error("Failed to create Razorpay instance:", error);
}

export async function GET() {
    return NextResponse.json({
        message: "Payment API is working",
        razorpayConnected: !!razorpayInstance,
        keyIdLoaded: !!process.env.RAZORPAY_KEY_ID,
        keySecretLoaded: !!process.env.RAZORPAY_KEY_SECRET,
    });
}

export async function POST(req:Request) {
    if (!razorpayInstance) {
        console.error("Razorpay instance not initialized");
        return NextResponse.json(
            { error: "Razorpay not configured properly" },
            { status: 500 }
        );
    }

    try {
        const body = await req.json();
        console.log("Request body received:", body);
        
        const {amount} = body;
        
        if (!amount || amount < 100) { // Minimum 1 INR (100 paise)
            return NextResponse.json(
                { error: "Invalid amount. Minimum amount is ₹1" },
                { status: 400 }
            );
        }
        
        console.log("Creating Razorpay order for amount (paise):", amount);
        
        const order= await razorpayInstance.orders.create({
            amount,
            currency:"INR",
            receipt: "receipt_" + Date.now(),
        });
        
        console.log("Razorpay order created successfully:", order.id);
        return NextResponse.json(order);
    } catch (error: any) {
        console.error("=== Full Error Details ===");
        console.error("Error creating Razorpay order:", error);
        if (error.error) {
            console.error("Razorpay Error Code:", error.error.code);
            console.error("Razorpay Error Description:", error.error.description);
            console.error("Razorpay Error Field:", error.error.field);
            console.error("Razorpay Error Source:", error.error.source);
        }
        console.error("========================");
        
        return NextResponse.json(
            { 
                error: "Failed to create order", 
                details: error.message,
                razorpayError: error.error || null
            },
            { status: 500 }
        );
    }
}
