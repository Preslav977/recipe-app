export interface User {
  uid?: string;
  email: string;
  password: string;
  confirm_password?: string;
  emailVerified?: boolean;
  favorites: string[];
  loading?: "idle" | "pending" | "succeeded" | "failed";
}
