"use client";

import { useEffect, useState } from "react";

export default function WatchedMovies() {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("watchedMovies") || "[]");
    setMovies(stored);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-white mb-4">🎬 Already Watched</h2>
      <div className="grid grid-cols-6 gap-8">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="w-full p-4 col-span-1 border-1 border-gray-500 rounded-3xl"
          >
            <img
              src={movie.posterUrl}
              alt={movie.name}
              className="w-full h-72 rounded-2xl"
            />
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
  );
}
