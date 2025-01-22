import { Outlet } from "react-router";
import { NavBar } from "./components/NavBar/NavBar";
import classes from "./App.module.css";

function App() {
  return (
    <div className={classes.app}>
        <NavBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
