"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6">
      <div className="relative w-96 h-96 mb-8">
        <Image
          src="/img/404.png" // চাইলে একটা custom 404 image রাখো public/img এ
          alt="404 Not Found"
          fill
          className="object-contain"
          priority
        />
      </div>

      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-2xl text-gray-300 mb-8">
        Oops! The page you are looking for doesn’t exist.
      </p>

      <div className="flex gap-6">
        <button
          onClick={() => router.push("/")}
          className="bg-red-600 px-6 py-3 rounded-lg hover:bg-red-700 transition"
        >
          Back to Home
        </button>
        
      </div>
    </div>
  );
}
