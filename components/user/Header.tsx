"use client";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-container-margin h-16 bg-surface/80 backdrop-blur-md shadow-sm">
      <div className="text-headline-md font-bold text-primary">
        CampusBite
      </div>

      <div className="flex items-center gap-xs">
        <div className="flex items-center bg-secondary-container px-3 py-1.5 rounded-full">
          ⭐ <span className="ml-1 font-label-md">850 pts</span>
        </div>

        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant/50">
          🔔
        </button>
      </div>
    </header>
  );
}