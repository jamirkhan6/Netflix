"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export default function MoviePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data, isLoading, error } = useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const res = await fetch("/movie.json");
      if (!res.ok) throw new Error("Failed to fetch movies");
      const movies = await res.json();
      return movies.find((m: any) => String(m.id) === id);
    },
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>{error.message}</p>;
  if (!data) return <p>No movie found</p>;

  return (
    <div className="pl-6 flex gap-10">
      <img
        src={data.img}
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
          <button className="bg-red-600 px-6 py-3 rounded hover:bg-red-700">
            Already Watched
          </button>
          <button className="bg-red-600 px-6 py-3 rounded hover:bg-red-700">
            Save Logo
          </button>
        </div>
      </div>
    </div>
  );
}
