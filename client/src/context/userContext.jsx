import {createContext, useState} from "react";
import { useEffect } from "react";
export const UserContext = createContext();

export function UserContextProvider({children}) {
  const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
}