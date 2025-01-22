import { useEffect, useState } from "react";
import { RepositoriesProps } from "../../types/repositorie";
import { Link } from "react-router";
import classes from "./MyRepos.module.css";
import { Loader, Card } from "../../components";

export const MyRepos = () => {
  const [repos, setRepos] = useState<RepositoriesProps[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setRepos(null);
    setIsLoading(true);
    const headers = {
      Accept: "application/vnd.github+json",
    };
    fetch("https://api.github.com/users/CoelhoEduardo/repos", { headers })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false), setRepos(data);
      });
  }, []);

  return (
    <div className={classes.page}>
      <h2>Meus Repositórios</h2>
      <div className={classes.loader}>{isLoading && <Loader />}</div>
      {repos?.map((repo) => (
        <div className={classes.card_grid}>
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
        </div>
      ))}
    </div>
  );
};
