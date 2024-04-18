import { useContext, useState } from "react";
import { AppContext } from "../../utils/contextProvider";
import {
  useGetComments,
  createComment,
} from "../../domain/comments/commentUseCase";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/routes/postDetail.module.css";
import PropTypes from "prop-types";
import { Comment } from "../../model/commentUiModel";

import ErrorPage from "./error";
import LoadingPage from "../common/loadingPage";

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

function CommentList({ comments, expand }) {
  if (!expand) {
    return;
  }
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

function CreateCommentForm({ postId }) {
  const navigate = useNavigate();
  const { cookies } = useContext(AppContext);
  const [comment, setComment] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //Create comment
      await createComment(
        postId,
        new Comment(null, comment, null, null, postId),
        cookies === undefined ? "" : cookies.token
      );
      navigate(0);
    } catch (error) {
      navigate("/error");
    }
  };
  return (
    <form method="post" onSubmit={handleSubmit}>
      <div className={styles["comment-form-layout"]}>
        <div className={styles["comment-form-input"]}>
          <label htmlFor="comment">
            <p>Comment</p>
          </label>
          <textarea
            className={styles["comment-text-field"]}
            id="comment"
            name="comment"
            type="text"
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <div>
          <button className={styles["comment-form-button"]} type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

function PostContent({ post, comments }) {
  const [expandComment, setExpandComment] = useState(false);
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
      <CreateCommentForm postId={post.postId} />
      <button
        type="button"
        className={styles["collapsible"]}
        onClick={() => {
          setExpandComment(!expandComment);
        }}
      >
        Show Comments
      </button>
      <CommentList comments={comments} expand={expandComment} />
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
