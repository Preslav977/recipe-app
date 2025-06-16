export interface UserInterface {
  uid?: string;
  email: string;
  isVerified?: boolean;
  password: string;
  loading: "idle" | "pending" | "succeeded" | "failed";
}
