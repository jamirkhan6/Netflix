"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useAppContext } from "../api/context/AppContext";
import Trending from "@/components/trending";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const { searchTerm } = useAppContext();
  const [filter, setFilter] = useState("");

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/SignIn");
  };




  const { data, isLoading, error } = useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/movies");
      if (!res.ok) throw new Error("Failed to fetch movies");
      return res.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>{error.message}</p>;


  let filteredMovies = data.filter((movie: any) =>
    movie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  if (filter === "top") {
    filteredMovies = [...filteredMovies].sort((a, b) => b.rating - a.rating);
  }

  if (filter === "watched") {
    filteredMovies = [...filteredMovies].sort((a, b) => b.views - a.views);
  }

  return (
    <div>
      <div className="w-full mx-6">
        <div>
          <Trending />
        </div>

        <div className="flex justify-between m-6">
          <h1 className="text-4xl text-red-600 font-bold">Movies : </h1>
          <select
            className="select select-bordered w-52 bg-red-600 text-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">Filter</option>
            <option value="top">Top Rating</option>
            <option value="watched">Most Watched</option>
          </select>
        </div>

        <div className="grid grid-cols-6 gap-8">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie: any, i: number) => (
              <div
                className="w-full p-4 col-span-1 border-1 border-stone-800 rounded-3xl cursor-pointer transform hover:scale-105 transition-all"
                key={movie._id}
                onClick={() => router.push(`/movie?id=${movie._id}`)}
              >
                <div className="relative w-full h-72">
                  <Image
                    src={movie.posterUrl}
                    alt={movie.name}
                    fill
                    className="rounded-2xl "
                    sizes="(max-width: 768px) 100vw,
                           (max-width: 1200px) 50vw,
                           33vw"
                    priority={i < 6}
                  />
                </div>
                <h1 className="h-12 text-xl text-white font-bold mt-3">
                  {movie.name}
                </h1>
                <div className="flex justify-between mt-1">
                  <p className="text-white">
                    Category:{" "}
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
            ))
          ) : (
            <p className="text-white text-lg col-span-6 text-center">
              No movies found for "
              <span className="text-red-500">{searchTerm}</span>"
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
