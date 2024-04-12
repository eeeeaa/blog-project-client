import styles from "../../styles/common/contentList.module.css";
import { Post } from "../../model/postUiModel";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../utils/contextProvider";
import { useGetPosts } from "../../domain/posts/postUseCase";

import ErrorPage from "../routes/error";
import LoadingPage from "./loadingPage";
/**
 *
 * @param {Array<Post>} posts
 * @returns
 */
export function ContentList() {
  const { cookie } = useContext(AppContext);
  const { posts, error, loading } = useGetPosts();
  if (error) return <ErrorPage errorMsg={error.message} />;

  if (loading) return <LoadingPage />;
  return (
    <div className={styles["content-list-layout"]}>
      {posts.length > 0 ? (
        posts.map((post) => {
          return <div key={post.postId}>${post.title}</div>;
        })
      ) : (
        <div>No Blogs</div>
      )}
    </div>
  );
}
