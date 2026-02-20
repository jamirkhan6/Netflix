"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function MoviePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [isWatched, setIsWatched] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/movies");
      if (!res.ok) throw new Error("Failed to fetch movies");
      const movies = await res.json();
      return movies.find((m: any) => String(m._id) === id);
    },
    enabled: !!id,
  });


  
  useEffect(() => {
    if (data) {
      const watchedMovies = JSON.parse(
        localStorage.getItem("watchedMovies") || "[]"
      );
      const savedMovies = JSON.parse(
        localStorage.getItem("savedMovies") || "[]"
      );

      setIsWatched(watchedMovies.some((m: any) => m.id === data.id));
      setIsSaved(savedMovies.some((m: any) => m.id === data.id));
    }
  }, [data]);



  const handleToggle = (movie: any, type: "watched" | "saved") => {
    const key = type === "watched" ? "watchedMovies" : "savedMovies";

    let existing = JSON.parse(localStorage.getItem(key) || "[]");
    const alreadyExist = existing.some((m: any) => m.id === movie.id);

    if (alreadyExist) {
      // remove if exists
      existing = existing.filter((m: any) => m.id !== movie.id);
      localStorage.setItem(key, JSON.stringify(existing));

      if (type === "watched") setIsWatched(false);
      if (type === "saved") setIsSaved(false);
    } else {
      // add if not exists
      existing.push(movie);
      localStorage.setItem(key, JSON.stringify(existing));

      if (type === "watched") setIsWatched(true);
      if (type === "saved") setIsSaved(true);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>{error.message}</p>;
  if (!data) return <p>No movie found</p>;

  return (
    <div className="pl-6 flex gap-10">
      <img
        src={data.posterUrl}
        alt={data.name}
        className="w-[512px] h-[712px] rounded-2xl"
      />
      <div className="p-6">
        <h1 className="text-6xl text-white font-bold mt-3">
          <span className="text-red-600">Movie Name :</span> {data.name}
        </h1>
        <p className="text-2xl text-white mt-8">
          <span className="font-bold ml-10">Description :</span>{" "}
          {data.description}
        </p>
        <p className="text-white text-2xl mt-8">Director : {data.director}</p>
        <p className="text-white text-2xl mt-4">Category : {data.category}</p>
        <p className="text-white text-2xl mt-4">Rating : {data.rating}</p>
        <p className="text-white text-2xl mt-4">
          Release Date : {data.releaseDate}
        </p>

        <div className="flex gap-8 mt-8">
          <button className="bg-red-600 px-6 py-3 rounded hover:bg-red-700">
            Watch Movie
          </button>

          {/* Watched button */}
          <button
            className="px-6 py-3 rounded text-white bg-red-600"
            onClick={() => handleToggle(data, "watched")}
          >
            {isWatched ? "Already Watched" : "Mark as Watched"}
          </button>

          {/* Saved button */}
          <button
            className="px-6 py-3 rounded text-white bg-red-600"
            onClick={() => handleToggle(data, "saved")}
          >
            {isSaved ? "Already Saved" : "Save Movie"}
          </button>
        </div>
      </div>
    </div>
  );
}
