import Nav from "../../nav/components/Nav";
import Announcements from "./Announcement";
import Home from "./Home";
import "../stylesheets/Dashboard.css";

export default function Dashboard() {
  return (
    <div className="container">
      <Nav />
      <div className="dashboard">
        <div className="header">
          <div className="dosboard-and-search-container">
            <h2 className="--big-h2">DOSBoard</h2>
          </div>
          <h2 className="--big-h2">Hello, Juan</h2>
        </div>
        <div className="posts-announcements-container">
          <Announcements />
          <Home />
        </div>
      </div>
    </div>
  );
}
