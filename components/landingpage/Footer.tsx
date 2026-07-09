import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-orange-100 dark:border-zinc-800 bg-orange-50/50 dark:bg-zinc-950 transition-colors duration-300 text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <img
              src="/green-chilli-logo.png"
              alt="Green Chilli Cafe Logo"
              className="h-10 object-contain dark:brightness-110 dark:contrast-110"
            />

            <p className="mt-4 text-gray-650 dark:text-zinc-400 text-sm font-semibold max-w-sm">
              Skip the queue, order ahead, and grab your food
              before the break starts.
            </p>

            <p className="mt-2 text-gray-650 dark:text-zinc-400 text-sm font-semibold max-w-sm">Built with ❤️ for Students</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
              Quick Links
            </h4>

            <div className="flex flex-col gap-3 text-gray-655 dark:text-zinc-400 text-sm font-semibold">
              <Link href="#features" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                Features
              </Link>

              <Link href="#tracking" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                How It Works
              </Link>

              <Link href="#testimonials" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                Reviews
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
              Contact
            </h4>

            <div className="space-y-3 text-gray-655 dark:text-zinc-400 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-orange-600 dark:text-orange-400" />
                <span>support@greenchillicafe.com</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={18} className="text-orange-600 dark:text-orange-400" />
                <span>+91 XXXXX XXXXX</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-orange-600 dark:text-orange-400" />
                <span>Your College Campus</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-orange-100/50 dark:border-zinc-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 dark:text-zinc-500 text-sm font-semibold">
            © 2026 Green Chilli Cafe. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-500 dark:text-zinc-500 font-semibold hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              Privacy Policy
            </a>

            <a href="#" className="text-gray-500 dark:text-zinc-500 font-semibold hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              Terms of Service
            </a>

            <a href="#" className="text-gray-500 dark:text-zinc-500 font-semibold hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}