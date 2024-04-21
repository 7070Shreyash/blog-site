import Post from "../../components/post";
import {useEffect, useState} from "react";

export default function IndexPage() {
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    try {
    fetch('https://blog-site-xcj0.onrender.com/post').then(response => {
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