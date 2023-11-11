import { useState } from "react";
import "./CreatePost.css";
import axios from "axios";

export default function CreatePost({
  fullname,
  username,
  userId,
  onPostCreated,
  onModalClose,
}) {
  const [content, setContent] = useState("");
  const [isPosting, setIsPosting] = useState("Post");

  async function handlePostSubmit(e) {
    setIsPosting("Post");
    e.preventDefault();
    const post = {
      userId: userId,
      username: username,
      fullname: fullname,
      title: "testtitle",
      content: content,
    };

    try {
      setIsPosting("Posting...");
      const token = localStorage.getItem("token");
      await axios.post("https://backend.dosshs.online/api/post", post, {
        headers: {
          Authorization: token,
        },
      });
      onModalClose();
      onPostCreated();
    } catch (e) {
      console.error("error:", e);
    }
    console.log(post);
  }

  function closeModal() {
    onModalClose();
  }

  return (
    <>
      <form
        className="create-post-announcement-modal"
        onSubmit={handlePostSubmit}
      >
        <div>
          <div className="post-announcement-modal-header">
            <h2>Create Post</h2>
          </div>
          <div className="post-announcement-modal-content">
            <div className="post-author-info">
              <div className="profile-pic"></div>
              <div className="post-author">
                <p
                  className="display-name --white-text"
                  style={{ fontWeight: 500 }}
                >
                  {fullname}
                </p>
                <p className="username --white-text">@{username}</p>
              </div>
            </div>
            <textarea
              className="create-post-announce-content"
              placeholder="What would you like to post?"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></textarea>
            <div className="post-category">
              <select className="select">
                <option value="">General</option>
                <option value="">PUP</option>
                <option value="">Question</option>
                <option value="">Rant</option>
              </select>
              <div className="anonymous-btn">
                <input type="checkbox" id="isAnonymous" />
                <label htmlFor="isAnonymous">Post Anonymously</label>
              </div>
            </div>
          </div>
        </div>
        <button className="submit-post">{isPosting}</button>
        <p className="close-btn" onClick={closeModal}>
          &times;
        </p>
      </form>
      <div className="overlay"></div>
    </>
  );
}
