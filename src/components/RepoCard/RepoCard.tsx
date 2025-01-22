import { Link } from "react-router";
import { RepoCardProps } from "../../types/repositorie";
import classes from "./RepoCard.module.css";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";
import { formatDate } from "../../utils";

export const RepoCard = ({
  id,
  name,
  description,
  login,
  hasFavorite,
  language,
  updated_at,
}: RepoCardProps) => {
  return (
    <div className={classes.card}>
      <div className={classes.card_header}>
        {!hasFavorite ? (
          <Link to={`/detalhes/${login}/${name}`}>
            <h2>
              {login}/{name}
            </h2>
          </Link>
        ) : (
          <>
            <h3>{name}</h3>
            <div className={classes.fv_button}>
              <FavoriteButton id={id!} name={name} login={login} />
            </div>
          </>
        )}
      </div>
      {hasFavorite && <p>Dono: {login}</p>}
      {description && <p>{description}</p>}
      {(language || updated_at) && (
        <div className={classes.card_footer}>
          <p>{language}</p>
          <p>{formatDate(updated_at)}</p>
        </div>
      )}
    </div>
  );
};
