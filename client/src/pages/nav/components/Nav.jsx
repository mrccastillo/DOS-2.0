import { Link } from "react-router-dom";
import "../stylesheets/Nav.css";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-content-container">
        <div className="navlinks-container">
          <Link to="/">Dashboard</Link>
          <Link to="/userprofile">User Profile</Link>
          <p>Log Out</p>
        </div>
        <div className="profile-btn-container">
          <div className="nav-profile-pic"></div>
        </div>
      </div>
    </nav>
  );
}
