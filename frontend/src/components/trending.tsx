"use client"

import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation";

export default function trending () {
    const router = useRouter();

    const { data, isLoading, error} = useQuery({
        queryKey : ["movies"],
        queryFn : async () => {
            const res = await fetch("/movie.json");
            if (!res.ok) throw new Error("Failed to fetch movies");
            return res.json();
        }
    })

    if (isLoading)
      return (
        <p className="text-white text-center my-6">
          Loading trending movies...
        </p>
      );

    if (error instanceof Error)
      return <p className="text-white text-center my-6">{error.message}</p>;

    const trendingMovies = data.filter((movie: any) => movie.rating >= 8.5)

    if (trendingMovies.length === 0)
      return (
        <p className="text-white text-center my-6">No trending movies found.</p>
      );

    return (
      <div className="">
        <h2 className="text-4xl text-red-600 font-bold ml-6 mb-4">
          Trending Movies :
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {trendingMovies.map((movie: any) => (
            <div
              key={movie.id}
              className="w-full p-4 border-1 border-stone-800 rounded-3xl cursor-pointer transform hover:scale-105 transition-all"
              onClick={() => router.push(`/movie?id=${movie.id}`)}
            >
              <img
                src={movie.img}
                alt={movie.name}
                className="w-full h-72 rounded-2xl"
              />
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
          ))}
        </div>
      </div>
    );
}


