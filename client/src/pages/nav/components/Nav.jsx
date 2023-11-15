import { Link } from "react-router-dom";
import "../stylesheets/Nav.css";
import { useEffect } from "react";

export default function Nav({ user }) {
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstLoad");
    location.href = "/";
  };

  useEffect(() => {
    if (window.localStorage) {
      if (!localStorage.getItem("firstLoad")) {
        localStorage["firstLoad"] = true;
        window.location.reload();
      }
    }
  }, []);

  return (
    <nav className="nav">
      <div className="nav-content-container">
        <div className="navlinks-container">
          <Link to="/">Dashboard</Link>
          <br />
          {user ? (
            <Link to={`/${user}`}>Profile</Link>
          ) : (
            <Link to={null}>Profile</Link>
          )}
          <br />
          <Link to="/" onClick={logOut}>
            Log Out
          </Link>
        </div>
        <div className="profile-btn-container">
          <div className="nav-profile-pic"></div>
        </div>
      </div>
    </nav>
  );
}
