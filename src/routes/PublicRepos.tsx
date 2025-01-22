import { useEffect, useState } from "react";
import { RepositoriesProps } from "../types/repository";

export const PublicRepos = () => {
  const [repos, setRepos] = useState<RepositoriesProps[]>();
  useEffect(() => {
    fetch("https://api.github.com/repositories")
      .then((response) => response.json())
      .then((data) => setRepos(data));
  }, []);

  return (
    <>
      <div>
        {repos?.map((r) => (
          <div key={r.id}>
            <p>{r.name}</p>
            <p>{r.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};
