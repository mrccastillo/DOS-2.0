import { Link } from "react-router-dom";
import "../stylesheets/Nav.css";

export default function Nav() {
  const logOut = () => {
    localStorage.removeItem("token");
    // window.location.reload();
    location.href = "/";
  };
  return (
    <nav className="nav">
      <div className="nav-content-container">
        <div className="navlinks-container">
          <Link to="/">Dashboard</Link>
          <br />
          <Link to="/userprofile">User Profile</Link>
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
