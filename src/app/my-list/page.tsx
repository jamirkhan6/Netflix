"use client";

import SavedMovies from "@/components/saveMovie";
import WatchedMovies from "@/components/watchMovie";


export default function MyListPage() {
  return (
    <div className="p-10">
      <h1 className="text-5xl text-red-600 font-bold mb-8">My Movie List</h1>
      <SavedMovies />
      <WatchedMovies />
    </div>
  );
}
