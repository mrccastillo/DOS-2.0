import Post from "../../../reusable-components/post/Post";
import CreatePost from "../../../reusable-components/post/CreatePost";
import "../stylesheets/Home.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home({ fullname, username, userId }) {
  const [posts, setPosts] = useState([]);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
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
      setPosts(post.data.reverse());
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handlePostCreated = () => {
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div className="home-container">
        <div className="filter-container">
          <span className="--chip">DOS is For You!</span>
          <span className="--chip">General</span>
          <span className="--chip">PUP</span>
          <span className="--chip">Rant</span>
        </div>
        <div className="post-container">
          <div className="create-post">
            <button
              className="post-btn"
              onClick={() => setIsCreatePostOpen(!isCreatePostOpen)}
            >
              <i className="material-icons">add_circle_outline</i> Post
              Something
            </button>
          </div>
          <div className="posts-list">
            {posts.map((el) => (
              <Post
                key={el._id}
                fullname={el.fullname}
                username={el.username}
                content={el.content}
                date={el.dateCreated}
              />
            ))}
          </div>
        </div>
      </div>
      {isCreatePostOpen && (
        <CreatePost
          fullname={fullname}
          username={username}
          userId={userId}
          onPostCreated={handlePostCreated}
          onModalClose={() => {
            setIsCreatePostOpen(!isCreatePostOpen);
          }}
        />
      )}
    </>
  );
}
