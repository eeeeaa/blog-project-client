import styles from "../../styles/routes/home.module.css";
import { ContentList } from "../common/contentList";
import { Sidebar } from "../common/sidebar";
import { AppContext } from "../../utils/contextProvider";
import { useContext } from "react";
import { useGetPosts } from "../../domain/posts/postUseCase";
import ErrorPage from "./error";
import LoadingPage from "../common/loadingPage";

export function Home() {
  const { cookie } = useContext(AppContext);
  const { posts, error, loading } = useGetPosts(
    cookie === undefined ? "" : cookie.token
  );

  if (error) return <ErrorPage errorMsg={error.message} />;

  if (loading) return <LoadingPage />;

  return (
    <div className={styles["home-layout"]}>
      <ContentList posts={posts} />
      <Sidebar posts={posts} />
    </div>
  );
}
