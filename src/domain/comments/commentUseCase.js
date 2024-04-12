import {
  useDataGet,
  useDataPost,
  useDataPut,
  useDataDelete,
} from "../common/urlFetcher";
import { useState } from "react";
import { Comment } from "../../model/commentUiModel";

const postUri = `${import.meta.env.VITE_BLOG_API_URL}/posts`;

export const useGetComments = (postId) => {
  const { data, error, loading } = useDataGet(`${postUri}/${postId}/comments`);

  //map response
  const [comments, setComments] = useState([]);
  if (data) {
    setComments(
      data.comments.map((val) => {
        return new Comment(val._id, val.comment, val.created_at, val.post);
      })
    );
  }

  return { comments, error, loading };
};

export const useGetOneComments = (postId, commentId) => {
  const { data, error, loading } = useDataGet(
    `${postUri}/${postId}/${commentId}`
  );

  //map response
  const [comment, setComment] = useState(null);
  if (data) {
    setComment(
      new Comment(
        data.comment._id,
        data.comment.comment,
        data.comment.created_at,
        data.comment.post
      )
    );
  }

  return { comment, error, loading };
};

//TODO create, update, delete comment
