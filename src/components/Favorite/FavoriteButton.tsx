import { useEffect, useState } from "react";
import { FavoriteProps } from "../../types/repositorie";
import { BsStar, BsStarFill } from "react-icons/bs";
import classes from "./FavoriteBtn.module.css";
import { IconContext } from "react-icons";

const FAVORITES_KEY = "favorite_repositories";

export const FavoriteButton = ({ id, name, login }: FavoriteProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      setIsFavorited(favorites.some((fav: any) => fav.id === id));
    }
  }, [id]);

  const toogleFavorite = () => {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

    if (isFavorited) {
      favorites = favorites.filter((fav: any) => fav.id !== id);
    } else {
      favorites.push({ id, name, login });
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    setIsFavorited(!isFavorited);
  };

  return (
    <div className={classes.fv_btn}>
      <button onClick={toogleFavorite}>
        <IconContext.Provider
          value={{ size: "20px", color: isFavorited ? "gold" : "gray" }}
        >
          <div>{isFavorited ? <BsStarFill /> : <BsStar />}</div>
        </IconContext.Provider>
      </button>
    </div>
  );
};
