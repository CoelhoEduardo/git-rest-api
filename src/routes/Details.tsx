import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { RepositoriesProps } from "../types/repositorie";
import { Loader } from "../components/Loader/Loader";
import classes from "./Routes.module.css";
import { RepoCard } from "../components/RepoCard/RepoCard";

export const Details = () => {
  const { owner, repo } = useParams();
  const [repoDetails, setRepoDetails] = useState<RepositoriesProps | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadDetails = async function (owner: string, repo: string) {
      setIsLoading(true);
      const headers = {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer${import.meta.env.API_TOKEN}`,
      };
      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers,
      });
      const data = await res.json();
      setIsLoading(false);

      setRepoDetails(data);
    };

    if (owner && repo) {
      loadDetails(owner, repo);
    }
  }, []);

  if (!repoDetails && isLoading) return <Loader />;
  return (
    <div className={classes.page}>
      <h2>Detalhes do Repósitório</h2>
      <RepoCard
        id={repoDetails?.id}
        name={repoDetails?.name!}
        login={repoDetails?.owner.login!}
        description={repoDetails?.description!}
        language={repoDetails?.language}
        updated_at={repoDetails?.updated_at}
        hasFavorite
      />
    </div>
  );
};
