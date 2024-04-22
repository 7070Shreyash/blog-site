import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import Editor from "../../components/editor";
import styles from "./editPost.module.css";
import { useSelector } from "react-redux";

export default function EditPost() {
  const { id } = useParams();
  const [ title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect,setRedirect] = useState(false);
  const token = useSelector((state) => state.token);

  useEffect(() => {
      try {
        fetch(process.env.REACT_APP_BASE_URL + `post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
        });
      });
      } catch(err) {
        console.log(`Error occured ${err}`)
      }
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }
    try {
      await fetch(process.env.REACT_APP_BASE_URL + `post`, {
      method: 'PUT',
      body: data,
      credentials: 'include',
      headers: { Authorization: `${token}` },
    });
    setRedirect(true)
    } catch(err) {
      console.log(`Error occured ${err}`);
    }
  }
  
  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <form onSubmit={updatePost}>
      <input type="title"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} />
      <input type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} />
      <input type="file"
             onChange={ev => setFiles(ev.target.files)} />
      <Editor onChange={setContent} value={content} />
      <button className={styles.button} style={{marginTop:'5px'}}>Update post</button>
    </form>
  );
}