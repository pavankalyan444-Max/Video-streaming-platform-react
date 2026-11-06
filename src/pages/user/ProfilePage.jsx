export default function ProfilePage({ user }) {
  return (
    <main className="container">
      <section className="panel profile-card">
        <p className="eyebrow">USER MODULE</p>
        <h1>My profile</h1>
        <div className="profile-row">
          <strong>Name</strong>
          <span>{user.name}</span>
        </div>
        <div className="profile-row">
          <strong>Email</strong>
          <span>{user.email}</span>
        </div>
        <div className="profile-row">
          <strong>Account type</strong>
          <span>Standard user</span>
        </div>
      </section>
    </main>
  );
}
