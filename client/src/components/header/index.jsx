import {Link} from "react-router-dom";
import {useContext} from "react";
import { UserContext } from "../../context/userContext";
import styles from "./header.module.css";

export default function Header() {
  const { user , setUser } = useContext(UserContext);
  
  function logout() {
      try {
        fetch('https://blog-site-xcj0.onrender.com/logout', {
      credentials: 'include',
      method: 'POST',
    });
      setUser(null);
      } catch(err) {
        console.log(`Error happened ${err}`);
      }
  }

  const username = user?.username;
  return (
    <header>
      <Link to="/" className={styles.logo}>MyBlog</Link>
      <nav className = {styles.nav} >
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