import { ContentList } from "../common/contentList";
import { AppContext } from "../../utils/contextProvider";
import { useContext } from "react";

export function Home() {
  const { posts } = useContext(AppContext);
  return <ContentList posts={posts} />;
}
