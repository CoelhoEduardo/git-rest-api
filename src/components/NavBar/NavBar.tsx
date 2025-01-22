import classes from "./NavBar.module.css";
import { NavLink } from "react-router";

const NavRouters = () => {
  const routers = [
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
  return (
    <>
      {routers.map((router) => (
        <NavLink
          key={router.name}
          to={router.path}
          className={classes.nav_link}
        >
          <p>{router.name}</p>
        </NavLink>
      ))}
    </>
  );
};

export const NavBar = () => {
  return (
    <nav className={classes.nav}>
      <NavRouters />
    </nav>
  );
};
