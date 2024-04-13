import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./common/navbar";
import styles from "../styles/App.module.css";
import { AppContext } from "../utils/contextProvider";

import { Home } from "./routes/home";
import { Login } from "./routes/login";
import ErrorPage from "./routes/error";

function Root() {
  const [cookies, setCookie] = useCookies(["token"]);

  const [userProfile, setUserProfile] = useState({});
  return (
    <AppContext.Provider
      value={{
        userProfile,
        setUserProfile,
        cookies,
        setCookie,
      }}
    >
      <Navbar />
      <div className={styles.content}>
        <Outlet />
      </div>
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
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
