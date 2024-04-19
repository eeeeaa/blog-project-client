import { ContentList } from "../common/contentList";
import { PostContext } from "../../utils/contextProvider";
import { useContext } from "react";

export function Home() {
  const { posts } = useContext(PostContext);
  return <ContentList posts={posts} />;
}
