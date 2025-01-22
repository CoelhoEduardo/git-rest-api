import { FaSpinner } from "react-icons/fa";
import classes from "./Loader.module.css";

export const Loader = () => {
  return (
    <>
      <FaSpinner className={classes.loader} />
    </>
  );
};
