import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./common/navbar";
import styles from "../styles/App.module.css";
import { PostContext } from "../utils/contextProvider";

import { Home } from "./routes/home";
import { PostDetailPage } from "./routes/postDetail";
import ErrorPage from "./routes/error";

import { useGetPosts } from "../domain/posts/postUseCase";
import { Sidebar } from "./common/sidebar";
import LoadingPage from "./common/loadingPage";

function Content() {
  const { posts, error, loading } = useGetPosts("");

  if (error) return <ErrorPage errorMsg={error.message} />;

  if (loading) return <LoadingPage />;

  return (
    <PostContext.Provider value={{ posts }}>
      <div className={styles.content}>
        <div className={styles["home-layout"]}>
          <div className={styles["content-layout"]}>
            <Outlet />
          </div>
          <Sidebar posts={posts} />
        </div>
      </div>
    </PostContext.Provider>
  );
}

function Root() {
  return (
    <div>
      <Navbar />
      <Content />
    </div>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/post/:postId",
          element: <PostDetailPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
