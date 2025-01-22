import { useState } from "react";
import { BsSearch } from "react-icons/bs";

type SearchProps = {
  searchRepos: (repoName: string) => Promise<void>;
};
export const Search = ({ searchRepos }: SearchProps) => {
  const [repoName, setRepoName] = useState("");
  return (
    <div>
      <h2>Busque por repositórios</h2>
      <div>
        <input
          type="text"
          placeholder="Buscar"
          onChange={(e) => setRepoName(e.target.value)}
        />
        <button onClick={() => searchRepos(repoName)}>
          <BsSearch />
        </button>
      </div>
    </div>
  );
};
