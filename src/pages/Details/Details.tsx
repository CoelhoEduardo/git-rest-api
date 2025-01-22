import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ContributorsProps, RepositoriesProps } from "../../types";
import classes from "./Details.module.css";
import { formatDate } from "../../utils";
import { Loader, Card, FavoriteButton } from "../../components";

export const Details = () => {
  const { owner, repo } = useParams();
  const [repoDetails, setRepoDetails] = useState<RepositoriesProps | null>(
    null
  );
  const [contributors, setContributors] = useState<ContributorsProps[] | null>(
    null
  );

  const [isLoading, setIsLoading] = useState(false);

  const loadDetails = async function (owner: string, repo: string) {
    setIsLoading(true);
    const headers = {
      Accept: "application/vnd.github+json",
    };
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers,
    });
    const data = await res.json();
    setIsLoading(false);

    setRepoDetails(data);
  };

  const loadContributors = async function (owner: string, repo: string) {
    const headers = {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer${import.meta.env.API_TOKEN}`,
    };
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contributors`,
      {
        headers,
      }
    );
    const data = await res.json();

    setContributors(data);
  };

  useEffect(() => {
    if (owner && repo) {
      loadDetails(owner, repo);
      loadContributors(owner, repo);
    }
  }, []);

  if (!repoDetails && isLoading) return <Loader />;
  return (
    <div className={classes.page}>
      <h2>Detalhes do Repósitório</h2>
      <Card
        title={repoDetails?.name}
        fv_btn={
          <FavoriteButton
            id={repoDetails?.id!}
            name={repoDetails?.name!}
            login={repoDetails?.owner.login!}
          />
        }
        subtitle={`Criador: ${repoDetails?.owner.login}`}
        card_body={<p>{repoDetails?.description}</p>}
        footer_element={
          <>
            <p>{`Linguagem: ${repoDetails?.language}`}</p>
            <p>{formatDate(repoDetails?.updated_at)}</p>
          </>
        }
        hasContributors
        contributors={
          <div className={classes.contributors}>
            {contributors?.map((contributor) => (
              <a href={contributor?.html_url} target="_blank">
                <img src={contributor?.avatar_url} alt="contributors-avatar" />
              </a>
            ))}
          </div>
        }
      />
    </div>
  );
};
