import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import styles from "./post.module.css";

export default function Post({_id, title, summary, cover, content, createdAt, author }) {

  return (
    <div className={styles.post}>
      <div className={styles.image}>
        <Link to={`/post/${_id}`}>
          <img src={'https://blog-site-xcj0.onrender.com/' + cover } alt=""/>
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