import { RepositoriesProps } from "../../types/repository";
import classes from "./RepoCard.module.css";

export const RepoCard = ({ name, description, owner }: RepositoriesProps) => {
  return (
    <div className={classes.repo_card}>
      <h2>
        {owner.login}/{name}
      </h2>
      {description && <p>{description}</p>}
    </div>
  );
};
