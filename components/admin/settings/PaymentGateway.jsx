import { Wallet } from "lucide-react";

export default function PaymentGateway() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="font-semibold text-lg mb-5">
        Payment & Gateway
      </h2>

      <div className="border rounded-xl p-4 flex justify-between">
        <div className="flex gap-3">
          <Wallet />

          <div>
            <h3 className="font-medium">
              Razorpay Gateway
            </h3>

            <p className="text-green-600 text-sm">
              Connected
            </p>
          </div>
        </div>

        <button className="border px-4 py-2 rounded-lg">
          Configure
        </button>
      </div>
    </div>
  );
}