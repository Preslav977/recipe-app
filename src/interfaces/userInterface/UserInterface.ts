export interface UserInterface {
  uid?: string;
  email: string;
  password: string;
  emailVerified?: boolean;
  loading?: "idle" | "pending" | "succeeded" | "failed";
}
