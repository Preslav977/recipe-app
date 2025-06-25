export interface UserFavoriteList {
  id: string;
  email?: string;
  favorites: string[];
  loading?: "idle" | "pending" | "succeeded" | "failed";
}
