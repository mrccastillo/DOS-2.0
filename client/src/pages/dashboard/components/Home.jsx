import Post from "../../../reusable-components/post/Post";
import "../stylesheets/Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="filter-container">
        <span className="--chip">DOS is For You!</span>
        <span className="--chip">General</span>
        <span className="--chip">PUP</span>
        <span className="--chip">Rant</span>
      </div>
      <div className="post-container">
        <div className="create-post">
          <button className="post-btn">Post Something</button>
        </div>
        <div className="posts-list">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    </div>
  );
}
