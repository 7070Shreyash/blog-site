import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import styles from "./post.module.css";
import { REACT_APP_BASE_URL } from "../helper";
export default function Post({_id, title, summary, cover, content, createdAt, author }) {

  return (
    <div className={styles.post}>
      <div className={styles.image}>
        <Link to={`/post/${_id}`}>
        <img src={REACT_APP_BASE_URL + `${cover}`} alt=""/>
        </Link>
      </div>
      <div className={styles.texts}>
        <Link to={`/post/${_id}`}>
        <h2 className={styles.heading} >{title}</h2>
        </Link>
        <p className={styles.info}>
          <a className={styles.author}>{author.username}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className={styles.summary}>{summary}</p>
      </div>
    </div>
  );
}