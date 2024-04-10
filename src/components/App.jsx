import { useState, useEffect } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./common/navbar";
import styles from "../styles/App.module.css";
import { UserContext, DispatchUserContext } from "../utils/contextProvider";

import { Home } from "./routes/home";

function Root(userProfile, setUserProfile) {
  return (
    <UserContext.Provider value={userProfile}>
      <DispatchUserContext.Provider value={setUserProfile}>
        <Navbar />
        <div className={styles.content}>
          <Outlet />
        </div>
      </DispatchUserContext.Provider>
    </UserContext.Provider>
  );
}

function App() {
  const [userProfile, setUserProfile] = useState(null);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Root userProfile={userProfile} setUserProfile={setUserProfile} />
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/login",
          element: <div>login</div>,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
