// app/home/layout.tsx
"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomeLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/SignIn");
  };

  return (
    <div className="bg-[#141414] min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center w-full py-6 px-14">
        <div className="flex items-center gap-12">
          <img src="/img/logo-png.png" alt="" className="w-52" />
          <div className="flex gap-6">
            <Link href="/home" className="text-white hover:underline">
              Home
            </Link>
            <Link href="/home/tv-show" className="text-white hover:underline">
              TV Shows
            </Link>
            <Link href="/home/movies" className="text-white hover:underline">
              Movies
            </Link>
            <Link
              href={"/home/new-movies"}
              className="text-white hover:underline"
            >
              Recently Added
            </Link>
            <Link href={"/my-list"} className="text-white hover:underline">
              My List
            </Link>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </nav>

      {/* Page Content */}
      <main className="flex-1 p-6">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-4">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} My Next.js App
        </p>
      </footer>
    </div>
  );
}
