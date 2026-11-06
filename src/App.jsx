import React, { useEffect, useState } from "react";
import { adminAccount } from "./data/sampleVideos.js";
import { getStartingVideos, readStorage } from "./utils/storage.js";
import UserHeader from "./components/UserHeader.jsx";
import AdminHeader from "./components/AdminHeader.jsx";
import WelcomePage from "./pages/WelcomePage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import SignupPage from "./pages/auth/SignupPage.jsx";
import AdminLoginPage from "./pages/auth/AdminLoginPage.jsx";
import HomePage from "./pages/user/HomePage.jsx";
import WatchlistPage from "./pages/user/WatchlistPage.jsx";
import WatchPage from "./pages/user/WatchPage.jsx";
import ProfilePage from "./pages/user/ProfilePage.jsx";
import AdminPage from "./pages/admin/AdminPage.jsx";

function App() {
  const [page, setPage] = useState(
    window.location.hash.replace("#/", "") || "welcome",
  );
  const [users, setUsers] = useState(() => readStorage("streamUsers", []));
  const [currentUser, setCurrentUser] = useState(() =>
    readStorage("streamCurrentUser", null),
  );
  const [isAdmin, setIsAdmin] = useState(
    () => localStorage.getItem("streamAdmin") === "true",
  );
  const [videos, setVideos] = useState(getStartingVideos);
  const [watchlist, setWatchlist] = useState(() => {
    const user = readStorage("streamCurrentUser", null);
    return user ? readStorage(`watchlist_${user.email}`, []) : [];
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    function updatePage() {
      setPage(window.location.hash.replace("#/", "") || "welcome");
      setMessage("");
    }

    window.addEventListener("hashchange", updatePage);
    return () => window.removeEventListener("hashchange", updatePage);
  }, []);

  useEffect(() => {
    const userPages = ["home", "watchlist", "profile"];
    if (userPages.includes(page) || page.startsWith("watch/")) {
      if (!currentUser) window.location.hash = "#/login";
    }
    if (page === "admin" && !isAdmin) window.location.hash = "#/admin-login";
  }, [page, currentUser, isAdmin]);

  function navigate(nextPage) {
    window.location.hash = `#/${nextPage}`;
    setPage(nextPage);
    setMessage("");
  }

  function saveVideos(updatedVideos) {
    setVideos(updatedVideos);
    localStorage.setItem("streamVideos", JSON.stringify(updatedVideos));
  }

  function signUp(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get("name").trim();
    const email = form.get("email").trim().toLowerCase();
    const password = form.get("password");

    if (users.some((user) => user.email === email)) {
      setMessage("This email is already registered.");
      return;
    }

    const newUsers = [...users, { name, email, password }];
    setUsers(newUsers);
    localStorage.setItem("streamUsers", JSON.stringify(newUsers));
    setMessage("Account created. You can now log in.");
    navigate("login");
  }

  function logIn(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = form.get("email").trim().toLowerCase();
    const password = form.get("password");
    const user = users.find(
      (savedUser) => savedUser.email === email && savedUser.password === password,
    );

    if (!user) {
      setMessage("Wrong email or password.");
      return;
    }

    setCurrentUser(user);
    localStorage.setItem("streamCurrentUser", JSON.stringify(user));
    setWatchlist(readStorage(`watchlist_${user.email}`, []));
    navigate("home");
  }

  function logInAdmin(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = form.get("email").trim();
    const password = form.get("password");

    if (email !== adminAccount.email || password !== adminAccount.password) {
      setMessage("Wrong admin email or password.");
      return;
    }

    localStorage.setItem("streamAdmin", "true");
    setIsAdmin(true);
    navigate("admin");
  }

  function logOut() {
    localStorage.removeItem("streamCurrentUser");
    setCurrentUser(null);
    setWatchlist([]);
    navigate("welcome");
  }

  function logOutAdmin() {
    localStorage.removeItem("streamAdmin");
    setIsAdmin(false);
    navigate("welcome");
  }

  function toggleWatchlist(videoId) {
    const updatedList = watchlist.includes(videoId)
      ? watchlist.filter((savedId) => savedId !== videoId)
      : [...watchlist, videoId];
    setWatchlist(updatedList);
    localStorage.setItem(
      `watchlist_${currentUser.email}`,
      JSON.stringify(updatedList),
    );
  }

  function likeVideo(videoId) {
    saveVideos(
      videos.map((video) =>
        video.id === videoId ? { ...video, likes: video.likes + 1 } : video,
      ),
    );
  }

  function addView(videoId) {
    saveVideos(
      videos.map((video) =>
        video.id === videoId ? { ...video, views: video.views + 1 } : video,
      ),
    );
  }

  function saveAdminVideo(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const editingId = form.get("id");
    const oldVideo = videos.find((video) => video.id === Number(editingId));
    const video = {
      id: oldVideo ? oldVideo.id : Date.now(),
      title: form.get("title").trim(),
      description: form.get("description").trim(),
      category: form.get("category").trim(),
      thumbnail: form.get("thumbnail").trim(),
      url: form.get("url").trim(),
      duration: form.get("duration").trim(),
      views: oldVideo ? oldVideo.views : 0,
      likes: oldVideo ? oldVideo.likes : 0,
    };

    saveVideos(
      oldVideo
        ? videos.map((item) => (item.id === oldVideo.id ? video : item))
        : [...videos, video],
    );
    setMessage("Video saved successfully.");
    event.currentTarget.reset();
  }

  function deleteVideo(videoId) {
    if (!window.confirm("Delete this video?")) return;
    saveVideos(videos.filter((video) => video.id !== videoId));
  }

  const selectedVideo = page.startsWith("watch/")
    ? videos.find((video) => video.id === Number(page.split("/")[1]))
    : null;

  return (
    <>
      {["home", "watchlist", "profile"].includes(page) ||
      page.startsWith("watch/") ? (
        <UserHeader user={currentUser} onLogout={logOut} />
      ) : page === "admin" ? (
        <AdminHeader onLogout={logOutAdmin} />
      ) : null}

      {page === "welcome" && <WelcomePage onNavigate={navigate} />}
      {page === "signup" && <SignupPage message={message} onSubmit={signUp} />}
      {page === "login" && <LoginPage message={message} onSubmit={logIn} />}
      {page === "admin-login" && (
        <AdminLoginPage message={message} onSubmit={logInAdmin} />
      )}
      {page === "home" && currentUser && (
        <HomePage
          videos={videos}
          watchlist={watchlist}
          onLike={likeVideo}
          onToggleWatchlist={toggleWatchlist}
        />
      )}
      {page === "watchlist" && currentUser && (
        <WatchlistPage
          videos={videos}
          watchlist={watchlist}
          onLike={likeVideo}
          onToggleWatchlist={toggleWatchlist}
        />
      )}
      {page === "profile" && currentUser && <ProfilePage user={currentUser} />}
      {page.startsWith("watch/") && currentUser && (
        <WatchPage
          video={selectedVideo}
          onView={addView}
          onLike={likeVideo}
          onToggleWatchlist={toggleWatchlist}
          isSaved={selectedVideo ? watchlist.includes(selectedVideo.id) : false}
        />
      )}
      {page === "admin" && isAdmin && (
        <AdminPage
          users={users}
          videos={videos}
          message={message}
          onSave={saveAdminVideo}
          onDelete={deleteVideo}
        />
      )}
    </>
  );
}

export default App;
