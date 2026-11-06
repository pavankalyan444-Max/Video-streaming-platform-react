import { useState } from "react";
import VideoList from "../../components/VideoList.jsx";

export default function HomePage({ videos, watchlist, onLike, onToggleWatchlist }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(videos.map((video) => video.category))];
  const filteredVideos = videos.filter((video) => {
    const matchesCategory = category === "All" || video.category === category;
    const searchText = search.toLowerCase();
    const matchesSearch =
      video.title.toLowerCase().includes(searchText) ||
      video.category.toLowerCase().includes(searchText);
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="container">
      <section className="hero">
        <p className="eyebrow">USER MODULE</p>
        <h1>Find your next favorite.</h1>
        <p className="muted">Search the library or choose a category below.</p>
      </section>
      <div className="toolbar">
        <input
          aria-label="Search videos"
          placeholder="Search videos..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div className="category-list">
          {categories.map((item) => (
            <button
              className={category === item ? "selected" : ""}
              key={item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <VideoList
        title="Videos"
        videos={filteredVideos}
        watchlist={watchlist}
        onLike={onLike}
        onToggleWatchlist={onToggleWatchlist}
      />
    </main>
  );
}
