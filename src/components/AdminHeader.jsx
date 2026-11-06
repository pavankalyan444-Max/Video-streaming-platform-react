export default function AdminHeader({ onLogout }) {
  return (
    <header className="navbar">
      <a className="brand" href="#/admin">
        StreamBox <span className="admin-label">ADMIN</span>
      </a>
      <nav aria-label="Admin navigation">
        <a href="#/admin">Dashboard</a>
        <button className="link-button" onClick={onLogout}>
          Log out
        </button>
      </nav>
    </header>
  );
}
