export default function UserHeader({ user, onLogout }) {
  return (
    <header className="navbar">
      <a className="brand" href="#/home">
        StreamBox
      </a>
      <nav aria-label="User navigation">
        <a href="#/home">Browse</a>
        <a href="#/watchlist">Watchlist</a>
        <a href="#/profile">{user?.name || "Profile"}</a>
        <button className="link-button" onClick={onLogout}>
          Log out
        </button>
      </nav>
    </header>
  );
}
