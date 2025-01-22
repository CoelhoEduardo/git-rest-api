import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router";
import { MyRepos } from "./routes/MyRepos.tsx";
import { Home } from "./routes/Home.tsx";
import { PublicRepos } from "./routes/PublicRepos.tsx";

const root = document.getElementById("root");

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "repositorios-publicos",
        element: <PublicRepos />,
      },
      {
        path: "meus-repositorios",
        element: <MyRepos />,
      },
      {
        path: "favoritos",
        element: <div>oi</div>,
      },
      {
        path: "detalhes",
        element: <div>oi</div>,
      },
    ],
  },
]);

createRoot(root!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
