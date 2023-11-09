import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Post from "../../../reusable-components/post/Post";
import Announce from "../../../reusable-components/announcement/Announce";
import Nav from "../../nav/components/Nav";
import "../stylesheets/Userprofile.css";
import axios from "axios";

export default function Userprofile() {
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const filteredPosts = posts.filter((el) => el.username === user.username);
  const filteredAnnouncements = announcements.filter(
    (el) => el.username === user.username
  );

  const decodeUser = () => {
    const token = localStorage.getItem("token");
    const User = jwtDecode(token);
    const parsedUser = JSON.parse(User.user);
    setUser(parsedUser);
  };

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const announcement = await axios.get(
        "https://backend.dosshs.online/api/announcement",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setAnnouncements(announcement.data);

      const post = await axios.get("https://backend.dosshs.online/api/post", {
        headers: {
          Authorization: token,
        },
      });
      // const sortedPosts = postsResponse.data.sort(
      //   (a, b) => new Date(a.dateCreated) - new Date(b.dateCreated)
      // );

      // const getLikesPromises = sortedPosts.map(async (post) => {
      //   const likeCountResponse = axios.get(
      //     `https://backend.dosshs.online/api/post/like/count/${post._id}`,
      //     {
      //       headers: {
      //         Authorization: token,
      //       },
      //     }
      //   );

      //   const commentCountResponse = axios.get(
      //     `https://backend.dosshs.online/api/post/comment/count/${post._id}`,
      //     {
      //       headers: {
      //         Authorization: token,
      //       },
      //     }
      //   );

      //   const [likeCount, commentCount] = await Promise.all([
      //     likeCountResponse,
      //     commentCountResponse,
      //   ]);

      //   return {
      //     ...post,
      //     likeCount: likeCount.data.likeCount,
      //     commentCount: commentCount.data.commentCount,
      //   };
      // });

      // const postsWithCounts = await Promise.all(postsResponse.data);
      setPosts(post.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    decodeUser();
    fetchPosts();
  }, []);

  return (
    <div className="container">
      <Nav />
      <div className="dashboard --userprofile">
        <h2 className="--big-h2">Profile</h2>
        <div className="userprofile-container">
          <div className="profile-pic --userprofile-pic"></div>
          <p className="display-name" style={{ fontSize: "1.3rem" }}>
            {user.firstname} {user.lastname}
          </p>
          <p className="username" style={{ fontSize: "1rem" }}>
            {" "}
            @{user.username}
          </p>
          <p className="bio">"{user.bio}"</p>
        </div>
        <div className="userpost-container">
          <div className="userpost-container-header">
            <h2 style={{ fontSize: "1.5rem" }}>Your Post / Announcements</h2>
            <div>
              <button className="post-btn" style={{ marginRight: "1rem" }}>
                Make an Announcement
              </button>
              <button className="post-btn">Post Something</button>
            </div>
          </div>
          <div className="user-post-and-announcements">
            <div className="user-announcement">
              {filteredAnnouncements.length > 0 ? (
                filteredAnnouncements.map((filteredAnnounce) => (
                  <Announce
                    key={filteredAnnounce._id}
                    fullname={filteredAnnounce.fullname}
                    username={filteredAnnounce.username}
                    content={filteredAnnounce.content}
                  />
                ))
              ) : (
                <p className="empty">You haven't created announcement yet</p>
              )}
            </div>
            <div className="user-post">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((filteredPost) => (
                  <Post
                    key={filteredPost._id}
                    fullname={filteredPost.fullname}
                    username={filteredPost.username}
                    content={filteredPost.content}
                    date={filteredPost.dateCreated}
                  />
                ))
              ) : (
                <p className="empty">You haven't posted anything</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
