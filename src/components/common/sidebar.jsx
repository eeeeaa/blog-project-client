import styles from "../../styles/common/sidebar.module.css";
import PropTypes from "prop-types";
Sidebar.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
};
SidebarPostItem.propTypes = {
  post: PropTypes.object,
};

function SidebarPostItem({ post }) {
  return (
    <div className={styles["sidebar-post-item"]}>
      <div className={styles["sidebar-post-item-title"]}>
        title: {post.title}
      </div>
      <div className={styles["sidebar-post-item-date"]}>
        updated: {post.prettifyUpdatedAt()}
      </div>
    </div>
  );
}
export function Sidebar({ posts }) {
  return (
    <div className={styles["sidebar-layout"]}>
      {posts.length > 0 ? (
        posts
          .slice(0, 4)
          .filter((post) => post.postStatus === "Published")
          .map((post) => {
            return <SidebarPostItem key={post.postId} post={post} />;
          })
      ) : (
        <div>No Blogs</div>
      )}
    </div>
  );
}
