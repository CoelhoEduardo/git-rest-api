import { useEffect, useState } from "react";
import { RepositoriesProps } from "../types/repositorie";
import { RepoCard } from "../components/RepoCard/RepoCard";
import { Loader } from "../components/Loader/Loader";
import { Error } from "../components/Error";
import classes from "./Routes.module.css";

export const PublicRepos = () => {
  const [repos, setRepos] = useState<RepositoriesProps[] | null>();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [since, setSince] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 10;

  const loadRepos = async (sinceId: number) => {
    setIsLoading(true);
    setError(false);
    setRepos(null);

    const headers = {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer${import.meta.env.API_TOKEN}`,
    };

    try {
      const res = await fetch(
        `https://api.github.com/repositories?since=${sinceId}`,
        { headers }
      );

      if (res.status === 401 || res.status === 403) {
        setError(true);
        return;
      }

      const data = await res.json();

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      setRepos(data);

      if (data.length > 0) {
        setSince(data[data.length - 1].id);
      }
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRepos(0);
  }, []);

  const getCurrentPageRepos = () => {
    if (!repos) return [];
    const start = currentPage * ITEMS_PER_PAGE;
    return repos.slice(start, start + ITEMS_PER_PAGE);
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    } else {
      const previousSince = Math.max(0, since - 100);
      setSince(previousSince);
      loadRepos(previousSince);
      setCurrentPage(0);
    }
  };

  const handleNext = () => {
    if ((currentPage + 1) * ITEMS_PER_PAGE < (repos?.length || 0)) {
      setCurrentPage((prev) => prev + 1);
    } else {
      loadRepos(since);
      setCurrentPage(0);
    }
  };

  const currentRepos = getCurrentPageRepos();
  const showPrevious = currentPage > 0 || since > 0;
  const showNext =
    hasMore || (repos && (currentPage + 1) * ITEMS_PER_PAGE < repos.length);

  return (
    <div className={classes.page}>
      <h2>Navegue pelos repos públicos</h2>
      <div>
        {isLoading && <Loader />}
        {currentRepos.map((repo) => (
          <RepoCard
            key={repo.id}
            name={repo.name}
            login={repo.owner.login}
            description={repo.description}
          />
        ))}
        {error && <Error error={"Erro na requisição"} />}
      </div>

      {!error && !isLoading && currentRepos.length > 0 && (
        <div className={classes.pagination_container}>
          <button
            onClick={handlePrevious}
            disabled={!showPrevious || isLoading}
            className={classes.btn_pag}
          >
            Anterior
          </button>

          <span>
            Página {currentPage + 1}
          </span>

          <button
            onClick={handleNext}
            disabled={!showNext || isLoading}
            className={classes.btn_pag}
          >
            Próximo
          </button>
        </div>
      )}
    </div>
  );
};
