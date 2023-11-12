import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Post from "../../../reusable-components/post/Post";
import Announce from "../../../reusable-components/announcement/Announce";
import Nav from "../../nav/components/Nav";
import CreateAnnouncement from "../../../reusable-components/announcement/CreateAnnouncement";
import CreatePost from "../../../reusable-components/post/CreatePost";
import "../stylesheets/Userprofile.css";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Userprofile() {
  const token = localStorage.getItem("token");
  const { username } = useParams();
  const [user, setUser] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState([]);
  const [posts, setPosts] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isCreateAnnounceOpen, setIsCreateAnnounceOpen] = useState(false);

  const filteredPosts = posts.filter((el) => el.username === user.username);
  const filteredAnnouncements = announcements.filter(
    (el) => el.username === user.username
  );

  const fetchUser = async () => {
    const user = await axios.get(
      `https://backend.dosshs.online/api/user?username=${username}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setUser(user.data.other);
  };

  const decodeUser = () => {
    const token = localStorage.getItem("token");
    const User = jwtDecode(token);
    const parsedUser = JSON.parse(User.user);
    setUserLoggedIn(parsedUser);
  };

  const fetchPosts = async () => {
    try {
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
      return console.error("Error fetching posts:", error);
    }
  };

  const handlePostCreated = () => {
    fetchPosts();
  };

  useEffect(() => {
    fetchUser();
    decodeUser();
    fetchPosts();
  }, [username]);

  return (
    <>
      <div className="container">
        <Nav />
        <div className="dashboard --userprofile">
          <h2 className="--big-h2">Profile</h2>
          <div className="userprofile-container">
            <div className="profile-pic --userprofile-pic"></div>
            <p className="display-name" style={{ fontSize: "1.3rem" }}>
              {user.fullname}
            </p>
            <p className="username" style={{ fontSize: "1rem" }}>
              {" "}
              @{user.username}
            </p>
            {user.bio ? <p className="bio">"{user.bio}"</p> : null}
          </div>
          <div className="userpost-container">
            <div className="userpost-container-header">
              {user._id === userLoggedIn._id ? (
                <h2 style={{ fontSize: "1.5rem" }}>
                  Your Post & Announcements
                </h2>
              ) : (
                <h2 style={{ fontSize: "1.5rem" }}>
                  {user.username} Posts & Announcements
                </h2>
              )}
              {user._id === userLoggedIn._id ? (
                <div>
                  <button
                    className="post-btn"
                    style={{ marginRight: "1rem" }}
                    onClick={() => {
                      setIsCreateAnnounceOpen(!isCreateAnnounceOpen);
                    }}
                  >
                    Make an Announcement
                  </button>
                  <button
                    className="post-btn"
                    onClick={() => {
                      setIsCreatePostOpen(!isCreatePostOpen);
                    }}
                  >
                    Post Something
                  </button>
                </div>
              ) : null}
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
      {isCreatePostOpen && (
        <CreatePost
          fullname={user.fullname}
          username={user.username}
          userId={user._id}
          onPostCreated={handlePostCreated}
          onModalClose={() => {
            setIsCreatePostOpen(!isCreatePostOpen);
          }}
        />
      )}
      {isCreateAnnounceOpen && (
        <CreateAnnouncement
          fullname={user.fullname}
          username={user.username}
          userId={user.userId}
          onAnnouncementCreated={handlePostCreated}
          onModalClose={() => {
            setIsCreateAnnounceOpen(!isCreateAnnounceOpen);
          }}
        />
      )}
    </>
  );
}
