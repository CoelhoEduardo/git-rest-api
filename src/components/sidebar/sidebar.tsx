import "./sidenav.css";
import NavLinks from "./navlinks";

export default function SideBar() {
  return (
    <div className="nav-position">
      <div className="side-container">
        <nav className="side-items">
          <NavLinks />
        </nav>
      </div>
    </div>
  );
}
