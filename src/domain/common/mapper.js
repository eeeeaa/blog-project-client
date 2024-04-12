import { Post } from "../../model/postUiModel";
import { Comment } from "../../model/commentUiModel";

/**
 *
 * @param {Post} postModel
 * @returns
 */
export const postToJsonObjMapper = (postModel) => {
  //convert post ui model to request body (dont need to map id)
  return {
    post_title: postModel.title,
    post_content: postModel.content,
    created_at: postModel.createdAt,
    updated_at: postModel.updatedAt,
    post_status: postModel.postStatus,
  };
};

/**
 *
 * @param {Comment} commentModel
 * @returns
 */
export const commentToJsonObjMapper = (commentModel) => {
  //convert comment ui model to request body (dont need to map id)
  return {
    comment: commentModel.comment,
    created_at: commentModel.createdAt,
    post: commentModel.postId,
  };
};
