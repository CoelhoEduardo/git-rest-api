import { useState } from "react";
import { Search } from "../components/Search/Search";
import { RepositoriesListProps } from "../types/repository";

export const Home = () => {
  const [repos, setRepos] = useState<RepositoriesListProps | null>();

  const searchRepos = async (repoName: string) => {
    const res = await fetch(
      `https://api.github.com/search/repositories?q=${repoName}`
    );

    const data = await res.json();

    const { items } = data;

    const repoData: RepositoriesListProps = {
      items,
    };

    setRepos(repoData);
  };

  return (
    <>
      <Search searchRepos={searchRepos} />
      {repos && <p>{repos.items?.map((repo) => repo.owner.login)}</p>}
    </>
  );
};
