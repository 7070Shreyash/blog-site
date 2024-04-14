import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import { UserContext } from "../../context/userContext";
import styles from "./header.module.css";

export default function Header() {
  const { user , setUser } = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(user => {
        setUser(user);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUser(null);
  }

  const username = user?.username;
  return (
    <header>
      <Link to="/" className={styles.logo}>MyBlog</Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a className={styles.link} onClick={logout}> Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login"> Login </Link>
            <Link to="/register"> Register </Link>
          </>
        )}
      </nav>
    </header>
  );
}