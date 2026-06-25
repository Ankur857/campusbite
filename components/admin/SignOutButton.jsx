"use client";

import { SignOutButton } from "@clerk/nextjs";

export default function LogoutButton() {
  return (
    <SignOutButton>
      <button className="px-4 py-2 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-lg">
        Logout
      </button>
    </SignOutButton>
  );
}