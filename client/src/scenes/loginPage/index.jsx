import {useContext, useState} from "react";
import {Navigate} from "react-router-dom";
import { UserContext } from "../../context/userContext";
import styles from "./loginPage.module.css";

export default function LoginPage() {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const { user , setUser } = useContext(UserContext);
  
  async function login(ev) {
      ev.preventDefault();
      try {
      const response = await fetch('https://blog-site-xcj0.onrender.com/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
    });
      const data = await response.json()
      setUser(data)
      setRedirect(true)
      } catch(err) {
        console.log(`$ Error occured ${err}`)
      }
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