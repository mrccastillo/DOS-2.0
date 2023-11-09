import Nav from "../../nav/components/Nav";
import Announcements from "./Announcement";
import Home from "./Home";
import "../stylesheets/Dashboard.css";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [user, setUser] = useState([]);

  const decodeUser = () => {
    const token = localStorage.getItem("token");
    const User = jwtDecode(token);
    const parsedUser = JSON.parse(User.user);
    setUser(parsedUser);
  };

  useEffect(() => {
    decodeUser();
  }, []);

  return (
    <div className="container">
      <Nav />
      <div className="dashboard">
        <div className="header">
          <div className="dosboard-and-search-container">
            <h2 className="--big-h2">DOSBoard</h2>
          </div>
          <h2 className="--big-h2">Hello, {user.username}!</h2>
        </div>
        <div className="posts-announcements-container">
          <Announcements />
          <Home />
        </div>
      </div>
    </div>
  );
}
