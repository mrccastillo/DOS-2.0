import "./Post.css";

export default function Post() {
  return (
    <div className="post">
      <div className="post-content-container">
        <div className="post-details">
          <div className="post-author-info">
            <div className="profile-pic"></div>
            <div className="post-author">
              <p className="display-name">Juan Dela Cruz</p>
              <p className="username">@user_name</p>
              <p className="date">10/28/2023 6:09 PM</p>
            </div>
          </div>
          <div className="report-post-container"></div>
        </div>
        <div className="post-content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ex
            cumque ut suscipit officiis aut qui vitae doloremque. Tempore error
            illo, atque velit nostrum mollitia. Distinctio quae inventore quod
            sunt! Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
            ex cumque ut suscipit officiis aut qui vitae doloremque. Tempore
            error illo, atque velit nostrum mollitia. Distinctio quae inventore
            quod sunt!
          </p>
        </div>
      </div>
      <div className="post-interaction">{/* like and comment container */}</div>
    </div>
  );
}
