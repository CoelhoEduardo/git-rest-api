import { IconContext } from "react-icons";
import classes from "./FavoriteBtn.module.css";
import { BsStarFill } from "react-icons/bs";

export const UnfavoriteButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className={classes.fv_btn}>
      <button onClick={onClick}>
        <IconContext.Provider value={{ size: "20px" }}>
          <div>
            <BsStarFill />
          </div>
        </IconContext.Provider>
      </button>
    </div>
  );
};
