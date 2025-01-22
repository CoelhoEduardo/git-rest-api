import { useEffect, useState } from "react";
import { RepoCard } from "../components/RepoCard/RepoCard";
import { FavoriteProps } from "../types/repositorie";
import classes from "./Routes.module.css";

const FAVORITES_KEY = "favorite_repositories";

export const Favorites = () => {
  const [favorites, setFavorites] = useState<FavoriteProps[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  return (
    <div className={classes.page}>
      <h2>Favoritos</h2>
      {favorites.length === 0 && <p>Não há nenhum repósitorio favoritado</p>}
      {favorites?.map((repo) => (
        <RepoCard key={repo.id} name={repo.name} login={repo.login} />
      ))}
    </div>
  );
};
