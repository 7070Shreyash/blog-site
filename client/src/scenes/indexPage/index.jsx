import Post from "../../components/post";
import {useEffect, useState} from "react";
import { REACT_APP_BASE_URL } from "../../components/helper";
export default function IndexPage() {
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    try {
    fetch(REACT_APP_BASE_URL + `post`).then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  } catch(err) {
    console.log(`Error occured ${err}`);
  }
  }, []);
  return (
    <>
      {posts.length > 0 && posts.map(post => (
        <Post {...post} />
      ))}
    </>
  );
}