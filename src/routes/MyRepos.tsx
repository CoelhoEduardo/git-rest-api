import { useEffect, useState } from "react";
import { RepositoriesProps } from "../types/repositorie";
import { RepoCard } from "../components/RepoCard/RepoCard";
import { Loader } from "../components/Loader/Loader";

export const MyRepos = () => {
  const [repos, setRepos] = useState<RepositoriesProps[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setRepos(null);
    setIsLoading(true);
    const headers = {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer${import.meta.env.API_TOKEN}`,
    };
    fetch("https://api.github.com/users/CoelhoEduardo/repos", { headers })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false), setRepos(data);
      });
  }, []);

  return (
    <>
      <div>
        {isLoading && <Loader />}
        {repos?.map((repo) => (
          <RepoCard
            key={repo.id}
            name={repo.name}
            login={repo.owner.login}
            description={repo.description}
          />
        ))}
      </div>
    </>
  );
};
