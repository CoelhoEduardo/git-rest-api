import { ReactNode } from "react";

export type FavoriteProps = {
  id: number;
  name: string;
  login: string;
  description?: string;
  updated_at?: string;
  language?: string;
  button?: ReactNode;
};
