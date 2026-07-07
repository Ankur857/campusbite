import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-orange-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <img
              src="/green-chilli-logo.png"
              alt="Green Chilli Cafe Logo"
              className="h-10 object-contain"
            />

            <p className="mt-4 text-gray-600 max-w-sm">
              Skip the queue, order ahead, and grab your food
              before the break starts.
            </p>

            <p className=" text-gray-600 max-w-sm ">Built with ❤️ for Students</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">
              Quick Links
            </h4>

            <div className="flex flex-col gap-3 text-gray-600">
              <Link href="#features" className="hover:text-orange-600">
                Features
              </Link>

              <Link href="#tracking" className="hover:text-orange-600">
                How It Works
              </Link>

              <Link href="#testimonials" className="hover:text-orange-600">
                Reviews
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">
              Contact
            </h4>

            <div className="space-y-3 text-gray-600">
              <div className="flex items-center gap-2">
                <Mail size={18} />
                <span>support@greenchillicafe.com</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={18} />
                <span>+91 XXXXX XXXXX</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>Your College Campus</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 Green Chilli Cafe. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-orange-600">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-orange-600">
              Terms of Service
            </a>

            <a href="#" className="hover:text-orange-600">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}