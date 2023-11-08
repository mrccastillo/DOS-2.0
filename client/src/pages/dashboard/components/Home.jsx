import Post from "../../../reusable-components/post/Post";
import "../stylesheets/Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="filter-container">
        <p className="--chip">DOS is For You!</p>
        <p className="--chip">General</p>
        <p className="--chip">PUP</p>
        <p className="--chip">Rant</p>
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
