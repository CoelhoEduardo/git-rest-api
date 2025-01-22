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

export type RepoCardProps = {
  id?: number;
  name: string;
  login: string;
  description?: string;
  hasFavorite?: boolean;
  language?: string;
  updated_at?: string;
};

export type FavoriteProps = {
  id: number;
  name: string;
  login: string;
};
