import styles from "../../styles/common/contentList.module.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { decode } from "html-entities";
import parse from "html-react-parser";

ContentList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
};
ContentItem.propTypes = {
  post: PropTypes.object,
};

function ContentItem({ post }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/post/${post.postId}`);
      }}
      className={styles["content-item"]}
    >
      <h1 className={styles["content-item-header"]}>{post.title}</h1>
      <div className={styles["divider"]} />
      <div className={styles["content-item-content"]}>
        {parse(decode(post.content, { level: "html5" }))}
      </div>
      <div className={styles["content-item-date-list"]}>
        <div className={styles["content-item-date"]}>
          Created At: <br /> {post.prettifyCreatedAt()}
        </div>
        <div className={styles["content-item-date"]}>
          Updated At: <br /> {post.prettifyUpdatedAt()}
        </div>
      </div>
    </div>
  );
}

export function ContentList({ posts }) {
  return (
    <div className={styles["content-list-layout"]}>
      {posts.length > 0 ? (
        posts
          .filter((post) => post.postStatus === "Published")
          .map((post) => {
            return <ContentItem key={post.postId} post={post} />;
          })
      ) : (
        <div>No Blogs</div>
      )}
    </div>
  );
}
