"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/SignIn");
  };

  const {data, isLoading, error} = useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const res = await fetch("/movie.json")
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    }
  })

  if(isLoading) return <p>is isLoading</p>
  if(error instanceof Error) return <p>{error.message}</p>

  return (
    <div>
      <h2>Home Page</h2>

      <div className="mt-6 w-full">
        <h3 className="text-lg font-bold">Movies:</h3>
        <div className="bg-amber-300">
          {data.map((movie: any, i: number) => (
            <h1 key={i}>{movie.name}</h1>
          ))}
        </div>
      </div>

    </div>
  );
}
