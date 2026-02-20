"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "../api/context/AppContext";

export default function HomeLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { searchTerm, setSearchTerm } = useAppContext();

  const handleLogout = async () => {
    await fetch("http://localhost:3000/api/user/logout", {
      method: "POST",
      credentials: "include",
    });

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
            <Link href="/tv-show" className="text-white hover:underline">
              TV Shows
            </Link>
            <Link href="/movies" className="text-white hover:underline">
              Movies
            </Link>
            <Link href={"/new-movies"} className="text-white hover:underline">
              Recently Added
            </Link>
            <Link href={"/my-list"} className="text-white hover:underline">
              My List
            </Link>
          </div>
        </div>

        {/* ✅ Search bar + Logout */}
        <div className="flex items-center gap-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-xl bg-gray-800 text-white 
                   placeholder-gray-400 focus:outline-none focus:ring-2 
                   focus:ring-red-500 w-64"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 absolute right-3 top-2.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
              />
            </svg>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 text-white"
          >
            Logout
          </button>
        </div>
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
