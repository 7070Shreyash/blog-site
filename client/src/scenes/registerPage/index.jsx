import {useState} from "react";
import styles from "./registerPage.module.css";
import { Navigate } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect , setRedirect] = useState(false);

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch('https://blog-site-xcj0.onrender.com/register', {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if(redirect) {
    return <Navigate to = {'/login'}/>
  }

  return (

    <form className={styles.register} onSubmit={register}>
      <h1 className={styles.heading} >Register</h1>
      <input type="text"
             placeholder="username"
             value={username}
             onChange={ev => setUsername(ev.target.value)}/>
      <input type="password"
             placeholder="password"
             value={password}
             onChange={ev => setPassword(ev.target.value)}/>
      <button >Register</button>
    </form>
  );
}