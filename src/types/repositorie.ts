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
