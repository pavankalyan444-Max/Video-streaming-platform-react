import VideoCard from "./VideoCard.jsx";

export default function VideoList({
  title,
  videos,
  watchlist,
  onLike,
  onToggleWatchlist,
}) {
  return (
    <section>
      <h2>{title}</h2>
      {videos.length === 0 ? (
        <p className="muted">No videos found.</p>
      ) : (
        <div className="video-grid">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              isSaved={watchlist.includes(video.id)}
              onLike={onLike}
              onToggleWatchlist={onToggleWatchlist}
            />
          ))}
        </div>
      )}
    </section>
  );
}
