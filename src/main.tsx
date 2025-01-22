import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router";
import {
  Home,
  PublicRepos,
  MyRepos,
  Favorites,
  Details,
} from "./pages/index.ts";

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
        element: <Favorites />,
      },
      {
        path: "detalhes/:owner/:repo",
        element: <Details />,
      },
    ],
  },
]);

createRoot(root!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
