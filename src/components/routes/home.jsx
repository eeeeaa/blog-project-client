import { useEffect } from "react";
import styles from "../../styles/routes/home.module.css";
import { ContentList } from "../common/contentList";
import { Sidebar } from "../common/sidebar";
export function Home() {
  return (
    <div className={styles["home-layout"]}>
      <ContentList />
      <Sidebar />
    </div>
  );
}
