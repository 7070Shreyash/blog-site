import {Link} from "react-router-dom";
import styles from "./header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../state";

export default function Header() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  
  function logout() {
      dispatch(setUser({user : null}))
      dispatch(setToken({token : null}))
  }

  return (
    <header>
      <Link to="/" className={styles.logo}>MyBlog</Link>
      <nav className = {styles.nav} >
        {user && (
          <>
            <Link to="/create">Create new post</Link>
            <a className={styles.link} onClick={logout}> Logout ({user.username})</a>
          </>
        )}
        {!user && (
          <>
            <Link to="/login"> Login </Link>
            <Link to="/register"> Register </Link>
          </>
        )}
      </nav>
    </header>
  );
}