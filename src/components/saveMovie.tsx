"use client";

import { useEffect, useState } from "react";

export default function SavedMovies() {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedMovies") || "[]");
    setMovies(stored);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-white mb-4">💾 Saved Movies</h2>
      <div className="grid grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="p-4 bg-gray-900 rounded-xl shadow-md border border-gray-700"
          >
            <img
              src={movie.img}
              alt={movie.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <h3 className="text-xl text-white mt-3 font-semibold">
              {movie.name}
            </h3>
            <p className="text-gray-400">{movie.category}</p>
            <p className="text-red-500 font-bold">⭐ {movie.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
