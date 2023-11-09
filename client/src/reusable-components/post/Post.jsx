import "./Post.css";

export default function Post({ fullname, username, content, date }) {
  return (
    <div className="post">
      <div className="post-content-container">
        <div className="post-details">
          <div className="post-author-info">
            <div className="profile-pic"></div>
            <div className="post-author">
              <p className="display-name">{fullname}</p>
              <p className="username">@{username}</p>
              <p className="date">{date}</p>
            </div>
          </div>
          <div className="report-post-container"></div>
        </div>
        <div className="post-content">
          <p>{content}</p>
        </div>
      </div>
      <div className="post-interaction">{/* like and comment container */}</div>
    </div>
  );
}
