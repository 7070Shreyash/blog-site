import 'react-quill/dist/quill.snow.css';
import {useState} from "react";
import {Navigate} from "react-router-dom";
import styles from "./createPost.module.css";
import Editor from "../../components/editor";
import { useSelector } from 'react-redux';
import { REACT_APP_BASE_URL } from '../../components/helper';
export default function CreatePost() {
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  const token = useSelector((state) => state.token);
  
  async function createNewPost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    ev.preventDefault();
    try {
       await fetch(REACT_APP_BASE_URL +`post`, {
      method: 'POST',
      body: data,
      credentials: 'include',
      headers: { Authorization: `${token}`}
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
    <form onSubmit={createNewPost}>
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
      <Editor value={content} onChange={setContent} />
      <button className= {styles.button}  style={{marginTop:'5px'}}>Create post</button>
    </form>
  );
}