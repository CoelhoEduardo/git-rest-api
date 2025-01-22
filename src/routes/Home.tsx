import { useState } from "react";
import { Search } from "../components/Search/Search";
import { RepositoriesListProps } from "../types/repository";
import { RepoCard } from "../components/RepoCard/RepoCard";
import { Error } from "../components/Error";

export const Home = () => {
  const [repos, setRepos] = useState<RepositoriesListProps | null>();
  const [error, setError] = useState(false);

  const searchRepos = async (repoName: string) => {
    const res = await fetch(
      `https://api.github.com/search/repositories?q=${repoName}`
    );

    const data = await res.json();

    const { items, total_count } = data;

    const repoData: RepositoriesListProps = {
      total_count,
      items,
    };

    setRepos(repoData);

    if (total_count === 0) {
      setError(true);
      return;
    }
  };

  return (
    <>
      <Search searchRepos={searchRepos} />
      {repos && (
        <div>
          {repos.items?.map((repo) => (
            <RepoCard {...repo} />
          ))}
        </div>
      )}
      {error && <Error error={`Repositórios não encontrado: ${repos?.total_count} resultados`} />}
    </>
  );
};
