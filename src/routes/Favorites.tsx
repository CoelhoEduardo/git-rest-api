import { useEffect, useState } from "react";
import { RepoCard } from "../components/RepoCard/RepoCard";

const FAVORITES_KEY = "favorite_repositories";

type FavoriteData = {
  id: number;
  login: string;
  name: string;
};

export const Favorites = () => {
  const [favorites, setFavorites] = useState<FavoriteData[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  return (
    <div>
      <p>Aqui os favoritos</p>
      {favorites?.map((repo) => (
        <RepoCard
          key={repo.id}
          id={repo.id}
          name={repo.name}
          owner={repo.owner}
        />
      ))}
    </div>
  );
};
