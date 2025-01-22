import { NavLink } from "react-router";
import { RepositoriesProps } from "../../types/repository";
import classes from "./RepoCard.module.css";

export const RepoCard = ({ name, description, owner }: RepositoriesProps) => {
  return (
    <div className={classes.repo_card}>
      <h2>
        <NavLink to={"/detalhes"}>{owner.login}/{name}</NavLink>
      </h2>
      {description && <p>{description}</p>}
    </div>
  );
};
