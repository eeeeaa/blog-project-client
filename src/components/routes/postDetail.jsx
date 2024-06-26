import { useState } from "react";
import {
  useGetComments,
  createComment,
} from "../../domain/comments/commentUseCase";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/routes/postDetail.module.css";
import PropTypes from "prop-types";
import { Comment } from "../../model/commentUiModel";
import { decode } from "html-entities";
import parse from "html-react-parser";

import ErrorPage from "./error";
import LoadingPage from "../common/loadingPage";

CommentItem.propTypes = {
  comment: PropTypes.object,
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  expand: PropTypes.bool,
};

CreateCommentForm.propTypes = {
  postId: PropTypes.number,
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

  const [comment, setComment] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //Create comment
      await createComment(
        postId,
        new Comment(null, comment, null, null, postId),
        ""
      );
      //TODO refresh component without reloading?
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
        <div className={styles["post-detail-content"]}>
          {parse(decode(post.content, { level: "html5" }))}
        </div>
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
  const { post, comments, error, loading } = useGetComments(postId, "");

  if (error) return <ErrorPage errorMsg={error.message} />;

  if (loading) return <LoadingPage />;

  return <PostContent post={post} comments={comments} />;
}
