import { Outlet }  from "react-router-dom";
import Header from "../header";
import  "./layout.module.css";

export default function Layout() {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
}