import { useState} from "react";
import {Navigate} from "react-router-dom";
import styles from "./loginPage.module.css";
import { useDispatch } from "react-redux";
import { setUser , setToken } from "../../state";
import { REACT_APP_BASE_URL } from "../../components/helper";
export default function LoginPage() {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const dispatch = useDispatch()
  
  async function login(ev) {
      ev.preventDefault();
      try {
      const response = await fetch(REACT_APP_BASE_URL + `login`, {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
    });
      if(response.ok) {
        const data = await response.json()
        const { user , token } = data;
        dispatch(setUser({user}));
        dispatch(setToken({token}));
      }
      } catch(err) {
        console.log(`$ Error occured ${err}`)
      }
      setRedirect(true)
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <form className={styles.login} onSubmit={login}>
      <h1 className={styles.heading} >Login</h1>
      <input type="text"
             placeholder="username"
             value={username}
             onChange={ev => setUsername(ev.target.value)}/>
      <input type="password"
             placeholder="password"
             value={password}
             onChange={ev => setPassword(ev.target.value)}/>
      <button >Login</button>
    </form>
  );
}