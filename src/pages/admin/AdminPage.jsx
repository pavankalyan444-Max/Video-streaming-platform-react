import Stat from "../../components/Stat.jsx";

export default function AdminPage({ users, videos, message, onSave, onDelete }) {
  const totalLikes = videos.reduce((total, video) => total + video.likes, 0);
  const totalViews = videos.reduce((total, video) => total + video.views, 0);

  return (
    <main className="container">
      <p className="eyebrow">ADMIN MODULE</p>
      <h1>Dashboard</h1>
      <section className="stats-grid">
        <Stat label="Total users" value={users.length} />
        <Stat label="Total videos" value={videos.length} />
        <Stat label="Total likes" value={totalLikes} />
        <Stat label="Total views" value={totalViews} />
      </section>
      <div className="admin-layout">
        <section className="panel">
          <h2>Add a video</h2>
          <form onSubmit={onSave}>
            <input name="id" type="hidden" />
            <label>
              Title
              <input name="title" required />
            </label>
            <label>
              Description
              <textarea name="description" required />
            </label>
            <label>
              Category
              <input name="category" required />
            </label>
            <label>
              Thumbnail image URL
              <input name="thumbnail" type="url" required />
            </label>
            <label>
              Video URL
              <input name="url" type="url" required />
            </label>
            <label>
              Duration
              <input name="duration" placeholder="05:30" required />
            </label>
            <button className="button primary" type="submit">
              Save video
            </button>
            <p className="message" role="status">{message}</p>
          </form>
        </section>
        <section className="panel">
          <h2>Manage videos</h2>
          {videos.length === 0 && <p className="muted">No videos yet.</p>}
          {videos.map((video) => (
            <div className="admin-video" key={video.id}>
              <img src={video.thumbnail} alt="" />
              <div className="admin-video-info">
                <strong>{video.title}</strong>
                <small>{video.category} · {video.views} views</small>
              </div>
              <button
                className="small-button"
                onClick={(event) => {
                  const form = event.currentTarget
                    .closest(".admin-layout")
                    .querySelector("form");
                  form.elements.id.value = video.id;
                  form.elements.title.value = video.title;
                  form.elements.description.value = video.description;
                  form.elements.category.value = video.category;
                  form.elements.thumbnail.value = video.thumbnail;
                  form.elements.url.value = video.url;
                  form.elements.duration.value = video.duration;
                  form.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Edit
              </button>
              <button
                className="small-button danger"
                onClick={() => onDelete(video.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </section>
      </div>
      <section className="panel">
        <h2>Registered users</h2>
        {users.length === 0 ? (
          <p className="muted">No users registered yet.</p>
        ) : (
          users.map((user) => (
            <div className="user-row" key={user.email}>
              <strong>{user.name}</strong> · {user.email}
            </div>
          ))
        )}
      </section>
    </main>
  );
}
