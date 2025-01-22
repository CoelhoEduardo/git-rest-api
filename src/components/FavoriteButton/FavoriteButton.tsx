import { useEffect, useState } from "react";
import { RepositoriesProps } from "../../types/repository";

type FavoriteData = {
  id: number;
  name: string;
  login: string;
  addedAt?: number;
};

const FAVORITES_KEY = "favorite_repositories";

export const FavoriteButton = ({ ...repo }: RepositoriesProps) => {
  const [favorites, setFavorites] = useState<FavoriteData[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (storedFavorites) {
      const parsedFavorites: FavoriteData[] = JSON.parse(storedFavorites);

      const validFavorites = parsedFavorites.filter(
        (fav) => Date.now() - fav.addedAt! < 24 * 60 * 60 * 1000
      );

      setFavorites(validFavorites);

      localStorage.setItem(FAVORITES_KEY, JSON.stringify(validFavorites));
    }
  }, []);

  const toogleFavorite = () => {
    const isFavorited = favorites.some((fav) => fav.id === repo.id);

    if (isFavorited) {
      const updatedFavorites = favorites.filter((fav) => fav.id !== repo.id);
      setFavorites(updatedFavorites);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } else {
      const newFavorite: FavoriteData = {
        id: repo.id,
        name: repo.name,
        login: repo.owner.login,
        addedAt: Date.now(),
      };

      const updataedFavorites = [...favorites, newFavorite];
      setFavorites(updataedFavorites);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updataedFavorites));
    }
  };

  const isFavorited = favorites.some((fav) => fav.id === repo.id);
  return (
    <button style={{ backgroundColor: "red" }} onClick={toogleFavorite}>
      {isFavorited ? "Unfavorite" : "Favorite"}
    </button>
  );
};
