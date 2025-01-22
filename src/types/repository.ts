export type RepositoriesListProps = {
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
