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
      <div className=" w-full">
  
        <div className="flex justify-between mx-6 mb-6">
          <h1 className="text-4xl text-red-600 font-bold">Movies : </h1>
          <select className="select select-bordered w-52 bg-red-600 text-white">
            <option disabled selected>
              Filter
            </option>
            <option>Top Rating</option>
            <option>Most Watched</option>
          </select>
        </div>
        
        <div className="grid grid-cols-6 gap-8">
          {data.map((movie: any, i: number) => (
            <div
              className="w-full p-4 col-span-1 border-1 border-stone-800 rounded-3xl"
              key={i}
              onClick={() => router.push(`/movie?id=${movie.id}`)}
            >
              <div>
                <img
                  src={movie.img}
                  alt=""
                  className="w-full h-72 rounded-2xl"
                />
              </div>
              <h1 className="h-12 text-xl text-white font-bold mt-3">
                {movie.name}
              </h1>
              <div className="flex justify-between mt-1">
                <p className="text-white">
                  Catagory :{" "}
                  <span className="font-semibold">{movie.category}</span>
                </p>
                <p className="text-white">
                  Rating:{" "}
                  <span className="text-red-700 font-semibold">
                    {movie.rating}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
