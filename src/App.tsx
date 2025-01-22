import { Outlet } from "react-router";
import "./App.css";
import SideBar from "./components/sidebar/sidebar";

function App() {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
}

export default App;
