import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./common/navBar";
import styles from "../styles/App.module.css";
import {
  NavContext,
  UserContext,
  DispatchUserContext,
} from "../utils/contextProvider";

function App() {
  const [userProfile, setUserProfile] = useState(null);

  const navigate = useNavigate();

  const handleNavigation = (pageIndex) => {
    switch (pageIndex) {
      case 0: {
        navigate("/");
        break;
      }
      case 1: {
        navigate("/login");
        break;
      }
    }
  };

  return (
    <>
      <UserContext.Provider value={userProfile}>
        <DispatchUserContext.Provider value={setUserProfile}>
          <NavContext.Provider value={handleNavigation}>
            <NavBar />
          </NavContext.Provider>
          <div className={styles.content}>hello world</div>
        </DispatchUserContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
