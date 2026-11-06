export default function VideoCard({ video, isSaved, onLike, onToggleWatchlist }) {
  return (
    <article className="video-card">
      <img src={video.thumbnail} alt={`${video.title} thumbnail`} />
      <div className="video-card-content">
        <h3>{video.title}</h3>
        <p className="video-meta">
          {video.category} · {video.duration} · {video.views} views
        </p>
        <p className="description">{video.description}</p>
        <div className="card-actions">
          <a className="small-button primary" href={`#/watch/${video.id}`}>
            Watch
          </a>
          <button className="small-button" onClick={() => onLike(video.id)}>
            Like ({video.likes})
          </button>
          <button
            className="small-button"
            onClick={() => onToggleWatchlist(video.id)}
          >
            {isSaved ? "Remove saved" : "Save"}
          </button>
        </div>
      </div>
    </article>
  );
}
