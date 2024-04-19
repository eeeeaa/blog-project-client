import { useEffect, useState } from "react";
import { Post } from "../../model/postUiModel";

const postUri = `${import.meta.env.VITE_BLOG_API_URL}/posts`;

export const useGetPosts = (token = "", limit = 20) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    fetch(`${postUri}?limit=${limit}`, {
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
        setPosts(
          response.posts.map((val) => {
            return new Post(
              val._id,
              val.post_title,
              val.post_content,
              val.created_at,
              val.updated_at,
              val.post_status
            );
          })
        )
      )
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [token]);

  return { posts, error, loading };
};

export const useGetOnePost = (postId, token = "") => {
  const [post, setPost] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    fetch(`${postUri}/${postId}`, {
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
        setPost(
          new Post(
            response.post._id,
            response.post.post_title,
            response.post.post_content,
            response.post.created_at,
            response.post.updated_at,
            response.post.post_status
          )
        )
      )
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [postId, token]);

  return { post, error, loading };
};
