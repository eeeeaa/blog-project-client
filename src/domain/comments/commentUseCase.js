import { useState } from "react";
import { useEffect } from "react";
import { Comment } from "../../model/commentUiModel";
import { Post } from "../../model/postUiModel";

const postUri = `${import.meta.env.VITE_BLOG_API_URL}/posts`;

export const useGetComments = (postId, token = "") => {
  const [post, setPost] = useState({});
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
      .then((response) => {
        setComments(
          response.comments.map((val) => {
            return new Comment(val._id, val.comment, val.created_at, val.post);
          })
        );
        setPost(
          new Post(
            response.post._id,
            response.post.post_title,
            response.post.post_content,
            response.post.created_at,
            response.post.updated_at,
            response.post.post_status
          )
        );
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [postId, token]);

  return { post, comments, error, loading };
};

//TODO create, update, delete comment
