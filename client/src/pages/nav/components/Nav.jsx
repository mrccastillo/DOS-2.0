import { Link } from "react-router-dom";
import "../stylesheets/Nav.css";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function Nav() {
  const [user, setUser] = useState([]);

  const logOut = () => {
    localStorage.removeItem("token");
    location.href = "/";
  };

  const decodeUser = () => {
    const User = jwtDecode(localStorage.getItem("token"));
    const parsedUser = JSON.parse(User.user);
    setUser(parsedUser);
  };

  useEffect(() => {
    decodeUser();
  }, []);

  return (
    <nav className="nav">
      <div className="nav-content-container">
        <div className="navlinks-container">
          <Link to="/">Dashboard</Link>
          <br />
          <Link to={`/${user.username}`}>Profile</Link>
          {/* <Link to={`/${user.username}`} User Profile </Link> */}
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
