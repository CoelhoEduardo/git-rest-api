import { ReactNode } from "react";

export type RepositoriesListProps = {
  total_count: number;
  items: RepositoriesProps[];
};

export type RepositoriesProps = {
  id: number;
  name: string;
  description: string;
  language: string;
  updated_at: string;
  owner: { login: string };
};

export type ContributorsProps = {
  avatar_url: string;
  html_url: string;
};

export type FavoriteProps = {
  id: number;
  name: string;
  login: string;
  description?: string;
  updated_at?: string;
  language?: string;
  button?: ReactNode;
};
