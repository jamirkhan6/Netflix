"use client";

import SavedMovies from "@/components/saveMovie";
import WatchedMovies from "@/components/watchMovie";


export default function MyListPage() {
  return (
    <div className="px-10">
      <h1 className="text-5xl text-red-600 font-bold mb-8">My Movie List</h1>
      {/* name of each tab group should be unique */}
      <div className="tabs tabs-lift">
        <input
          type="radio"
          name="my_tabs_3"
          className="tab"
          aria-label="Saved movie"
          defaultChecked
        />
        <div className="tab-content bg-base-100 border-base-300 px-6">
          <SavedMovies />
        </div>

        <input
          type="radio"
          name="my_tabs_3"
          className="tab"
          aria-label="Watched movie"
        />
        <div className="tab-content bg-base-100 border-base-300 px-6">
          <WatchedMovies />
        </div>
      </div>
    </div>
  );
}
