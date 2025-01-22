import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { RepositoriesProps } from "../types/repository";
import { Loader } from "../components/Loader/Loader";
import { formatDate } from "../utils";
import classes from "./Details.module.css";

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
    <div className={classes.details}>
      <h2>Detalhes do Repósitório</h2>
      <section className={classes.content}>
        <h3>{repoDetails?.name}</h3>
        <p>{repoDetails?.description}</p>
        <p>{repoDetails?.language}</p>
        <div className={classes.details_footer}>
          <p>{repoDetails?.owner.login}</p>
          <p>{formatDate(repoDetails?.updated_at)}</p>
        </div>
      </section>
    </div>
  );
};
