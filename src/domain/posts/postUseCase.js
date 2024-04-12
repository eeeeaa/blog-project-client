import {
  useDataGet,
  useDataPost,
  useDataPut,
  useDataDelete,
} from "../common/urlFetcher";
import { postToJsonObjMapper } from "../common/mapper";
import { useState } from "react";
import { Post } from "../../model/postUiModel";

const postUri = `${import.meta.env.VITE_BLOG_API_URL}/posts`;

export const useGetPosts = () => {
  const { data, error, loading } = useDataGet(postUri);

  //map response
  const [posts, setPosts] = useState([]);
  if (data) {
    setPosts(
      data.posts.map((val) => {
        return new Post(
          val._id,
          val.post_title,
          val.post_content,
          val.created_at,
          val.updated_at,
          val.post_status
        );
      })
    );
  }

  return { posts, error, loading };
};

export const useGetOnePost = (postId) => {
  const { data, error, loading } = useDataGet(`${postUri}/${postId}`);

  //map response
  const [post, setPost] = useState(null);
  if (data) {
    setPost(
      new Post(
        data.post._id,
        data.post.post_title,
        data.post.post_content,
        data.post.created_at,
        data.post.updated_at,
        data.post.post_status
      )
    );
  }

  return { post, error, loading };
};

export const useCreatePost = (postModel) => {
  const jsonObj = postToJsonObjMapper(postModel);
  const { data, error, loading } = useDataPost(postUri, jsonObj);

  //map response
  const [post, setPost] = useState(null);
  if (data) {
    setPost(
      new Post(
        data.post._id,
        data.post.post_title,
        data.post.post_content,
        data.post.created_at,
        data.post.updated_at,
        data.post.post_status
      )
    );
  }

  return { post, error, loading };
};

export const useUpdatePost = (postId, postModel) => {
  const jsonObj = postToJsonObjMapper(postModel);
  const { data, error, loading } = useDataPut(`${postUri}/${postId}`, jsonObj);

  //map response
  const [post, setPost] = useState(null);
  if (data) {
    setPost(
      new Post(
        data.updatedPost._id,
        data.updatedPost.post_title,
        data.updatedPost.post_content,
        data.updatedPost.created_at,
        data.updatedPost.updated_at,
        data.updatedPost.post_status
      )
    );
  }

  return { post, error, loading };
};

export const useDeletePost = (postId) => {
  const { data, error, loading } = useDataDelete(`${postUri}/${postId}`);

  //map response
  const [post, setPost] = useState(null);
  if (data) {
    setPost(
      new Post(
        data.deletedPost._id,
        data.deletedPost.post_title,
        data.deletedPost.post_content,
        data.deletedPost.created_at,
        data.deletedPost.updated_at,
        data.deletedPost.post_status
      )
    );
  }

  return { post, error, loading };
};
