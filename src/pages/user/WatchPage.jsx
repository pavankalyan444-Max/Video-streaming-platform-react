import { useEffect, useRef } from "react";

export default function WatchPage({ video, onView, onLike, onToggleWatchlist, isSaved }) {
  const countedVideoId = useRef(null);

  useEffect(() => {
    if (video && countedVideoId.current !== video.id) {
      countedVideoId.current = video.id;
      onView(video.id);
    }
  }, [video?.id]);

  if (!video) {
    return (
      <main className="container">
        <p className="message">Video not found. <a href="#/home">Return home</a></p>
      </main>
    );
  }

  return (
    <main className="container watch-page">
      <video controls poster={video.thumbnail} src={video.url}>
        Your browser does not support video playback.
      </video>
      <h1>{video.title}</h1>
      <p className="video-meta">
        {video.category} · {video.duration} · {video.views} views
      </p>
      <p>{video.description}</p>
      <div className="card-actions">
        <button className="button primary" onClick={() => onLike(video.id)}>
          Like ({video.likes})
        </button>
        <button
          className="button outline"
          onClick={() => onToggleWatchlist(video.id)}
        >
          {isSaved ? "Remove from watchlist" : "Add to watchlist"}
        </button>
      </div>
    </main>
  );
}
