import { useEffect, useState } from "react";
import "./my-repos.css";

type myReposType = {
  id: number;
  name: string;
  full_name: string;
  stargazers_count: number;
  description: number;
};

export default function MyRepos() {
  const [repos, setRepos] = useState<myReposType[]>();
  useEffect(() => {
    const headers = {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer${import.meta.env.API_TOKEN}`,
    };
    fetch("https://api.github.com/users/CoelhoEduardo/repos", {
      headers,
    })
      .then((response) => response.json())
      .then((data) => setRepos(data));
  }, []);

  return (
    <>
      <div className="container">
        {repos?.map((r) => (
          <div key={r.id} className="repo-card">
            <p>{r.name}</p>
            <p>{r.description}</p>
            <p>{r.stargazers_count}</p>
          </div>
        ))}
      </div>
    </>
  );
}
