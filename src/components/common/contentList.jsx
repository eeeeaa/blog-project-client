import styles from "../../styles/common/contentList.module.css";
import { Post } from "../../model/postUiModel";
import LinesEllipsis from "react-lines-ellipsis";
import PropTypes from "prop-types";

ContentList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.objectOf(Post)),
};
ContentItem.propTypes = {
  post: PropTypes.objectOf(Post),
};

function ContentItem({ post }) {
  return (
    <div className={styles["content-item"]}>
      <h1 className={styles["content-item-header"]}>{post.title}</h1>
      <div className={styles["divider"]} />
      <div className={styles["content-item-content"]}>
        <LinesEllipsis
          text={post.content}
          maxLine="3"
          ellipsis="..."
          trimRight
          basedOn="letters"
        />
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
          .slice(0, 4)
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
