"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

//   useEffect(() => {
//     const loggedIn = document.cookie.includes("loggedIn=true");
//     if (!loggedIn) router.push("/SignIn");
//   }, [router]);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/SignIn");
  };

  return (
    <div>
      <h2>Home Page</h2>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded mt-4"
      >
        Logout
      </button>
    </div>
  );
}
