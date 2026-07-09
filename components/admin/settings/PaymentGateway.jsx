import { Wallet } from "lucide-react";

export default function PaymentGateway() {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 rounded-xl p-6 shadow-sm transition-colors duration-300">
      <h2 className="font-bold text-lg mb-5 text-gray-900 dark:text-white">
        Payment & Gateway
      </h2>

      <div className="border border-gray-150/40 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 rounded-xl flex justify-between shadow-sm">
        <div className="flex gap-3">
          <Wallet className="text-orange-600 dark:text-orange-400" />

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Razorpay Gateway
            </h3>

            <p className="text-green-600 dark:text-green-400 text-sm font-bold mt-0.5">
              Connected
            </p>
          </div>
        </div>

        <button className="border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-gray-50 dark:hover:bg-zinc-850 text-gray-700 dark:text-zinc-300 font-bold px-4 py-2 rounded-lg transition-all cursor-pointer">
          Configure
        </button>
      </div>
    </div>
  );
}