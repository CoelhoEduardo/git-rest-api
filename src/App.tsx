import "./App.css";
import { useEffect, useState } from "react";

type publicRepoType = {
  id: number;
  full_name: string;
  description: string;
  html_url: string;
  fork: boolean;
};

function App() {
  const [repos, setRepos] = useState<publicRepoType[]>();

  useEffect(() => {
    const headers = {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer${import.meta.env.API_TOKEN}`,
    };
    fetch("https://api.github.com/repositories", {
      headers,
    })
      .then((response) => response.json())
      .then((data) => setRepos(data));
  }, []);

  return (
    <>
      <div className="container">
        {repos?.slice(0, 10).map((r) => (
          <div key={r.id} className="repo-card">
            <p>
              <a href={r.html_url}>{r.full_name}</a>
            </p>
            <p>{r.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
