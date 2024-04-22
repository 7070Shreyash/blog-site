import {useState} from "react";
import styles from "./registerPage.module.css";
import { Navigate } from "react-router-dom";
import { REACT_APP_BASE_URL } from "../../components/helper";
export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect , setRedirect] = useState(false);

  async function register(ev) {
    ev.preventDefault();
    try {const response = await fetch(REACT_APP_BASE_URL + `register`, {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},
    });
    if (response.ok) {
      setRedirect(true);
    }} catch(err) {
      console.log(`Error occured ${err}`);
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