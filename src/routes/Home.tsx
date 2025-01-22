import { useState } from "react";
import { Search } from "../components/Search/Search";
import { RepositoriesListProps } from "../types/repositorie";
import { RepoCard } from "../components/RepoCard/RepoCard";
import { Error } from "../components/Error";
import { Loader } from "../components/Loader/Loader";

export const Home = () => {
  const [repos, setRepos] = useState<RepositoriesListProps | null>();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const searchRepos = async (repoName: string) => {
    setRepos(null);
    setIsLoading(true);

    const res = await fetch(
      `https://api.github.com/search/repositories?q=${repoName}`
    );

    const data = await res.json();

    setIsLoading(false);

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

    setError(false);
  };

  return (
    <>
      <Search searchRepos={searchRepos} />
      {isLoading && <Loader />}
      {repos && (
        <div>
          {repos.items?.map((repo) => (
            <RepoCard
              key={repo.id}
              name={repo.name}
              login={repo.owner.login}
              description={repo.description}
            />
          ))}
        </div>
      )}
      {error && (
        <Error
          error={`Repositórios não encontrado: ${repos?.total_count} resultados`}
        />
      )}
    </>
  );
};
