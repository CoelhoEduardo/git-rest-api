import { useEffect, useState } from "react";
import { FavoriteProps } from "../../types/repositorie";
import classes from "./Favorites.module.css";
import { Link } from "react-router";
import { Card, UnfavoriteButton } from "../../components";

const FAVORITES_KEY = "favorite_repositories";

export const Favorites = () => {
  const [favorites, setFavorites] = useState<FavoriteProps[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleRemoveFavorite = (id: number) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  };

  return (
    <div className={classes.page}>
      <h2>Lista de favoritos</h2>
      {favorites.length === 0 && (
        <p>
          Não há nenhum repósitorio favoritado
        </p>
      )}
      {favorites?.map((repo) => (
        <Card
          fv_btn={
            <UnfavoriteButton onClick={() => handleRemoveFavorite(repo.id)} />
          }
          title={
            <Link to={`/detalhes/${repo.login}/${repo.name}`}>
              <h2>
                {repo.login}/{repo.name}
              </h2>
            </Link>
          }
          footer_element={
            <>
              <a
                href={`https://github.com/${repo.login}/${repo.name}`}
                target="_blank"
              >
                Ver Código
              </a>
            </>
          }
        />
      ))}
    </div>
  );
};
