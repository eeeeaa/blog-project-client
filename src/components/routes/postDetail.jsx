import { useContext } from "react";
import { AppContext } from "../../utils/contextProvider";
import { useGetComments } from "../../domain/comments/commentUseCase";
import { useParams } from "react-router-dom";
import styles from "../../styles/routes/postDetail.module.css";
import PropTypes from "prop-types";

import ErrorPage from "./error";
import LoadingPage from "../common/loadingPage";
import LinesEllipsis from "react-lines-ellipsis";

CommentItem.propTypes = {
  comment: PropTypes.object,
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
};

PostContent.propTypes = {
  post: PropTypes.object,
  comments: PropTypes.arrayOf(PropTypes.object),
};

function CommentItem({ comment }) {
  return (
    <div className={styles["comment-item"]}>
      <div className={styles["comment-item-msg"]}>{comment.comment}</div>
      <div className={styles["comment-item-info"]}>
        ID: {comment.commentId}, Created At: {comment.prettifyCreatedAt()}
      </div>
    </div>
  );
}

function CommentList({ comments }) {
  return (
    <div className={styles["comment-list"]}>
      {comments.length > 0 ? (
        comments.map((comment) => {
          return <CommentItem key={comment.commentId} comment={comment} />;
        })
      ) : (
        <div>No Comments</div>
      )}
    </div>
  );
}

function PostContent({ post, comments }) {
  return (
    <div>
      <div className={styles["post-detail-layout"]}>
        <h1 className={styles["post-detail-header"]}>{post.title}</h1>
        <div className={styles["post-detail-content"]}>{post.content}</div>
        <div className={styles["post-detail-date-list"]}>
          <div className={styles["post-detail-date"]}>
            Created At: <br /> {post.prettifyCreatedAt()}
          </div>
          <div className={styles["post-detail-date"]}>
            Updated At: <br /> {post.prettifyUpdatedAt()}
          </div>
        </div>
      </div>
      <hr className={styles["divider"]} />
      <CommentList comments={comments} />
    </div>
  );
}

export function PostDetailPage() {
  const { postId } = useParams();
  const { cookies } = useContext(AppContext);
  const { post, comments, error, loading } = useGetComments(
    postId,
    cookies === undefined ? "" : cookies.token
  );

  if (error) return <ErrorPage errorMsg={error.message} />;

  if (loading) return <LoadingPage />;

  return <PostContent post={post} comments={comments} />;
}
