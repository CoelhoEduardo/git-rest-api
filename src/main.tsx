import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import SideBar from "./components/sidebar/sidebar.tsx";

const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="page-container">
        <SideBar />
        <div className="childrens">
          <Routes>
            <Route path="/" element={<App />} />
            <Route
              path="meus-repositorios"
              element={<div>meus repositorios</div>}
            />
            <Route path="favoritos" element={<div>favoritos</div>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </StrictMode>
);
