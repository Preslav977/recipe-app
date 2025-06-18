export interface User {
  uid?: string;
  email: string;
  password: string;
  emailVerified?: boolean;
  favorites: string[];
  loading?: "idle" | "pending" | "succeeded" | "failed";
}
