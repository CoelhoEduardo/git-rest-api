import { useState } from "react";
import { RepositoriesListProps } from "../../types/repositorie";
import { Link } from "react-router";
import classes from "./Home.module.css";
import { Search, Loader, Card, Error } from "../../components";

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
    <div className={classes.page}>
      <Search searchRepos={searchRepos} />

      <div>
        {isLoading && <Loader />}
        {repos?.items?.map((repo) => (
          <Card
            key={repo.id}
            title={
              <Link to={`/detalhes/${repo.owner.login}/${repo.name}`}>
                <h2>
                  {repo.owner.login}/{repo.name}
                </h2>
              </Link>
            }
            card_body={<p>{repo.description}</p>}
          />
        ))}
      </div>
      {error && (
        <Error
          error={`Repositórios não encontrado: ${repos?.total_count} resultados`}
        />
      )}
    </div>
  );
};
