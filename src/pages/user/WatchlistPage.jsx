import VideoList from "../../components/VideoList.jsx";

export default function WatchlistPage({ videos, watchlist, onLike, onToggleWatchlist }) {
  return (
    <VideoList
      title="My watchlist"
      videos={videos.filter((video) => watchlist.includes(video.id))}
      watchlist={watchlist}
      onLike={onLike}
      onToggleWatchlist={onToggleWatchlist}
    />
  );
}
