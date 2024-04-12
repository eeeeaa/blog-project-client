import { useState } from "react";
import { useEffect } from "react";
import { Comment } from "../../model/commentUiModel";

const postUri = `${import.meta.env.VITE_BLOG_API_URL}/posts`;

export const useGetComments = (postId, token = "") => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    fetch(`${postUri}/${postId}/comments`, {
      method: "GET",
      mode: "cors",
      headers: headers,
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) =>
        setComments(
          response.comments.map((val) => {
            return new Comment(val._id, val.comment, val.created_at, val.post);
          })
        )
      )
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [postId, token]);

  return { comments, error, loading };
};

export const useGetOneComments = (postId, commentId, token = "") => {
  const [comment, setComment] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    fetch(`${postUri}/${postId}/${commentId}`, {
      method: "GET",
      mode: "cors",
      headers: headers,
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) =>
        setComment(
          new Comment(
            response.comment._id,
            response.comment.comment,
            response.comment.created_at,
            response.comment.post
          )
        )
      )
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [commentId, postId, token]);

  return { comment, error, loading };
};

//TODO create, update, delete comment
