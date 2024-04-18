import { useState } from "react";
import { useCookies } from "react-cookie";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./common/navbar";
import styles from "../styles/App.module.css";
import { AppContext } from "../utils/contextProvider";
import { useContext } from "react";

import { Home } from "./routes/home";
import { Login } from "./routes/login";
import { PostDetailPage } from "./routes/postDetail";
import ErrorPage from "./routes/error";

import { useGetPosts } from "../domain/posts/postUseCase";
import { Sidebar } from "./common/sidebar";
import LoadingPage from "./common/loadingPage";

function Content() {
  const { posts } = useContext(AppContext);
  return (
    <div className={styles.content}>
      <div className={styles["home-layout"]}>
        <div className={styles["content-layout"]}>
          <Outlet />
        </div>
        <Sidebar posts={posts} />
      </div>
    </div>
  );
}

function Root() {
  const [cookies, setCookie] = useCookies(["token"]);
  const [userProfile, setUserProfile] = useState({});
  const { posts, error, loading } = useGetPosts(
    cookies === undefined ? "" : cookies.token
  );

  if (error) return <ErrorPage errorMsg={error.message} />;

  if (loading) return <LoadingPage />;

  return (
    <AppContext.Provider
      value={{
        userProfile,
        setUserProfile,
        cookies,
        setCookie,
        posts,
      }}
    >
      <Navbar />
      <Content />
    </AppContext.Provider>
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
          path: "/login",
          element: <Login />,
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
