import Post from "../../../reusable-components/post/Post";
import Announce from "../../../reusable-components/announcement/Announce";
import "../stylesheets/Announcement.css";

export default function Announcements() {
  return (
    <div className="announcement-container">
      <div className="announcement-tab">
        <div className="announcement-header">
          <p className="announcement-header-text --chip --announce-btn">
            Announcements
          </p>
          {/* ung tatlong tuldok ewan ko kung ano to */}
        </div>
        <div className="announcements">
          <div className="create-announcement">
            <button className="post-btn">Create Announcement</button>
          </div>
          <div className="announcement-list">
            <Announce />
            <Announce />
            <Announce />
            <Announce />
            <Announce />
          </div>
        </div>
      </div>
    </div>
  );
}
