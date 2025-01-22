import { NavLink } from "react-router";
import "./sidenav.css";

const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Repositórios Públicos",
    path: "/repositorios-publicos",
  },
  {
    name: "Meus repositórios",
    path: "/meus-repositorios",
  },
  {
    name: "Favoritos",
    path: "/favoritos",
  },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => (
        <NavLink key={link.name} to={link.path} className="nav-link">
          <p>{link.name}</p>
        </NavLink>
      ))}
    </>
  );
}
