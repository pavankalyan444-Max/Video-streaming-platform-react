export default function WelcomePage({ onNavigate }) {
  return (
    <main className="welcome-page">
      <div className="welcome-card">
        <p className="eyebrow">YOUR CLASSROOM VIDEO PLATFORM</p>
        <a className="brand welcome-brand" href="#/welcome">
          StreamBox
        </a>
        <h1>Stories worth streaming.</h1>
        <p className="muted">
          Browse videos, save your favorites, and manage your own account.
        </p>
        <div className="button-row">
          <button className="button primary" onClick={() => onNavigate("login")}>
            User login
          </button>
          <button className="button outline" onClick={() => onNavigate("signup")}>
            Create account
          </button>
          <button
            className="button secondary"
            onClick={() => onNavigate("admin-login")}
          >
            Admin login
          </button>
        </div>
        <p className="hint">React + Vite · Local Storage demo</p>
      </div>
    </main>
  );
}
