"use client"
import Link from "next/link";
import { Button } from "../ui/button";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs"
import { Suspense } from "react"
import { LoaderIcon, SparklesIcon, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function Navbar() {
  const { isSignedIn } = useUser()
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-orange-50 dark:border-zinc-800/80 z-50 text-foreground transition-all duration-300">
      <div className="container mx-auto h-16 flex items-center justify-between px-4">

        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <img
            src="/green-chilli-logo.png"
            alt="Green Chilli Cafe Logo"
            className="h-10 object-contain dark:brightness-110 dark:contrast-110"
          />
        </Link>

        <div className="hidden md:flex gap-8 text-sm font-semibold text-gray-600 dark:text-zinc-350">
          <Link href="#features" className="hover:text-orange-800 dark:hover:text-orange-400 transition-colors">Features</Link>
          <Link href="#tracking" className="hover:text-orange-800 dark:hover:text-orange-400 transition-colors">Tracking</Link>
          <Link href="#testimonials" className="hover:text-orange-800 dark:hover:text-orange-400 transition-colors">Reviews</Link>
          <Link href="#partners" className="hover:text-orange-800 dark:hover:text-orange-400 transition-colors">Contact Us</Link>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center rounded-full border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <Suspense fallback={<div><LoaderIcon className="size-4 animate-spin" /></div>}>
            {!isSignedIn ? (
              <>
                <SignInButton forceRedirectUrl="/after-login">
                  <Button
                    variant="outline"
                    className="rounded-xl px-5 border border-gray-200 dark:border-zinc-800 hover:bg-orange-50 dark:hover:bg-zinc-800 hover:border-orange-800 dark:hover:border-orange-500 text-gray-700 dark:text-zinc-300 hover:text-orange-800 dark:hover:text-orange-400 font-semibold cursor-pointer"
                  >
                    Sign In
                  </Button>
                </SignInButton>

                <SignUpButton forceRedirectUrl="/after-login">
                  <Button
                    className="rounded-xl px-5 bg-orange-800 dark:bg-orange-700 hover:bg-orange-700 dark:hover:bg-orange-600 text-white font-semibold cursor-pointer"
                  >
                    Sign Up
                  </Button>
                </SignUpButton>
              </>
            ) : (
              <Link href="/dashboard">
                <Button
                  className="rounded-xl px-5 bg-orange-800 dark:bg-orange-700 hover:bg-orange-700 dark:hover:bg-orange-600 text-white font-semibold cursor-pointer"
                >
                  Dashboard
                </Button>
              </Link>
            )}
          </Suspense>
        </div>

      </div>
    </nav>
  );
}