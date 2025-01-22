import { useState, KeyboardEvent } from "react";
import { BsSearch } from "react-icons/bs";
import classes from "./Search.module.css";

type SearchProps = {
  searchRepos: (repoName: string) => Promise<void>;
};
export const Search = ({ searchRepos }: SearchProps) => {
  const [repoName, setRepoName] = useState("");
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      searchRepos(repoName);
    }
  };
  return (
    <div className={classes.search}>
      <h2>Busque por repositórios:</h2>
      <p>Explore diversos repositórios</p>
      <div className={classes.search_container}>
        <input
          type="text"
          placeholder="Buscar"
          onChange={(e) => setRepoName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={() => searchRepos(repoName)}>
          <BsSearch />
        </button>
      </div>
    </div>
  );
};
